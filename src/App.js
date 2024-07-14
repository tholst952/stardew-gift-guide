import "./index.css";
import { charData } from "./charArray.js";
import { universalLoves, universalLikes } from "./universalArrays.js";
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
      <UniversalSection uniLoves={universalLoves} uniLikes={universalLikes} />
      <div className="app">
        <div className="sidebar">
          <CharacterList
            charData={charData}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        <GiftSummary charData={charData} selected={selected} />
        <Footer />
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

function UniversalSection({ uniLoves, uniLikes }) {
  return (
    <div className="universal-section">
      <h4 className="uni-headline">
        <em>💌 Universal Gifts apply to everyone! </em>👨‍👩‍👦‍👦
      </h4>

      <div className="uni-lists">
        <div className="uniLoves">
          <h4 className="uni-subheadline">
            Universally <span className="spanEffect">Loved</span> Gifts 💛
          </h4>
          <ul className="uniLovesList">
            {uniLoves.map((gift, i) => (
              <li key={i}>{gift}</li>
            ))}
          </ul>
        </div>

        <div className="uniLikes">
          <h4 className="uni-subheadline">
            Universally <span className="spanEffect">Liked</span> Gifts 🌻
          </h4>
          <ul className="uniLikesList">
            {uniLikes.map((gift, i) => (
              <li key={i}>{gift}</li>
            ))}
          </ul>
        </div>
      </div>
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
    console.log(charData);
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
            <span>&larr; Previous</span>
          </Button>
        ) : (
          <div className="btn-placeholder"></div>
        )}
        <span>
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <span>Next &rarr;</span>
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
      </div>
    </li>
  );
}

function GiftSummary({ charData, selected }) {
  const selectedChar = charData.find((char) => char.name === selected);

  if (!selectedChar) return;

  return (
    <div className="gifts-summary">
      <div className="gift-list loves">
        <h4 className="summary-title">💟 Loved Gifts</h4>
        <ul>
          {selectedChar.loves.map((gift, i) => (
            <li key={i}>{gift}</li>
          ))}
        </ul>
      </div>
      <div className="gift-list likes">
        <h4 className="summary-title">⭐ Liked Gifts</h4>
        <ul>
          {selectedChar.likes.map((gift, i) => (
            <li key={i}>{gift}</li>
          ))}
        </ul>
      </div>
      <div className="gift-list hates">
        <h4 className="summary-title">❌ Hated Gifts</h4>
        <ul>
          {selectedChar.hates.map((gift, i) => (
            <li key={i}>{gift}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        All Stardew Valley characters are the creation and property of Eric
        Barone ConcernedApe
      </p>
      <p>
        Clancy, Davy, Lou and Trena were created with the Stardew Valley
        Character Portrait maker, created by Jazzybee
      </p>
    </footer>
  );
}
