import { Int32, ProtocolSerializable, SerializeAs } from "@bedrock/base";

export class TeleportCause extends ProtocolSerializable {
	@SerializeAs(Int32) public cause!: number;
	@SerializeAs(Int32) public sourceEntityType!: number;
}
