export enum SearchActions {
    TEXT_CHANGED,
    LOOKUP_POKEMON_NAME_START,
    LOOKUP_POKEMON_NAME_SUCCEEDED,
    LOOKUP_POKEMON_NAME_FAILED,
};

export interface SearchTextChangedAction {
    type: SearchActions.TEXT_CHANGED;
    newText: string;
};

export const searchTextChanged = (data: SearchTextChangedAction) => async (dispatch, _getState) => {
    return dispatch({
        type: SearchActions.TEXT_CHANGED,
        payload: { data }
    });
};

export type SearchActionTypes = SearchTextChangedAction;
