const SERIALIZABLE_TYPE: unique symbol = Symbol("SERIALIZABLE_TYPE");
const DESERIALIZABLE_TYPE: unique symbol = Symbol("SERIALIZABLE_TYPE");
const RAW_WRITABLE: unique symbol = Symbol("RAW_WRITABLE");
const RAW_READABLE: unique symbol = Symbol("RAW_READABLE");

declare global {
	interface SymbolConstructor {
		readonly DESERIALIZABLE_TYPE: unique symbol;
		readonly RAW_READABLE: unique symbol;
		readonly RAW_WRITABLE: unique symbol;
		readonly SERIALIZABLE_TYPE: unique symbol;
	}
}
// @ts-expect-error READONLY
Symbol.SERIALIZABLE_TYPE = SERIALIZABLE_TYPE;
// @ts-expect-error READONLY
Symbol.DESERIALIZABLE_TYPE = DESERIALIZABLE_TYPE;
// @ts-expect-error READONLY
Symbol.RAW_WRITABLE = RAW_WRITABLE;
// @ts-expect-error READONLY
Symbol.RAW_READABLE = RAW_READABLE;

export {};
