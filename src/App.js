import "./index.css";
import { charData } from "./array.js";
import { useState } from "react";

// Reusable Button------------------
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Heading />
      <div className="app">
        <div className="sidebar">
          <CharacterList charData={charData} />
        </div>
        <GiftSummary />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="main-heading">
      <h1>Stardew Gift Guide 🎁</h1>
    </div>
  );
}

function CharacterList({ charData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 4;
  const totalPages = Math.ceil(charData.length / charactersPerPage);

  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const currentCharacters = charData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <ul>
        {currentCharacters.map((char) => (
          <Character
            key={char.id}
            charName={char.name}
            title={char.title}
            image={char.image}
            birthday={char.birthday}
          />
        ))}
      </ul>
      <div className="pagination">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}

function Character({ charName, image, title }) {
  return (
    <li>
      <img src={require(`${image}`)} alt={charName} />
      <div className="char-text">
        <h3>{charName}</h3>
        <p>{title}</p>
        <Button>Select</Button>
      </div>
    </li>
  );
}

function GiftSummary() {
  return (
    <div className="gifts-summary">
      <div className="gift-list loved">💟 Loved Gifts</div>
      <div className="gift-list liked">⭐ Liked Gifts</div>
      <div className="gift-list hated">❌ Hated Gifts</div>
    </div>
  );
}
