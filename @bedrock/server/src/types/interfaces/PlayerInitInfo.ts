import type { Vector2, Vector3 } from "@bedrock/base";
import type { GameMode } from "../enums";

export interface PlayerInitInfo {
    entityId: bigint;
    gamemode: GameMode;
    location: Vector3;
    rotation: Vector2;
    runtimeId: bigint;
}
