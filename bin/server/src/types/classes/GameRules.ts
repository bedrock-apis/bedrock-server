import { GAMERULE_DEFINITION } from "../constants";

export class GameRules{
	public commandblockoutput: boolean = GAMERULE_DEFINITION.commandblockoutput.value;
	public dodaylightcycle: boolean = GAMERULE_DEFINITION.dodaylightcycle.value;
	public doentitydrops: boolean = GAMERULE_DEFINITION.doentitydrops.value;
	public dofiretick: boolean = GAMERULE_DEFINITION.dofiretick.value;
	public recipesunlock: boolean = GAMERULE_DEFINITION.recipesunlock.value;
	public dolimitedcrafting: boolean = GAMERULE_DEFINITION.dolimitedcrafting.value;
	public domobloot: boolean = GAMERULE_DEFINITION.domobloot.value;
	public domobspawning: boolean = GAMERULE_DEFINITION.domobspawning.value;
	public dotiledrops: boolean = GAMERULE_DEFINITION.dotiledrops.value;
	public doweathercycle: boolean = GAMERULE_DEFINITION.doweathercycle.value;
	public drowningdamage: boolean = GAMERULE_DEFINITION.drowningdamage.value;
	public falldamage: boolean = GAMERULE_DEFINITION.falldamage.value;
	public firedamage: boolean = GAMERULE_DEFINITION.firedamage.value;
	public keepinventory: boolean = GAMERULE_DEFINITION.keepinventory.value;
	public mobgriefing: boolean = GAMERULE_DEFINITION.mobgriefing.value;
	public pvp: boolean = GAMERULE_DEFINITION.pvp.value;
	public showcoordinates: boolean = GAMERULE_DEFINITION.showcoordinates.value;
	public naturalregeneration: boolean = GAMERULE_DEFINITION.naturalregeneration.value;
	public tntexplodes: boolean = GAMERULE_DEFINITION.tntexplodes.value;
	public sendcommandfeedback: boolean = GAMERULE_DEFINITION.sendcommandfeedback.value;
	public maxcommandchainlength: number = GAMERULE_DEFINITION.maxcommandchainlength.value;
	public doinsomnia: boolean = GAMERULE_DEFINITION.doinsomnia.value;
	public commandblocksenabled: boolean = GAMERULE_DEFINITION.commandblocksenabled.value;
	public randomtickspeed: number = GAMERULE_DEFINITION.randomtickspeed.value;
	public doimmediaterespawn: boolean = GAMERULE_DEFINITION.doimmediaterespawn.value;
	public showdeathmessages: boolean = GAMERULE_DEFINITION.showdeathmessages.value;
	public functioncommandlimit: number = GAMERULE_DEFINITION.functioncommandlimit.value;
	public spawnradius: number = GAMERULE_DEFINITION.spawnradius.value;
	public showtags: boolean = GAMERULE_DEFINITION.showtags.value;
	public freezedamage: boolean = GAMERULE_DEFINITION.freezedamage.value;
	public respawnblocksexplode: boolean = GAMERULE_DEFINITION.respawnblocksexplode.value;
	public showbordereffect: boolean = GAMERULE_DEFINITION.showbordereffect.value;
	public playerssleepingpercentage: number = GAMERULE_DEFINITION.playerssleepingpercentage.value;
	public setGameRule<K extends keyof typeof GAMERULE_DEFINITION>(ruleId: K, value?: (typeof GAMERULE_DEFINITION[K])["value"]): this{
		(this as any)[ruleId] = value??GAMERULE_DEFINITION[ruleId].value;
		return this;
	}
	public getRuleIds(){ return Object.getOwnPropertyNames(GAMERULE_DEFINITION); }
}
