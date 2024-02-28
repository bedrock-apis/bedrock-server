import { Endianness, ProtocolSerializable, VarString, SerializeAs, Bool, Int32 } from "@bedrock/base";


export class BehaviorPackInfo extends ProtocolSerializable {
	@SerializeAs(VarString) public uuid!: string;
	@SerializeAs(VarString) public version!: string;
	@SerializeAs(Int32, Endianness.Little) public size!: number;
	@SerializeAs(VarString) public contentKey!: string;
	@SerializeAs(VarString) public subpackName!: string;
	@SerializeAs(VarString) public contentIdentity!: string;
	@SerializeAs(Bool) public hasScripts!: boolean;
}

export class TexturePackInfo extends ProtocolSerializable {
	@SerializeAs(VarString) public uuid!: string;
	@SerializeAs(VarString) public version!: string;
	@SerializeAs(Int32, Endianness.Little) public size!: number;
	@SerializeAs(VarString) public contentKey!: string;
	@SerializeAs(VarString) public subpackName!: string;
	@SerializeAs(VarString) public contentIdentity!: string;
	@SerializeAs(Bool) public hasScripts!: boolean;
	@SerializeAs(Bool) public rtxEnabled!: boolean;
}

export class PackLink extends ProtocolSerializable {
	@SerializeAs(VarString) public id!: string;
	@SerializeAs(VarString) public url!: string;
}

export class DataPackInfo extends ProtocolSerializable {
	@SerializeAs(VarString) public uuid!: string;
	@SerializeAs(VarString) public version!: string;
	@SerializeAs(VarString) public name!: string;
}
export class Experiment extends ProtocolSerializable { // stream.readInt32(Endianness.Little);
	@SerializeAs(VarString) public name!: string;
	@SerializeAs(Bool) public enabled!: boolean;
}
