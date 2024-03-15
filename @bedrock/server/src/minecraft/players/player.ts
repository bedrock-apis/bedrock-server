import type { PlayerAttributeLike } from "@bedrock/protocol";
import { AttributeComponentIds, ChatTypes, GameMode, TextPacket, ToastRequestPacket, UpdateAttributesPacket } from "@bedrock/protocol";
import { KernelConstruct, KernelPrivate } from "../../kernel/base.js";
import type { Client } from "../../network/Client.js";
import type { Postable } from "../../types/postable.js";
import type { Dimension } from "../dimensions/dimension.js";
import type { AttributeComponent } from "../entities/BaseComponents.js";
import { EntityComponentId, type HealthComponent } from "../entities/EntityComponents.js";
import { Entity } from "../entities/entity.js";
import { ConstructAbilities, type Abilities } from "./abilities.js";
import type { FormData, FormTimeoutRejection} from "./form_manager.js";
import { FormManager } from "./form_manager.js";
import { ContextArea } from "./ticking.js";
import { playerType } from "./type.js";
import { ViewManager } from "./view_manager.js";

const playerComponents = [
	AttributeComponentIds.Absorption,
	AttributeComponentIds.AttackDamage,

	AttributeComponentIds.FallDamage,
	AttributeComponentIds.FollowRange,

	AttributeComponentIds.Health,
	AttributeComponentIds.HorseJumpStrength,

	AttributeComponentIds.KnockbackResistence,
	AttributeComponentIds.LavaMovement,
	AttributeComponentIds.Luck,
	AttributeComponentIds.Movement,

	AttributeComponentIds.PlayerExhaustion,
	AttributeComponentIds.PlayerExperience,
	AttributeComponentIds.PlayerHunger,
	AttributeComponentIds.PlayerLevel,
	AttributeComponentIds.PlayerSaturation,

	AttributeComponentIds.UnderwaterMovement,
	AttributeComponentIds.ZombieSpawnReinforcements,
];

class AttributeLike implements PlayerAttributeLike {
	public readonly component;
	public get current() {
		return this.component.currentValue;
	}
	public get default() {
		return this.component.default;
	}
	public get id() {
		return this.component.componentId;
	}
	public get max() {
		return this.component.effectiveMax;
	}
	public get min() {
		return this.component.effectiveMin;
	}
	public readonly modifiers = [];
	public constructor(attrComp: AttributeComponent<string>) {
		this.component = attrComp;
	}
	public build(){
		const { max, id, current, default: def, min, modifiers } = this;
		return {max, id, current, default: def, min, modifiers};
	}
	public toString() {
		const { max, id, current, default: def, min, modifiers } = this;
		return [id, current, def, max, min, modifiers.length].join(",");
	}
}
class PlayerAttributeUpdater extends UpdateAttributesPacket {
	public readonly player;
	public changeAttributes: PlayerAttributeLike[] = [];
	public readonly knownAttributes = new Set<AttributeLike>();
	public constructor(player: Player) {
		super();
		this.player = player;
	}
	public Update(att: AttributeLike) {
		this.changeAttributes.push(att.build());
		this.player._onUpdate(this);
	}
	public UpdateAll(){
		for(const a of this.knownAttributes) this.changeAttributes.push(a.build());
		this.player._onUpdate(this);
	}
	public toPacket(): this {
		this.runtimeEntityId = this.player.runtimeId;
		this.attributes = this.changeAttributes;
		this.changeAttributes = [];
		return this;
	}
}

