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
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <Heading />
      <div className="app">
        <div className="sidebar">
          <CharacterList
            charData={charData}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        <GiftSummary charData={charData} />
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

function CharacterList({ charData, selected, onSelect }) {
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
            selected={selected}
            onSelect={onSelect}
          />
        ))}
      </ul>
      <div className="pagination">
        {currentPage > 1 ? (
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            👈🏼 Previous
          </Button>
        ) : (
          <div className="btn-placeholder"></div>
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next 👉🏼
          </Button>
        ) : (
          <div className="btn-placeholder"></div>
        )}
      </div>
    </div>
  );
}

function Character({ charName, image, title, selected, onSelect }) {
  return (
    <li
      className={selected === charName ? "selected" : ""}
      onClick={() => onSelect(charName)}
    >
      <img src={require(`${image}`)} alt={charName} />
      <div className="char-text">
        <h3>{charName}</h3>
        <p>{title}</p>
        {/* <Button>Select</Button> */}
      </div>
    </li>
  );
}

function GiftSummary({}) {
  return (
    <div className="gifts-summary">
      <div className="gift-list loved">
        <p>💟 Loved Gifts</p>
        <p>{}</p>
      </div>
      <div className="gift-list liked">
        <p>⭐ Liked Gifts</p>
      </div>
      <div className="gift-list hated">
        <p>❌ Hated Gifts</p>
      </div>
    </div>
  );
}
