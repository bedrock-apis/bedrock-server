declare global {
	function delay(milliseconds: number): Promise<void>;
}
globalThis.delay = delay;

export async function delay(ticks: number): Promise<void> {
	// eslint-disable-next-line no-restricted-globals, no-promise-executor-return
	return new Promise((resolve) => setTimeout(resolve, ticks));
}
