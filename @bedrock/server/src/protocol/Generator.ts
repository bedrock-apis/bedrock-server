import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import { RAW_READABLE } from "./types";
import type { DeserializableGenerator } from "./types";

export const GeneratorWorker = {
	deserialize(stream: BinaryStream, gen: DeserializableGenerator<any, any>, prefered?: Endianness) {
		let param: any;
		let value = gen.next();
		while (!value.done) {
			const v = value.value;
			const r = v[RAW_READABLE];
			if (typeof r === "function") param = r.call(v, stream, prefered);
			else gen.throw(new TypeError("Yielded value has no RAW_READABLE"));
			value = gen.next(param);
			param = undefined;
		}
	},
};
