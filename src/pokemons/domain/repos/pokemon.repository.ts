import Pokemon from "../entities/Pokemon";

export default interface PokemonRepository {
  getPokemonList(): Promise<Pokemon[]>;
  getPokemon(key: string): Promise<Pokemon>;
  createPokemon(pokemon: Pokemon): Promise<Pokemon>;
  updatePokemon(pokemon: Pokemon): Promise<Pokemon>;
  deletePokemon(key: string): Promise<void>;
}
