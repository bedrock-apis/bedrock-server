export class Type{
	public readonly id: string;
	protected constructor(id: string){
		this.id = id;
	}
}
export class Types<T extends Type> {
	protected static TYPES: Map<string, Type> = new Map();
	protected constructor(){}
	public types!: T[];
	public static getAll<T extends Type>(this: { prototype: Types<T> }): IterableIterator<T> {
		return (this as any).TYPES!.values();
	}
	public static get<T extends Type>(this: { prototype: Types<T> }, typeId: string): T | undefined{
		return (this as any).TYPES!.get(typeId.includes(":")?typeId:"minecraft:" + typeId);
	}
}
