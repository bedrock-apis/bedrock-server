/* eslint-disable no-case-declarations */
/* eslint-disable no-fallthrough */
import { PacketIds } from "@bedrock/base";
import { ChunkRadiusUpdatePacket, ClientActionIds } from "@bedrock/protocol";
import { EntityComponentId } from "../../minecraft/entities/EntityComponents.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.PlayerAction] = async (client, packet) => {
	const player = client.player; let movement;
	console.log("ACTION:", ClientActionIds[packet.actionId]);
	const states = player.getComponent(EntityComponentId.StatusProperties)!;
	switch (packet.actionId) {
	case ClientActionIds.StartSprint:
	case ClientActionIds.StopSprint:
		const isSprinting = (packet.actionId === ClientActionIds.StartSprint);
		if(isSprinting === states.isSprinting) break;
		states.isSprinting = isSprinting;
		// player.abilities.walkSpeed = isSprinting;
		// player.abilities.flySpeed = isSprinting;
		const speed = player.getComponent(EntityComponentId.Movement)!;
		console.log(speed.currentValue += isSprinting?0.03:-0.03);
		break;
	case ClientActionIds.StartFlying:
	case ClientActionIds.StopFlying:
		const isFlying = (packet.actionId === ClientActionIds.StartFlying);
		if(isFlying === player.abilities.flying) break;
		player.abilities.flying = isFlying; // [{"id":"7107de5e-7ce8-4030-940e-514c1f160890","name":"MovementSlowdown","amount":-0.30000001192092896,"operation":2,"operand":2,"serializable":false}, {"id":"91aeaa56-376b-4498-935b-2f7f68070635","name":"MovementSpeed","amount":0.4000000059604645,"operation":2,"operand":2,"serializable":false}, {"id":"d208fc00-42aa-4aad-9276-d5446530de43","name":"Sprinting speed boost","amount":0.30000001192092896,"operation":2,"operand":2,"serializable":false}]
	default:
		break;
	}
};
