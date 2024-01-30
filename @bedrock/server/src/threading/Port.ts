import type { Worker, MessagePort} from "node:worker_threads";
import { Logger } from "../utils";
import { messager } from "./Messager";

export type Resolvers<T,S> = {[k in keyof S]?:(type: number, taskId: bigint, data: S[k], host: T)=> void;};
export class ThreadPort<P extends MessagePort | Worker, T, K> {
	protected readonly port;
	protected readonly logger;
	protected readonly enum;
	public readonly RESOLVERS: Resolvers<this, K> = {};
	public constructor(port: P, enu: {[k: number]: string;}, logger?: Logger){
		this.enum = enu;
		this.port = port;
		this.logger = logger ?? new Logger("ThreadingPort");
		port.on("message", (data)=>this._messageResolver(data));
	}
	private readonly _tasks = new Map<bigint, (data: any)=>void>(); // Some task could depends on callback, using map to store callbacks 
	protected currentTaskId = 1n; // 0 is indicated as false
	protected _post(type: number, taskId: bigint, data: any){
		const d = messager.StructMessage(data);
		d.type = type;
		d.taskId = taskId;
		this.port.postMessage(d);
	}
	protected async _postTask(type: number, data?: any): Promise<unknown>{
		const taskId = this.currentTaskId++;
		this._post(type, taskId, data);
		return new Promise(resolve=>{this._tasks.set(taskId, resolve);});
	}
	protected _postResponse(taskId: bigint, data?: any){
		this._post(0, taskId, data);
	}
	private _messageResolver(data: {messageData: any, taskId: bigint, type: number, typeId: string}){
		const {type, taskId} = data;
		const message = messager.DestructMessage(data);
		if(!type && taskId && this._tasks.has(taskId)) (this._tasks.get(taskId) as (m: any)=>void)(message);
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		// @ts-expect-error it is in RESOLVERS
		else if (type in this.RESOLVERS) this.RESOLVERS[type as keyof K](data.type, data.taskId, data.data, this);
		else console.warn("No bridge resolver for " + this.enum[type]);
	}
	public ResolveTask(taskId: bigint, data: any){
		return this._postResponse(taskId, data);
	}
	public Post<S extends keyof T>(type: S, data?: T[S]){ 
		this._post(type as number, this.currentTaskId++, data);
	}
	public async PostTask<S extends keyof T>(type: S, data?: T[S]){
		return this._postTask(type as number, data);
	}
}
