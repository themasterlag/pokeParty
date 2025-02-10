import Pokemon from './domain.pokemon.entity';

import PokemonRepository from './domain.pokemon.repository';
import PokemonRepositoryImpl from '../data/data.pokemon.repository.impl';

const pokemonRepo: PokemonRepository = new PokemonRepositoryImpl();
export const fetchPokemonList = async (limit: number=35): Promise<Pokemon[]> => await pokemonRepo.getPokemonList(limit);
export const filterPokemonList = async (name?: string, limit: number=35): Promise<Pokemon[]> => await pokemonRepo.getPokemonList(limit, name);
export const fetchPokemon = async (key: string): Promise<Pokemon> => await pokemonRepo.getPokemon(key);
export const addPokemon = async (pokemon: Pokemon): Promise<Pokemon> => await pokemonRepo.createPokemon(pokemon);
export const editPokemon = async (pokemon: Pokemon): Promise<Pokemon> => await pokemonRepo.updatePokemon(pokemon);
export const removePokemon2 = async (id: string): Promise<void> => await pokemonRepo.deletePokemon(id);