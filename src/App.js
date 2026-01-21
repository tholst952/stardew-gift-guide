import "./index.css";
import { charData } from "./charArray.js";
import { universalLoves, universalLikes } from "./universalArrays.js";
import { useState, useEffect } from "react";

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
    <div className="app">
      <div className="hero-section">
        <Heading />
      </div>
      <UniversalSection uniLoves={universalLoves} uniLikes={universalLikes} />
      <div className="main">
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
    <div className="heading-content">
      <div className="main-heading">
        <h1>Stardew Valley Gift Guide 🎁</h1>
      </div>
      <div className="main-guide-summary">
        <p>
          To build and maintain relationships with your neighbors in Stardew
          Valley, give them a gift on their birthday!
        </p>
      </div>
    </div>
  );
}

function UniversalSection({ uniLoves, uniLikes }) {
  return (
    <div className="universal-section">
      <div className="uni-lists">
        <div className="uniLoves">
          <h4 className="uni-subheadline">
            Universally <span className="spanEffect1">Loved</span> Gifts 💗
          </h4>
          <ul className="uniLovesList">
            {uniLoves.map((gift, i) => (
              <li key={i}>{gift}</li>
            ))}
          </ul>
        </div>

        <div className="uniLikes">
          <h4 className="uni-subheadline">
            Universally <span className="spanEffect2">Liked</span> Gifts ⭐
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

  const [hasManualSelection, setHasManualSelection] = useState(false);

  useEffect(() => {
    if (!hasManualSelection && currentCharacters.length > 0) {
      onSelect(currentCharacters[0].name);
    }
  }, [currentCharacters, hasManualSelection, onSelect]);

  useEffect(() => {
    setHasManualSelection(false);
  }, [currentPage]);

  const handleSelect = (name) => {
    setHasManualSelection(true);
    onSelect(name);
  };

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
            onSelect={handleSelect}
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

function Character({ charName, image, birthday, title, selected, onSelect }) {
  return (
    <li
      className={selected === charName ? "selected" : ""}
      onClick={() => onSelect(charName)}
    >
      <img src={require(`${image}`)} alt={charName} />
      <div className="char-text">
        <h3>{charName}</h3>
        <p>{title}</p>
        <p className="birthday"> 📅 {birthday}</p>
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
