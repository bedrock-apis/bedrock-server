import { EntityBehavior } from "../entities/EntityBehavior.js";
import { ConstructEntityType } from "../entities/entity-type.js";

export const playerType = ConstructEntityType("minecraft:player", new EntityBehavior());
