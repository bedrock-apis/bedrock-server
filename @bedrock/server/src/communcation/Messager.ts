const SESSION_SYMBOL: unique symbol = Symbol("MESSAGE_TYPE");
export const MESSAGE_TYPE: unique symbol = Symbol("MESSAGE_TYPE");
export class Messager {
	protected readonly messageTypes = new Map<string, { onLoad(a: any): any; onSave(a: any): any }>();
	public registryMessageType(
		object: { readonly prototype: any } & (((...params: any[]) => any) | (new (...params: any[]) => any)),
		stringId: string,
		onSave: (a: any) => any,
		onLoad: (a: any) => any,
	) {
		this.messageTypes.set(stringId, { onSave, onLoad });
		object.prototype[SESSION_SYMBOL] = stringId;
	}
	public StructMessage(object: any) {
		const typeId = object[SESSION_SYMBOL];
		const t = this.messageTypes.get(typeId);
		return { typeId, messageData: t?.onSave(object) ?? object } as any;
	}
	public DestructMessage(message: any) {
		const { typeId, messageData } = message;
		return this.messageTypes.get(typeId)?.onLoad(messageData) ?? (messageData as any);
	}
}
export const messager = new Messager();
messager.registryMessageType(
	Object,
	"3a3f87da-c716-4711-9e47-0c77dcdeab16",
	(e) => e,
	(e) => e,
);
export function Message(messageId: string) {
	return (target: { new (...params: any): any; Destruct(data: any): any; Struct(self: any): any }) => {
		messager.registryMessageType(target, messageId, target.Struct, target.Destruct);
		// @ts-expect-error TS is strict
		target[MESSAGE_TYPE] = messageId;
	};
}

export function MessageWithPrototype(messageId: string){
	return (target: { prototype: any}) => {
		messager.registryMessageType(target as any, messageId, (self)=>{
			return self;
		}, (data)=>{
			return Object.setPrototypeOf(data, target.prototype);
		});
		// @ts-expect-error TS is strict
		target[MESSAGE_TYPE] = messageId;
	};
}
