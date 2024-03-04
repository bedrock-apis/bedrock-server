import type { BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../BaseSerializable.js";

declare global {
	interface StringConstructor extends RawSerializable<string> {}
	interface BooleanConstructor extends RawSerializable<boolean> {}
	interface Number {
		toBigFlag(): bigint;
		toFlag(): number;
	}
	interface BigInt {
		toBigFlag(): bigint;
		toFlag(): number;
	}
}
Object.defineProperties(
	String,
	Object.getOwnPropertyDescriptors({
		[Symbol.RAW_WRITABLE](stream: BinaryStream, value: string) {
			stream.writeVarString(value ?? "");
		},
		[Symbol.RAW_READABLE](stream: BinaryStream) {
			return stream.readVarString();
		},
	}),
);
Object.defineProperties(
	Boolean,
	Object.getOwnPropertyDescriptors({
		[Symbol.RAW_WRITABLE](stream: BinaryStream, value: boolean) {
			stream.writeBool(value ?? false);
		},
		[Symbol.RAW_READABLE](stream: BinaryStream) {
			return stream.readBool();
		},
	}),
);

const base = Object.getOwnPropertyDescriptors({
	toBigFlag() {
		return 1n << BigInt(this as any);
	},
	toFlag() {
		return 1 << Number(this);
	},
});
Object.defineProperties((Number as any).prototype, base);
Object.defineProperties((BigInt as any).prototype, base);
