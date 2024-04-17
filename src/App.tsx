
import {useEffect, useState} from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        setError('Error fetching characters. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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