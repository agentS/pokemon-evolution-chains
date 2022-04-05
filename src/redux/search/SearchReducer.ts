import { IEvolutionChain, IPokemon } from "pokeapi-typescript";
import { ActionTypes } from "../RootActions";
import { SearchActions } from "./SearchActions";

export interface PokemonSearchState {
    searchTerm: string;
    pokemon?: IPokemon;
    evolutionChain?: IEvolutionChain;
    exception?: Error;
};

function getInitialState(): PokemonSearchState {
    return {
        searchTerm: "",
        pokemon: undefined,
        evolutionChain: undefined,
    };
}

export const pokemonSearchReducer = (
    state: PokemonSearchState = getInitialState(),
    action: ActionTypes
) => {
    switch (action.type) {
        case SearchActions.TEXT_CHANGED:
            return {
                ...state,
                searchTerm: action.payload.newSearchTerm,
            };
        case SearchActions.LOOKUP_EVOLUTION_CHAIN_START:
            return {
                ...state,
                pokemon: undefined,
                evolutionChain: undefined,
                exception: undefined,
            };
        case SearchActions.LOOKUP_POKEMON_SUCCEEDED:
            return {
                ...state,
                pokemon: action.payload.pokemon,
            };
        case SearchActions.LOOKUP_POKEMON_ERROR:
        case SearchActions.LOOKUP_SPECIES_ERROR:
        case SearchActions.LOOKUP_EVOLUTION_CHAIN_ERROR:
            return {
                ...state,
                exception: action.payload.exception,
                pokemon: undefined,
                evolutionChain: undefined,
            };
        case SearchActions.LOOKUP_EVOLUTION_CHAIN_SUCCEEDED:
            return {
                ...state,
                evolutionChain: action.payload.evolutionChain,
                exception: undefined,
            };
    }
    return state;
};
