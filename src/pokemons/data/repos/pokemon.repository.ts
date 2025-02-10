import Pokemon from "../../domain/domain.pokemon.entity";
import PokemonRepository from "../../domain/domain.pokemon.repository";

import {
  getPokemonList,
  getPokemonByKey,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../datasource/pokemon.service";

export default class PokemonRepositoryImpl implements PokemonRepository {
  async getPokemonList(): Promise<Pokemon[]> {
    const response: Pokemon[] = await getPokemonList();
    const pokemonList: Pokemon[] = [];


    for (let i = 0; i < response.length; i++) {
      const encontrado = await this.getPokemon(String(response[i].id));
      pokemonList.push(encontrado);
    };
    return pokemonList;
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
