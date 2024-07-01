import "./index.css";
import { characters } from "./array.js";

export default function App() {
  return (
    <div className="main">
      <Heading />
      <Sidebar characters={characters} />
    </div>
  );
}

function Button() {
  return <button></button>;
}

function Heading() {
  return (
    <div>
      <h1 className="main-heading">Stardew Gift Guide 🎁</h1>
    </div>
  );
}

function Sidebar({ characters }) {
  return characters.map((char) => (
    <div className="card" key={char.name}>
      <img src={require(`${char.image}`)} alt={char.name} />
      {/* <p>{char.birthday}</p> */}

      <div className="char-info">
        <h3 className="char-name">{char.name}</h3>
        <p className="char-title">{char.title}</p>
        <button>Select</button>
      </div>
    </div>
  ));
}
