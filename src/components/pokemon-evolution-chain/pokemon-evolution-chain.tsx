import { Component, Fragment, h, State } from "@stencil/core";
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
					<div class="evolutionChainContainer">
						<div>
							<h5>{this.evolutionChain.chain.species.name}</h5>
						</div>
						<div>
							{
								this.evolutionChain.chain.evolves_to.length > 0
								? this.evolutionChain.chain.evolves_to.map((firstEvolution, firstEvolutionIndex) =>
									<Fragment>
										<div class="evolutionEntry">
											<h5>{firstEvolution.species.name}</h5>
											<pokemon-evolution-details evolutionDetails={firstEvolution.evolution_details} />
										</div>
										{
											firstEvolutionIndex < (firstEvolution.evolves_to.length - 1)
											? <div class="evolutionEntry"></div>
											: <Fragment></Fragment>
										}
									</Fragment>
								)
								: <Fragment></Fragment>
							}
						</div>
						<div>
							{
								this.evolutionChain.chain.evolves_to.length > 0
								? this.evolutionChain.chain.evolves_to.map(firstEvolution =>
									<Fragment>
										{
											firstEvolution.evolves_to.length > 0
											? firstEvolution.evolves_to.map(secondEvolution =>
												<div class="evolutionEntry">
													<h5>{secondEvolution.species.name}</h5>
													<pokemon-evolution-details evolutionDetails={secondEvolution.evolution_details} />
												</div>
											)
											: <Fragment></Fragment>
										}
									</Fragment>
								)
								: <Fragment></Fragment>
							}
						</div>
					</div>
				</div>
			);
		} else {
			return (<span></span>);
		}
	}
}
