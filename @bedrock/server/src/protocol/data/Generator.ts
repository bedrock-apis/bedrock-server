import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
/*
export const GeneratorWorker = {
	Resolve<G>(stream: BinaryStream, gen: DeserializableGenerator<G>, prefered?: Endianness): G {
		let param: any;
		let value = gen.next();
		while (!value.done) {
			const v = value.value;
			const r = v[Symbol.RAW_READABLE];
			if (typeof r === "function") param = r.call(v, stream, prefered);
			else gen.throw(new TypeError("Yielded value has no RAW_READABLE"));
			value = gen.next(param);
			param = undefined;
		}

		return value.value;
	},
	Build(stream: BinaryStream, gen: SerializableGenerator, prefered?: Endianness){		
		let param: any;
		let value = gen.next();
		while (!value.done) {
			const v = value.value;
			const r = v[Symbol.RAW_WRITABLE];
			if (typeof r === "function") param = r.call(v, stream, prefered);
			else gen.throw(new TypeError("Yielded value has no RAW_READABLE"));
			value = gen.next(param);
			param = undefined;
		}
	}
};
*/
