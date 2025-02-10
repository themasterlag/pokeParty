import axios from 'axios';
import Pokemon from '../domain/domain.pokemon.entity';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonList = async (limit: number = 35): Promise<Pokemon[]> => {
  const response = await axios.get(`${API_URL}?limit=${limit}`);
  return response.data.results;
};

export const getPokemonByKey = async (key: string): Promise<Pokemon> => {
  const response = await axios.get(`${API_URL}/${key}`);
  return response.data;
};

export const createPokemon = async (pokemon: Pokemon): Promise<Pokemon> => {
  const response = await axios.post(API_URL, pokemon);
  return response.data;
};

export const updatePokemon = async (pokemon: Pokemon): Promise<Pokemon> => {
  const response = await axios.put(`${API_URL}/${pokemon.id}`, pokemon);
  return response.data;
};

export const deletePokemon = async (key: string): Promise<void> => {
  await axios.delete(`${API_URL}/${key}`);
};
