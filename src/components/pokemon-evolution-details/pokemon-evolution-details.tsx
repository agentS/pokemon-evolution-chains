import { Component, h, Prop } from '@stencil/core';
import { IEvolutionDetail } from 'pokeapi-typescript';

enum EvolutionTrigger {
	LEVEL_UP = "level-up",
	TRADE = "trade",
	USE_ITEM = "use-item",
	SHED = "shed",
	OTHER = "other"
}

@Component({
	tag: 'pokemon-evolution-details',
	styleUrl: 'pokemon-evolution-details.css',
	shadow: true,
})
export class PokemonEvolutionDetails {
	@Prop() evolutionDetails: IEvolutionDetail[];

	render() {

		if (this.evolutionDetails !== undefined && this.evolutionDetails !== null) {
			return (
				<div>
					{ this.evolutionDetails.map(evolutionDetail => {
						const evolutionTrigger = this.mapAPINameToEvolutionTrigger(evolutionDetail.trigger.name);
						return (
							<div>
								<div>
									{ console.log(evolutionDetail) }
									<p>Evolution trigger: {this.mapEvolutionTriggerToDisplayName(evolutionTrigger)}</p>
									{
										evolutionDetail.item !== null
										? <p>Item: {evolutionDetail.item.name}</p>
										: <span></span>
									}
									{
										evolutionDetail.gender !== null
										? <p>
											Gender: {
												evolutionDetail.gender === 1
												? "male"
												: evolutionDetail.gender === 2
													? "female"
													: "unknown"
											}
										</p>
										: <span></span>
									}
									{
										evolutionDetail.min_level !== null
										? <p>Level: {evolutionDetail.min_level}</p>
										: <span></span>
									}
									{
										evolutionDetail.min_affection !== null || evolutionDetail.min_happiness !== null
										? <p>Friendship</p>
										: <span></span>
									}
									{
										(evolutionDetail as any).known_move !== null
										? <p>Known move: {(evolutionDetail as any).known_move.name}</p>
										: <span></span>
									}
									{
										evolutionDetail.known_move_type !== null
										? <p>Known move type: {evolutionDetail.known_move_type.name}</p>
										: <span></span>
									}
									{
										evolutionDetail.location !== null
										? <p>Location: {evolutionDetail.location.name}</p>
										: <span></span>
									}
									{
										evolutionDetail.needs_overworld_rain !== null && evolutionDetail.needs_overworld_rain === true
										? <p>You have to be in a rainy place.</p>
										: <span></span>
									}
									{
										evolutionDetail.party_type !== null
										? <p>You need to have a {evolutionDetail.party_type.name} type Pokémon in your party.</p>
										: <span></span>
									}
									{
										evolutionDetail.party_species !== null
										? <p>You need to have {evolutionDetail.party_species.name} in your party.</p>
										: <span></span>
									}
								</div>
								<hr />
							</div>
						);
					}) }
				</div>
			);
		} else {
			return (<span></span>);
		}
	}

	mapAPINameToEvolutionTrigger(apiName: string): EvolutionTrigger {
		for (const possibleEvolutionTrigger in EvolutionTrigger) {
			if (EvolutionTrigger[possibleEvolutionTrigger] === apiName) {
				return EvolutionTrigger[possibleEvolutionTrigger];
			}
		}
		return EvolutionTrigger.OTHER;
	}

	mapEvolutionTriggerToDisplayName(evolutionTrigger: EvolutionTrigger): string {
		switch (evolutionTrigger) {
			case EvolutionTrigger.LEVEL_UP:
				return "Level up";
			case EvolutionTrigger.TRADE:
				return "Trade";
			case EvolutionTrigger.USE_ITEM:
				return "Use an item";
			case EvolutionTrigger.SHED:
				return "Shed";
			case EvolutionTrigger.OTHER:
				return "Other";
		}
	}
}
