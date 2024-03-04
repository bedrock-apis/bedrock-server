export enum AttributeModifierId {
	Springting = "d208fc00-42aa-4aad-9276-d5446530de43",
}
export class AttributeModifier {
	public readonly id;
	public value;
	public name;
	public readonly operator = 2;
	public readonly operand = 2;
	public readonly serializable = false;
	protected constructor(id: string, value: number, name?: string) {
		this.id = id;
		this.name = name ?? "";
		this.value = value;
	}
}
export class InternalAttributeModifier extends AttributeModifier {
	public constructor(id: string, value: number, name?: string) {
		super(id, value, name);
	}
}
