import type { Endianness , BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../BaseSerializable";
import { BedrockNBT, LightNBT, NBT } from "./NBTAlgorithms";

class RootTag{
	protected constructor(){}
	public static NBT = NBT;
	public static [Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness){
		return this.NBT.ReadRootTag(stream);
	}
	public static [Symbol.RAW_WRITABLE](stream: BinaryStream, value: any, endian?: Endianness){
		this.NBT.WriteRootTag(stream, value??{});
	}
}
class BedrockRootTag extends RootTag{ public static NBT = BedrockNBT;}
class LightRootTag extends RootTag{ public static NBT = LightNBT;}

type BedrockRootTagConstructor = RawSerializable<any> & typeof BedrockRootTag;
type LightRootTagConstructor = RawSerializable<any> & typeof LightRootTag;

export const BRootTag: BedrockRootTagConstructor = BedrockRootTag as any;
export const LRootTag: LightRootTagConstructor = LightRootTag as any;
