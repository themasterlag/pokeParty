import Pokemon from "./domain.pokemon.entity";

export default interface PokemonRepository {
  getPokemonList(limit: number, name?: string): Promise<Pokemon[]>;
  getPokemon(key: string): Promise<Pokemon>;
  createPokemon(pokemon: Pokemon): Promise<Pokemon>;
  updatePokemon(pokemon: Pokemon): Promise<Pokemon>;
  deletePokemon(key: string): Promise<void>;
}
