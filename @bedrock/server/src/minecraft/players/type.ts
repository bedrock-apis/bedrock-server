import { EntityBehavior } from "../entities/EntityBehavior.js";
import { InternalEntityType } from "../entities/entity-type.js";

export const playerType = new InternalEntityType("minecraft:player", new EntityBehavior());
