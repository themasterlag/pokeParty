import { Pokemon } from '../entities/Pokemon';
import { getPokemonList, getPokemonByKey, createPokemon, updatePokemon, deletePokemon } from '../../data/pokemon.service';

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  let response: Pokemon[] = await getPokemonList()
  let pokemonList: Pokemon[] = [];

  for (let i = 0; i < response.length; i++) {
    let encontrado = await fetchPokemon(response[i].name);
    pokemonList.push(encontrado);
  };

  return pokemonList;
};

export const fetchPokemon = async (key: number|string): Promise<Pokemon> => {
  return await getPokemonByKey(key !== 'string' ? String(key) : key);
};

export const addPokemon = async (pokemon: Pokemon): Promise<Pokemon> => {
  return await createPokemon(pokemon);
};

export const editPokemon = async (pokemon: Pokemon): Promise<Pokemon> => {
  return await updatePokemon(pokemon);
};

export const removePokemon = async (id: number): Promise<void> => {
  await deletePokemon(id);
};
