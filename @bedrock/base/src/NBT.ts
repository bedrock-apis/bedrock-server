import type { Buffer } from "node:buffer";
import type { Byte, Int16, Int32, Int64, Float, Double } from "./BaseTypes";
import { NBTTag } from "./NBTTag";
import type { NBTValue } from "./NBTTypes";

export abstract class DefinitionWriter {
	public abstract [NBTTag.Byte](value: number): void;
	public abstract [NBTTag.Int16](value: number): void;
	public abstract [NBTTag.Int32](value: number): void;
	public abstract [NBTTag.Float](value: number): void;
	public abstract [NBTTag.Double](value: number): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Int64](value: bigint): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Compoud](value: { [k: string]: NBTValue }): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.List](value: NBTValue[]): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.ByteArray](value: Buffer): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Int32Array](value: Int32Array | Uint32Array): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Int64Array](value: BigInt64Array | BigUint64Array): void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.String](value: string): void;
	public abstract writeType(value: number): void;
}
export abstract class DefinitionReader {
	public abstract [NBTTag.Byte](): Byte;
	public abstract [NBTTag.Int16](): Int16;
	public abstract [NBTTag.Int32](): Int32;
	public abstract [NBTTag.Float](): Float;
	public abstract [NBTTag.Double](): Double;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Int64](): Int64;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Compoud](): { [k: string]: NBTValue };
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.List](): NBTValue[];
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.ByteArray](): Buffer;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Int32Array](): Int32Array;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.Int64Array](): BigInt64Array;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public abstract [NBTTag.String](): string;
	public abstract readType(): number;
}
