import { combineReducers } from "redux";
import { PokemonSearchState, pokemonSearchReducer } from "./search/SearchReducer";

export interface RootState {
    pokemonSearch: PokemonSearchState;
};

export const rootReducer = combineReducers({
    pokemonSearchReducer
});
