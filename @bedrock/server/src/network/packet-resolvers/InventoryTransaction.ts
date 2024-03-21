import { PacketIds, Vec3 } from "@bedrock/base";
import { TransactionAction, TransactionType } from "@bedrock/protocol";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.InventoryTransaction] = (client, packet) => {
    console.log("TRANSACTION", TransactionType[packet.transactionType]);
};
