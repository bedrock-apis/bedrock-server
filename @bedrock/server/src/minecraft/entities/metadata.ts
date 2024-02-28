/* eslint-disable @typescript-eslint/no-redeclare */
import type { MetadataEntry} from "@bedrock/protocol";
import { MetadataFlags, MetadataKey, MetadataType } from "@bedrock/protocol";

export abstract class EntityMetadata<T> implements MetadataEntry{
	public readonly key;
	public readonly type;
	public  value: T;
	public constructor(key: MetadataKey, metadataType: MetadataType, value: T){
		this.key = key;
		this.type = metadataType;
		this.value = value;
	}
}
export class FloatMetadata extends EntityMetadata<number>{
	public constructor(key: MetadataKey, value = 1){
		super(key, MetadataType.Float, value);
	}
}
export class StringMetadata extends EntityMetadata<string>{
	public constructor(key: MetadataKey, value = ""){
		super(key, MetadataType.String, value);
	}
}
export class FlagsMetadata extends EntityMetadata<bigint> {
	protected constructor(key: MetadataKey.Flags | MetadataKey.FlagsExtended | MetadataKey.PlayerFlags){ 
		super(key, MetadataType.Long, 0n);
	}
}
class MainFlagsEnityMetadata extends FlagsMetadata{
	public constructor(v: bigint = 0n){
		super(MetadataKey.Flags);
		this.value = v;
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			has(target, p) { return Object.hasOwn(MetadataFlags, p) || Reflect.has(target, p); },
			ownKeys(target) {
				return [...Object.getOwnPropertyNames(MetadataFlags),...Reflect.ownKeys(target)];
			},
			get(t, p){
				if(Object.hasOwn(MetadataFlags, p)) return Boolean(t.value & MetadataFlags[p as "AffectedByGravity"]);
				else return Reflect.get(t, p);
			},
			set(t, p, v){
				if(Object.hasOwn(MetadataFlags, p)) {
					t.value = p?t.value | MetadataFlags[p as "AffectedByGravity"]:t.value & ~MetadataFlags[p as "AffectedByGravity"];
					console.log("SET:",p, "0b" + t.value.toString(2));
					return true;
				}
				else return Reflect.set(t, p, v);
			}
		});
	}
};

export type MainFlagsMetadata = {[k in keyof typeof MetadataFlags]: boolean};
export const MainFlagsMetadata: new (def?: bigint)=>MainFlagsEnityMetadata & MainFlagsMetadata = MainFlagsEnityMetadata as any;
