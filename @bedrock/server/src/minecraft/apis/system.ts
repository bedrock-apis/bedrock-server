export abstract class System {
	public abstract readonly currentTick: bigint;
	public abstract run(callback: () => any): bigint;
	public abstract clearRun(id: bigint): void;
	public abstract runTimeout(callback: () => any, delay?: number): bigint;
	public abstract runInterval(callback: () => any, interval: number): bigint;
}
export const queue: unique symbol = Symbol("SystemQueue");
const map: unique symbol = Symbol("SystemQueue");
export class InternalSystem extends System {
	public __currentTick;
	public __runsExecuted = false;
	public [queue] = new Map<bigint, Map<bigint, () => any>>();
	public [map] = new Map<bigint, bigint>();
	public get currentTick() {
		return this.__currentTick;
	}
	public constructor(currentTick: bigint) {
		super();
		this.__currentTick = currentTick;
	}
	public run(callback: () => any): bigint {
		throw new Error("Method not implemented.");
	}
	public clearRun(id: bigint): void {
		throw new Error("Method not implemented.");
	}
	public runTimeout(callback: () => any, delay?: number | undefined): bigint {
		throw new Error("Method not implemented.");
	}
	public runInterval(callback: () => any, interval: number): bigint {
		throw new Error("Method not implemented.");
	}
	public onTick() {
		this.__runsExecuted = false;
		this.__runsExecuted = true;
	}
}
