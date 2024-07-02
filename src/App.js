import "./index.css";
import { charData } from "./array.js";

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
    <div className="app">
      <Heading />
      <div className="sidebar">
        <CharacterList charData={charData} />
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
  return (
    <ul>
      {charData.map((char) => (
        <Character
          key={char.id}
          charName={char.name}
          title={char.title}
          image={char.image}
          birthday={char.birthday}
        />
      ))}
    </ul>
  );
}

function Character({ charName, image, title }) {
  return (
    <li>
      <img src={require(`${image}`)} alt={charName} />
      <div>
        <h3>{charName}</h3>
        <p>{title}</p>
      </div>

      <Button>Select</Button>
    </li>
  );
}
