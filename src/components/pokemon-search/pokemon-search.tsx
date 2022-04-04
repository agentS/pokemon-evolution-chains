import { Component, h, State } from "@stencil/core";
import { store } from "@stencil/redux";
import { SearchActions, searchTextChanged, SearchTextChangedAction } from "../../redux/search/SearchActions";

@Component({
	tag: "pokemon-search"
})
export class PokemonSearch {
	@State() searchTerm: string;

	componentWillLoad() {
		store.mapStateToProps(this, (state) => {
			const {
				pokemonSearchReducer: { searchTerm },
			} = state;
			return {
				searchTerm
			};
		});
		store.mapDispatchToProps(this, {
			searchTextChanged
		});
	}

	render() {
		return (
			<form onSubmit={(event) => this.handleLookupEvolutionChain(event)}>
				<label htmlFor="txtPokemonName">Name</label>
				<input id="txtPokemonName" type="text" placeholder="Pokémon name"
					value={this.searchTerm} onKeyUp={(event) => this.handleSearchTermChanged(event)} />
				<input type="submit" value="Lookup evolution chain" />
			</form>
		);
	}

	handleSearchTermChanged(event: Event) {
		const newSearchTerm = (event.target as HTMLInputElement).value;
		this.searchTextChanged({ newText: newSearchTerm, type: SearchActions.TEXT_CHANGED });
	}

	handleLookupEvolutionChain(event: Event) {
		event.preventDefault();
		
	}

	searchTextChanged: (data: SearchTextChangedAction) => void;
}
