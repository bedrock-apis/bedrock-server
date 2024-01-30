import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import type { RawReadable, RawWritable } from "./General";
import { RAW_READABLE, RAW_WRITABLE } from "./General";

declare global {
	interface String extends RawWritable {}
	interface StringConstructor extends RawReadable<string> {}
}

const natives: any[] = [String];
const prototypes: ((this: any, stream: BinaryStream, endian?: Endianness) => void)[] = [
	function string(stream) {
		stream.writeVarString(this as string);
	}, // String writable
];
const constructors: ((this: any, stream: BinaryStream, endian?: Endianness) => any)[] = [
	function string(stream) {
		return stream.readVarString();
	}, // String Readable
];
for (const [i, v] of natives.entries()) {
	v.prototype[RAW_WRITABLE] = prototypes[i];
	v[RAW_READABLE] = constructors[i];
}
