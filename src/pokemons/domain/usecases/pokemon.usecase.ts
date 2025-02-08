import { Pokemon } from '../entities/Pokemon';
import { getPokemonList, getPokemonById, createPokemon, updatePokemon, deletePokemon } from '../../data/pokemon.service';

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  return await getPokemonList();
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  return await getPokemonById(name);
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
