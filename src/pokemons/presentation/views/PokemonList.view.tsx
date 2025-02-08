// src/presentation/components/PokemonList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPokemonList } from '../../domain/usecases/pokemon.usecase';
import { Pokemon } from '../../domain/entities/Pokemon';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemonList = async () => {
      const data = await fetchPokemonList();
      setPokemonList(data);
    };
    getPokemonList();
  }, []);

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <Link to="/add">Agregar Pokémon</Link>
      <ul>
        {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
