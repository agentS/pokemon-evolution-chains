import { r as registerInstance, h } from './index-c37bab2d.js';
import { s as store, a as searchTextChanged, S as SearchActions } from './SearchActions-c101bcb3.js';

let PokemonSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    store.mapStateToProps(this, (state) => {
      const { pokemonSearchReducer: { searchTerm }, } = state;
      return {
        searchTerm
      };
    });
    store.mapDispatchToProps(this, {
      searchTextChanged
    });
  }
  render() {
    return (h("form", { onSubmit: (event) => this.handleLookupEvolutionChain(event) }, h("label", { htmlFor: "txtPokemonName" }, "Name"), h("input", { id: "txtPokemonName", type: "text", placeholder: "Pok\u00E9mon name", value: this.searchTerm, onKeyUp: (event) => this.handleSearchTermChanged(event) }), h("input", { type: "submit", value: "Lookup evolution chain" })));
  }
  handleSearchTermChanged(event) {
    const newSearchTerm = event.target.value;
    this.searchTextChanged({ newText: newSearchTerm, type: SearchActions.TEXT_CHANGED });
  }
  handleLookupEvolutionChain(event) {
    event.preventDefault();
  }
};

export { PokemonSearch as pokemon_search };
