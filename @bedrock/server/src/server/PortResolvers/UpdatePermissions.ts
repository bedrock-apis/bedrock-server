import { GameMessageType, HostMessageType } from "../../communcation";
import { AbilityLayer, UpdateAbilitiesPacket } from "../../protocol";
import { PORT_RESOLVERS } from "../ServerPort";

PORT_RESOLVERS[GameMessageType.UpdatePermissions] = function (data){
	const client = this.server.clients.get(data.uuid);
	if(!client) return this.server.logger.warn("Send request for updating permissions of unknown player");
	const a = new UpdateAbilitiesPacket();
	a.entityId = client.entityId;
	a.commandPersmissionLevel = data.commandPermission;
	a.permissionLevel = data.permission;
	const l = new AbilityLayer();
	a.abilities = [l];
	l.flags = data.abilities;
	client.post(a);
};
