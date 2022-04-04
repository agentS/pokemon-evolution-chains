import { ActionTypes } from "../RootActions";
import { SearchActions } from "./SearchActions";

export interface PokemonSearchState {
    searchTerm: string;
};

function getInitialState(): PokemonSearchState {
    return {
        searchTerm: ""
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
                searchTerm: action.payload.data.newText,
            };
    }
    return state;
}
