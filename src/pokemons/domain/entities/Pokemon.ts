/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface Pokemon {
    abilities: AbilitySlot[];
    base_experience: number;
    cries: Cries;
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    height: number;
    held_items: any[]; // Puedes cambiar `any[]` si defines una estructura para `held_items`
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    url: string;
    weight: number;
    types: any[]; 
    stats: any[];
    name: string;
    sprites: any;
  }
  
  export interface AbilitySlot {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
  }
  
  export interface Cries {
    latest: string;
    legacy: string;
  }
  
  export interface NamedAPIResource {
    name: string;
    url: string;
  }
  
  export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
  }
  
  export interface Move {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
  }
  
  export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }
  