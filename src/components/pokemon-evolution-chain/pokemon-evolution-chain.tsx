import { Component, h, State } from "@stencil/core";
import { store } from "@stencil/redux";
import { IEvolutionChain } from "pokeapi-typescript";

@Component({
	tag: "pokemon-evolution-chain",
	styleUrl: "pokemon-evolution-chain.css",
	shadow: true,
})
export class PokemonEvolutionChain {
	@State() evolutionChain: IEvolutionChain;

	componentWillLoad() {
		store.mapStateToProps(this, (state) => {
			const {
				pokemonSearchReducer: { evolutionChain }
			} = state;
			return {
				evolutionChain
			};
		})
		store.mapDispatchToProps(this, {});
	}

	render() {
		if (this.evolutionChain !== undefined && this.evolutionChain !== null) {
			return (
				<div>
					<h3>Evolution Chain</h3>
					<h5>{this.evolutionChain.chain.species.name}</h5>
					{
						this.evolutionChain.chain.evolves_to.length > 0
						? this.evolutionChain.chain.evolves_to.map(firstEvolution =>
							<div>
								<h5>{firstEvolution.species.name}</h5>
								{ console.log(firstEvolution.evolution_details) }
								{
									firstEvolution.evolves_to.length > 0
									? firstEvolution.evolves_to.map(secondEvolution =>
										<div>
											<h5>{secondEvolution.species.name}</h5>
											{ console.log(secondEvolution.evolution_details) }
										</div>
									)
									: <span></span>
								}
							</div>
						)
						: <span></span>
					}
				</div>
			);
		} else {
			return (<span></span>);
		}
	}
}
