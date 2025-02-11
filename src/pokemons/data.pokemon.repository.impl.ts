import Pokemon from "./domain.pokemon.entity";
import PokemonRepository from "./domain.pokemon.repository";

import {
  getPokemonList,
  getPokemonByKey,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "./data.pokemon.datasource.api";

export default class PokemonRepositoryImpl implements PokemonRepository {
  async getPokemonList(limit: number, name?: string): Promise<Pokemon[]> {
    const pokemonList: Pokemon[] = (await getPokemonList(limit)).filter(
      (pokemon) => (name ? pokemon.name.includes(name) : pokemon)
    );
    
    const results = [];
    for (let i = 0; i < pokemonList.length; i++) {
      const encontrado = await this.getPokemon(pokemonList[i].name);
      results.push(encontrado);
    }
    return results;
  }
  async getPokemon(key: string): Promise<Pokemon> {
    return await getPokemonByKey(key);
  }
  async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    return await createPokemon(pokemon);
  }
  async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return await updatePokemon(pokemon);
  }
  async deletePokemon(key: string): Promise<void> {
    await deletePokemon(key);
  }
}
