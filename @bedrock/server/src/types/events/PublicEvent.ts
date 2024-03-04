const sessions = new WeakMap<PublicEvent<any>, Set<(...params: any) => void>>();

/**
 * @beta
 */
export class PublicEvent<A extends any[]> {
	public constructor() {
		sessions.set(this, new Set());
	}
	/**
	 * Subscribes to the event signal.
	 *
	 * @template  k - The type of the event handler function.
	 * @param method - The event handler function to subscribe.
	 * @returns The subscribed event handler function.
	 */
	public subscribe<M extends (...param: A) => void>(method: M): M {
		const t = typeof method;
		if (t !== "function") throw new TypeError(`Expected a function, but got ${t}.`);
		if (sessions.has(this)) {
			const set: Set<any> = sessions.get(this) as any;
			if (!set.has(method)) set.add(method);
		}

		return method;
	}

	/**
	 * Unsubscribes from the event signal.
	 *
	 * @template k - The type of the event handler function.
	 * @param method - The event handler function to unsubscribe.
	 * @returns The unsubscribed event handler function.
	 */
	public unsubscribe<M extends (...params: A) => void>(method: M): M {
		const t = typeof method;
		if (t !== "function") throw new TypeError(`Expected a function, but got ${t}.`);
		if (sessions.has(this)) sessions.get(this)?.delete(method);
		return method;
	}
	protected async trigger(...params: A) {
		return TriggerEvent(this, ...params);
	}
}
export async function TriggerEvent<E extends any[] = []>(event: PublicEvent<E>, ...params: E) {
	if (sessions.has(event)) {
		const promises: Promise<unknown>[] = [];
		for (const method of sessions.get(event) as any) {
			promises.push((async () => method(...params))().catch((error) => console.error(error, error.stack)));
		}

		return Promise.all(promises);
	}

	return [];
}
