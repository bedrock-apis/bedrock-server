let isNativeCall = false;

export const IsNativeScope = () => isNativeCall;

export function CallInNativeScope(a: () => void) {
	isNativeCall = true;
	try {
		a();
	} finally {
		isNativeCall = false;
	}
}

export function KernelPrivate(target: { name: string }) {
	if (!isNativeCall) throw new ReferenceError("No constructor for " + target.name);
}

export function KernelConstruct<T extends any[]>(target: new (...params: T) => any, ...params: T) {
	isNativeCall = true;
	try {
		return new target(...params);
	} finally {
		isNativeCall = false;
	}
}

export type PartialParts<b, thisArg = b> = {
	[P in keyof b]?: b[P] extends (...param: infer param) => infer ret ? (this: thisArg, ...param: param) => ret : b[P];
};
export function PluginFor(
	prototype: { readonly prototype: any },
	redefinition: { readonly prototype: any },
): [{ readonly prototype: any }, any] {
	const prototypeOrigin = OverTakes(prototype.prototype, redefinition.prototype);
	const baseOrigin = OverTakes(prototype, redefinition);
	return [prototypeOrigin, baseOrigin];
}

export function OverTakes(prototype: any, redefinition: any): any {
	const prototypeOrigin = Object.setPrototypeOf(
		Object.defineProperties({}, Object.getOwnPropertyDescriptors(prototype)),
		Object.getPrototypeOf(prototype),
	);
	Object.setPrototypeOf(redefinition, prototypeOrigin);
	Object.defineProperties(prototype, Object.getOwnPropertyDescriptors(redefinition));
	return prototypeOrigin;
}

export function OverTakesStatic(prototype: any, redefinition: any, filter: string[]): any {
	const prototypeOrigin = Object.setPrototypeOf(
		Object.defineProperties({}, Object.getOwnPropertyDescriptors(prototype)),
		Object.getPrototypeOf(prototype),
	);
	Object.setPrototypeOf(redefinition, prototypeOrigin);
	const definition =  Object.getOwnPropertyDescriptors(redefinition);
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	for (const e of filter) delete definition[e];
	Object.defineProperties(prototype, definition);
	return prototypeOrigin;
}
