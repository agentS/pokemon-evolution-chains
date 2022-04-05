import PokeAPI, { IEvolutionChain, IPokemon } from "pokeapi-typescript";

export enum SearchActions {
	TEXT_CHANGED,
	LOOKUP_EVOLUTION_CHAIN_START,
	LOOKUP_POKEMON_SUCCEEDED,
	LOOKUP_POKEMON_ERROR,
	LOOKUP_SPECIES_ERROR,
	LOOKUP_EVOLUTION_CHAIN_SUCCEEDED,
	LOOKUP_EVOLUTION_CHAIN_ERROR,
};

export interface SearchTextChangedAction {
	type: SearchActions.TEXT_CHANGED;
	newText: string;
};

export const searchTextChanged = (newSearchTerm: string) => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.TEXT_CHANGED,
		payload: { newSearchTerm }
	});
};

export interface LookupPokemonStartAction {
	type: SearchActions.LOOKUP_EVOLUTION_CHAIN_START;
};

const lookupPokemonStart = () => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.LOOKUP_EVOLUTION_CHAIN_START,
	}); 
};

export interface LookupPokemonSucceededAction {
	type: SearchActions.LOOKUP_POKEMON_SUCCEEDED;
	pokemon: IPokemon;
};

const lookupPokemonSucceeded = (pokemon: IPokemon) => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.LOOKUP_POKEMON_SUCCEEDED,
		payload: { pokemon },
	});
};

export interface LookupPokemonErrorAction {
	type: SearchActions.LOOKUP_POKEMON_ERROR;
	exception: Error;
};

const lookupPokemonError = (exception: Error) => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.LOOKUP_POKEMON_ERROR,
		payload: { exception },
	})
};

export interface LookupSpeciesErrorAction {
	type: SearchActions.LOOKUP_SPECIES_ERROR;
	exception: Error;
};

const lookupSpeciesError = (exception: Error) => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.LOOKUP_SPECIES_ERROR,
		payload: { exception },
	})
};

export interface LookupEvolutionChainSucceededAction {
	type: SearchActions.LOOKUP_EVOLUTION_CHAIN_SUCCEEDED;
	evolutionChain: IEvolutionChain;
};

const lookupEvolutionChainSucceeded = (evolutionChain: IEvolutionChain) => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.LOOKUP_EVOLUTION_CHAIN_SUCCEEDED,
		payload: { evolutionChain }
	});
};

export interface LookupEvolutionChainErrorAction {
	type: SearchActions.LOOKUP_EVOLUTION_CHAIN_ERROR;
	exception: Error;
};

const lookupEvolutionChainError = (exception: Error) => async (dispatch, _getState) => {
	return dispatch({
		type: SearchActions.LOOKUP_EVOLUTION_CHAIN_ERROR,
		payload: { exception },
	})
};

export const lookupEvolutionChain = () => async (dispatch, _getState) => {
	const pokemonName: string = _getState().pokemonSearchReducer.searchTerm;
	dispatch(lookupPokemonStart());
	try {
		const pokemon = await PokeAPI.Pokemon.resolve(pokemonName);
		dispatch(lookupPokemonSucceeded(pokemon));

		try {
			const species = await PokeAPI.PokemonSpecies.resolve(pokemon.species.name);

			const evolutionChainIDMatches = species.evolution_chain.url.match(/\/[0-9]+\//);
			if (evolutionChainIDMatches.length > 0) {
				try {
					const evolutionChainID = parseInt(
						evolutionChainIDMatches[evolutionChainIDMatches.length - 1]
							.split("/")[1]
					);
					const evolutionChain = await PokeAPI.EvolutionChain.resolve(evolutionChainID);
					dispatch(lookupEvolutionChainSucceeded(evolutionChain));
				} catch (lookupEvolutionChainException) {
					alert(`Could not lookup the evolution chain for ${pokemonName}. Please make sure the PokéAPI is reachable.`);
					console.error(lookupEvolutionChainException);
					dispatch(lookupEvolutionChainError(lookupEvolutionChainException));
				}
			} else {
				alert(`Could not lookup the evolution chain for ${pokemonName}. Please make sure the PokéAPI is reachable.`);
				const lookupEvolutionChainException = Error("The Pokémon species does not have an evolution chain entry associated with it.");
				console.error(lookupEvolutionChainException);
				dispatch(lookupEvolutionChainError(lookupEvolutionChainException));
			}
		} catch (lookupSpeciesException) {
			alert(`Could not lookup the Pokémon species ${pokemon.species.name}. Please make sure the PokéAPI is reachable.`);
			console.error(lookupSpeciesException);
			dispatch(lookupSpeciesError(lookupSpeciesException));
		}
	} catch (lookupPokemonException) {
		alert(`Could not lookup the Pokémon ${pokemonName}. Please check your spelling and make sure the PokéAPI is reachable.`);
		console.error(lookupPokemonException);
		dispatch(lookupPokemonError(lookupPokemonException));
	}
}

export type SearchActionTypes =
	SearchTextChangedAction
	| LookupPokemonStartAction
	| LookupPokemonSucceededAction
	| LookupPokemonErrorAction
	| LookupSpeciesErrorAction
	| LookupEvolutionChainSucceededAction
	| LookupEvolutionChainErrorAction;
