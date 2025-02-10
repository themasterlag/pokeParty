import Pokemon from '../entities/domain.pokemon.entity';
// import PokemonRepository from '../repos/pokemon.repository';
// import PokemonRepositoryImpl from '../../data/repos/pokemon.repository';
import { getPokemonList, getPokemonByKey, createPokemon, updatePokemon, deletePokemon } from '../../data/pokemon.service';

export const fetchPokemonList = async (limit: number=35): Promise<Pokemon[]> => {
  let response: Pokemon[] = await getPokemonList(limit)
  return response;
};

export const filterPokemonList = async (name?: string, limit: number=35): Promise<Pokemon[]> => {
  let pokemonList: Pokemon[] = (await getPokemonList(name?limit:35)).filter( (pokemon) => name ? pokemon.name.includes(name): pokemon);

  let results = [];
  for (let i = 0; i < pokemonList.length; i++) {
    let encontrado = await fetchPokemon(pokemonList[i].name);
    results.push(encontrado);
  };

  return results;
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
  


// const pokemonRepo: PokemonRepository = new PokemonRepositoryImpl();
// export const fetchPokemonList2 = async (): Promise<Pokemon[]> => await pokemonRepo.getPokemonList();
// export const fetchPokemon2 = async (key: string): Promise<Pokemon> => await pokemonRepo.getPokemon(key);
// export const addPokemon2 = async (pokemon: Pokemon): Promise<Pokemon> => await pokemonRepo.createPokemon(pokemon);
// export const editPokemon2 = async (pokemon: Pokemon): Promise<Pokemon> => await pokemonRepo.updatePokemon(pokemon);
// export const removePokemon2 = async (id: string): Promise<void> => await pokemonRepo.deletePokemon(id);
