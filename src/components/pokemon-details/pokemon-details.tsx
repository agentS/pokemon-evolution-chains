import { Component, h, State } from "@stencil/core";
import { store } from "@stencil/redux";
import { IPokemon } from "pokeapi-typescript";

@Component({
	tag: "pokemon-details",
	styleUrl: "pokemon-details.css",
	shadow: true,
})
export class PokemonDetails {
	@State() pokemon: IPokemon;

	componentWillLoad() {
		store.mapStateToProps(this, (state) => {
			const {
				pokemonSearchReducer: { pokemon }
			} = state;
			return {
				pokemon
			};
		});
		store.mapDispatchToProps(this, {});
	}

	render() {
		if (this.pokemon !== undefined && this.pokemon !== null) {
			return (
				<div>
					<h3>#{this.pokemon.id} - {this.pokemon.name}</h3>
					<img src={this.pokemon.sprites.front_default} alt={this.pokemon.name} />
				</div>
			);
		} else {
			return (<span></span>);
		}
	}

}
