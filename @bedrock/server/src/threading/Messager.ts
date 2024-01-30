const SESSION_SYMBOL: unique symbol = Symbol("MESSAGE_TYPE");
export class Messager{
	protected readonly messageTypes = new Map<string, {onLoad(a:any): any, onSave(a: any): any}>();
	public registryMessageType(object: {readonly prototype: any} & (((...params: any[])=>any) | (new (...params: any[])=>any)), stringId: string, onSave: (a: any)=>any, onLoad: (a: any)=> any){
		this.messageTypes.set(stringId, {onSave, onLoad});
		object.prototype[SESSION_SYMBOL] = stringId;
	}
	public StructMessage(object: any){
		const typeId = object[SESSION_SYMBOL];
		const t = this.messageTypes.get(typeId);
		if(t) return {typeId,messageData:t.onSave(object)};
		return null as any;
	}
	public DestructMessage(message: any){
		const {typeId, messageData} = message;
		return this.messageTypes.get(typeId)?.onLoad(messageData);
	}
}
export const messager = new Messager();
messager.registryMessageType(Object, "3a3f87da-c716-4711-9e47-0c77dcdeab16", e=>e, e=>e);