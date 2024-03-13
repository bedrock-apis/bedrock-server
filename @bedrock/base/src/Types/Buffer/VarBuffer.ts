import type { Buffer } from "node:buffer";
import type { RawSerializable } from "../../BaseSerializable.js";

export const VarBuffer: RawSerializable<Buffer> = {
	[Symbol.RAW_READABLE](stream) {
		return stream.readBuffer(stream.readVarInt());
	},
	[Symbol.RAW_WRITABLE](stream, value) {
		stream.writeVarInt(value.byteLength);
		stream.writeBuffer(value);
	},
};
