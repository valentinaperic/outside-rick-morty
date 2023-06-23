import React, { useEffect, useState } from 'react';
import { Character } from '../types/Character';
import { FILTER_CHARACTERS_QUERY } from '../queries/character';
import { useLazyQuery } from '@apollo/client';
import Header from './Header';

const Body: React.FC = () => {
  const [fetchAnimalCharacters, { loading: animalLoading, error: animalError, data: animalData }] = useLazyQuery(
    FILTER_CHARACTERS_QUERY
  );

  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [animalCharacters, setAnimalCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<number>(1); //track the next page to fetch
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (animalData) {
      //set the count of the records
      const count = animalData.characters.info.count;
      setTotalRecords(count);

      //set the animal data 
      const results = animalData.characters.results;
      setAnimalCharacters((prevCharacters) => [...prevCharacters, ...results]); //preserve previous data
    }
  }, [animalData]);

  const handleListAnimalCharactersClick = () => {
    //fetch the animal characters with the next page 
    fetchAnimalCharacters({ variables: { species: 'Animal', page: nextPage } });

    //increment the next page
    setNextPage((prevPage) => prevPage + 1); 
  };

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    //remove numeric characters
    const filteredValue = inputValue.replace(/[0-9]/g, '');
    setName(filteredValue);
  };

  //if there is an error with the animal data
  if (animalError) {
    return <p>Error: {animalError?.message}</p>;
  }

  return (
    <div>
      <div>
        <Header totalRecords={totalRecords} name={name} />
        <form className='name-form'>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameInputChange} />
          </label>
        </form>
        {!animalData && (
          <button onClick={handleListAnimalCharactersClick} disabled={animalLoading}>
            {animalLoading ? 'Loading...' : 'Display all Animal Species Characters'}
          </button>
        )}
      </div>
      {animalCharacters.length > 0 && (
        <div className='character-grid'>
          {animalCharacters.map((character) => (
            <div className='character-details' key={character.id.toString()}>
              <img src={String(character.image)} alt={character.name.toString()} />
              <p><strong>Name:</strong> {character.name}</p>
              <p><strong>Species:</strong> {character.species}</p>
              {character.type && <p><strong>Type:</strong> {character.type}</p>}
              <p><strong>Gender:</strong> {character.gender}</p>
            </div>
          ))}
        </div>
      )}
      {animalCharacters.length < totalRecords && (
        <button onClick={handleListAnimalCharactersClick} disabled={animalLoading}>
          {animalLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Body;