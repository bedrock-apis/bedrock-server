import { PacketIds } from "@bedrock/base";
import { ViolationSeverity } from "../../../../protocol/dist/types/enums/Violation.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.PacketViolationWarning] = (client, packet) => {
	client.logger.error(`Packet Violation Warning for ${PacketIds[packet.brokenPacketId]}, reason: ${packet.reason}, severity: ${ViolationSeverity[packet.severity]}`);
};
