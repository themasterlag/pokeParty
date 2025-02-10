// src/presentation/components/AddPokemon.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPokemon } from '../../domain/usecases/pokemon.usecase';
import Pokemon from '../../domain/entities/Pokemon';

const AddPokemon = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPokemon: {name: string} = {name};
    await addPokemon(newPokemon as Pokemon);
    navigate('/');
  };

  return (
    <div>
      <h1>Agregar Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddPokemon;
