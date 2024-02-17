export const NBT_WRITE: unique symbol = Symbol("NBT_WRITE");
export const NBT_TYPE: unique symbol = Symbol("NBT_TYPE");
export const ARRAY_TYPE: unique symbol = Symbol("ARRAY_TYPE");
export const RAW_WRITABLE: unique symbol = Symbol("RAW_WRITABLE");
export const RAW_READABLE: unique symbol = Symbol("RAW_READABLE");

declare global {
	interface SymbolConstructor {
		readonly ARRAY_TYPE: unique symbol;
		readonly NBT_TYPE: unique symbol;
		readonly NBT_WRITE: unique symbol;
		readonly RAW_READABLE: unique symbol;
		readonly RAW_WRITABLE: unique symbol;
	}
}
Object.assign(Symbol, {
	NBT_WRITE,
	NBT_TYPE,
	ARRAY_TYPE,
	RAW_WRITABLE,
	RAW_READABLE,
});
