import type { Worker, MessagePort } from "node:worker_threads";
import { Logger } from "../utils";
import { messager } from "./Messager";

export type Resolvers<T, S> = { [k in keyof S]?: (this: T, data: S[k], taskId: bigint, type: k) => void };
export class ThreadPort<
	P extends MessagePort | Worker,
	RecieveMapping,
	SendMapping,
	RecieveTasksMapping,
	SendTasksMapping,
> {
	protected readonly port;
	protected readonly logger;
	protected readonly resolveEnum;
	public readonly RESOLVERS: Resolvers<this, RecieveMapping> = {};
	public constructor(port: P, enu: { [k: number]: string }, logger?: Logger) {
		this.resolveEnum = enu;
		this.port = port;
		this.logger = logger ?? new Logger("ThreadingPort");
		port.on("message", (data) => this._messageResolver(data));
	}
	private readonly _tasks = new Map<bigint, (data: any) => void>(); // Some task could depends on callback, using map to store callbacks
	protected currentTaskId = 1n; // 0 is indicated as false
	protected _post(type: number, taskId: bigint, data: any) {
		const d = messager.StructMessage(data);
		d.type = type;
		d.taskId = taskId;
		this.port.postMessage(d);
	}
	protected async _postTask(type: number, data?: any): Promise<unknown> {
		const taskId = this.currentTaskId++;
		this._post(type, taskId, data);
		return new Promise((resolve) => {
			this._tasks.set(taskId, resolve);
		});
	}
	protected _postResponse(taskId: bigint, data?: any) {
		this._post(0, taskId, data);
	}
	private _messageResolver(data: { messageData: any; taskId: bigint; type: number; typeId: string }) {
		const { type, taskId } = data;
		const message = messager.DestructMessage(data);
		if (!type && taskId && this._tasks.has(taskId)) (this._tasks.get(taskId) as (m: any) => void)(message);
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		// @ts-expect-error it is in RESOLVERS
		else if (type in this.RESOLVERS) this.RESOLVERS[type as keyof K].call(this, message, taskId, type);
		else console.warn("No bridge resolver for " + this.resolveEnum[type]);
	}
	public ResolveTask<K extends keyof RecieveMapping & keyof SendTasksMapping>(
		taskId: bigint,
		type: K,
		data: SendTasksMapping[K],
	) {
		return this._postResponse(taskId, data);
	}
	public Post<K extends keyof SendMapping>(type: K, data: SendMapping[K]) {
		this._post(type as number, this.currentTaskId++, data);
	}
	public async PostTask<K extends keyof RecieveTasksMapping & keyof SendMapping>(
		type: K,
		data?: SendMapping[K],
	): Promise<RecieveTasksMapping[K]> {
		return this._postTask(type as number, data) as any;
	}
}
