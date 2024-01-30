import { Buffer } from "node:buffer";
import type { DeserializableGenerator, RawReadable } from "@bedrock/server";
import { BinaryStream, GeneratorWorker, Byte } from "@bedrock/server";

GeneratorWorker.deserialize(new BinaryStream(Buffer.from([84, 95, 3, 5, 6, 8])), test());

function* test(): DeserializableGenerator<RawReadable<any>> {
	console.warn(yield Byte);
	console.warn(yield Byte);
	console.warn(yield* simpleArray());
}

function* simpleArray(): DeserializableGenerator<RawReadable<Byte>, number[]> {
	const array: number[] = [];
	const l = yield Byte;
	for (let i = 0; i < l; i++) {
		array.push(yield Byte);
	}

	return array;
}
