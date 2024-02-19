import { HostMessageType } from "../../../../communcation";
import { PlayerJoinEventData, PlayerSpawnEventData, TriggerEvent } from "../../../../types";
import { PlayerClient } from "../../../entities";
import { EngineResolvers } from "../resolvers";

EngineResolvers[HostMessageType.PlayerJoin] = function (data, taksId){
	const create = new PlayerClient(this.engine, data.xuid, data.name, data.uuid);
	this.engine.players.set(data.uuid, create);
	const {id,runtimeId, location, gamemode, rotation } = create.player;
	this.ResolveTask(taksId, HostMessageType.PlayerJoin, {entityId: id, runtimeId, location, gamemode, rotation });
	TriggerEvent(this.engine.onPlayerJoin, new PlayerJoinEventData(create)).catch(this.engine.logger.error);
};

EngineResolvers[HostMessageType.PlayerSpawn] = function (data){
	TriggerEvent(this.engine.onPlayerSpawn, new PlayerSpawnEventData(this.engine.players.get(data.uuid) as any)).catch(this.engine.logger.error);
};
