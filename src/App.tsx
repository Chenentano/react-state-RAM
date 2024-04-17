
import {useEffect, useState} from "react";
import { response } from "./rickData.ts";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Wert für Suche
  const [characters, setCharacters] = useState<Character[]>([]); //charliste
  const [error, setError] = useState(''); // für die probleme

  const { api_url } = response;

  //rufe daten auf
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_url);
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        setError("Error");
      }
    };

    fetchData();
  }, []);

  // schneller refresh
  const handleSearch = (element: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(element.target.value);
  };

  //filter den suchbegriff
  const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <>
        <input
            type="text"
            placeholder="Suche deinen Character"
            value={searchTerm}
            onChange={handleSearch}
        />
        {error && <p>{error}</p>}

          {filteredCharacters.map((character) => (
              <li key={character.id}>
                Name: {character.name}<br/>
                Status: {character.status}<br/>
                Species: {character.species}<br/>
                Gender: {character.gender}<br/>
                Image: {character.image}<br/><br/></li>
          ))}
      </>
  );
}
export default App;