export class Player extends Entity {
	public readonly engine;
	protected readonly _attributes = new PlayerAttributeUpdater(this as any);
	public readonly abilities: Abilities = ConstructAbilities(this);
	public readonly client;
	public readonly name;
	public viewDistance: number = 0;
	public readonly gameMode = GameMode.Survival;
	public readonly context;
	public readonly viewManager;
	public readonly formManager;
	protected constructor(dimension: Dimension, client: Client) {
		KernelPrivate(new.target);
		super(playerType, dimension);
		this.client = client;
		this.name = client.displayName;
		this.engine = this.dimension.world.engine;
		for (const componentId of playerComponents) {
			const component = this.getComponent(componentId);
			if (component) {
				const attLike = new AttributeLike(component as unknown as AttributeComponent<string>);
				this._attributes.knownAttributes.add(attLike);
				(component as HealthComponent).onUpdate.subscribe((e) => { 
					this._attributes.Update(attLike); 
				});
			}
		}

		this.formManager = new FormManager(this);
		this.context = new ContextArea(this);
		this.viewManager = new ViewManager(this);
		this._onInit();
	}
	public isValid(): boolean { return super.isValid() && this.engine.players.has(this); }
	public _updateAll() {
		this._onUpdate(this.abilities);
		this._onUpdate(this._attributes);
		super._updateAll();
	}
	public _updateFor(me: Postable) { this._onUpdate(me); }
	/**
	 * Runs every tick
	 * Updates viewManager
	 * Updates context area
	 * calls entity tick
	 */
	public _onTick() {
		this.viewManager._onTick();
		this.context._onTick();
		super._onTick();
	}
	/**
	 * Runs before player sprinting state changes
	 *
	 * @param startSprinting New sprinting value
	 * @returns Return inverted value to cancel sprinting
	 */
	public _onBeforeIsSprintingChange(startSprinting: boolean){ return startSprinting; }
	/**
	 * Runs when player sprinting state changes
	 * Updates player movement speed
	 * Updates isSprinting status to new value
	 * 
	 * Calls _getDefaultMovemnt and _getSprintingMovement
	 *
	 * @param isSprinting is player currently sprinting
	 */
	public _onIsSprintingChange(isSprinting: boolean){
		const status = this.getComponent(EntityComponentId.StatusProperties)!;
		status.isSprinting = isSprinting;
		const speed = this.getComponent(EntityComponentId.Movement)!;
		speed.currentValue = isSprinting?this._getDefaultMovement() + this._getSprintingMovement():this._getDefaultMovement();
	}
	/**
	 * Runs when player sends a text message
	 *
	 * @param options Packet with test informations, you should return this object if you dont want to cancel this message
	 * @returns return nothing if you want to cancel this message, or return recieved object.
	 */
	public _onTextReceived<T extends {message: string, sourceName: string}>(options: T): T | undefined{ return options; }
	/**
	 * Runs when player is created
	 */
	public _onInit(){}
	public _onSetup(){
		const status = this.getComponent(EntityComponentId.StatusProperties)!;
		status.isAffectedByGravity = true;
		status.isBreathing = true;
		status.isHasCollision = true;
		this._attributes.UpdateAll();
		this._updateAll();
	}
	/**
	 * Runs when player is created
	 */
	public _onReady(){
		this.getComponent(EntityComponentId.Movement)!.currentValue = this._getDefaultMovement();
		this.getComponent(EntityComponentId.Health)?.setToEffectiveMax();
	}
	/// //////////////////////////////////////////
	/// //////////////////////////// Methods under this section used to be for end-use usage, these methods are not likely called by this engine
	/// //////////////////////////////////////////
	
	
	/**
	 * @param form Forms that you want to show
	 * @returns Promise with resolved data or cancaletion info
	 * @throws {FormTimeoutRejection} This method can trow FormTimeoutRejection
	 */
	public async sendForm<T extends FormData<any>>(form: T){return form.show(this);}
	/**
	 * Shows a toast pop-up for this player
	 *
	 * @param title Title of the toast
	 * @param message Message in the toast
	 */
	public sendToastPopup(title: string, message: string){
		const data = new ToastRequestPacket();
		data.title = String(title);
		data.message = String(message);
		this.context.updates.add(data);
	}
	public sendMessage(message: string){
		const data = new TextPacket();
		data.message = message;
		data.type = ChatTypes.Raw;
		this.context.updates.add(data);
	}
}
export function ConstructPlayer(dimension: Dimension, client: Client): Player {
	return KernelConstruct(Player as any, dimension, client);
}
