import { RESET_COLOR } from "../constants/index.js";

export enum ConsoleColor {
	Black = 0,
	Red,
	Green,
	Yellow,
	Blue,
	Magenta,
	Cyan,
	White,
	Default = 9,
	Background = 10,
	Bright = 60,
}

const LoggerInfo = {
	Debug: fr(ConsoleColor.Magenta + ConsoleColor.Bright, "DEBUG"),
	Info: fr(ConsoleColor.Blue + ConsoleColor.Bright, "INFO"),
	Log: fr(ConsoleColor.White + ConsoleColor.Bright, "LOG"),
	Warn: fr(ConsoleColor.Yellow, "WARN"),
	Error: fr(ConsoleColor.Red + ConsoleColor.Bright, "ERROR"),
};
export class Logger {
	public static DEBUG: boolean = false;
	protected roots: string[];
	public constructor(session: string, base?: Logger) {
		const roots = base ? [...base.roots, "[" + session + RESET_COLOR + "]"] : ["[" + session + RESET_COLOR + "]"];
		this.roots = roots;
		this.debug = this.debug.bind(this);
		this.info = this.info.bind(this);
		this.log = this.log.bind(this);
		this.warn = this.warn.bind(this);
		this.error = this.error.bind(this);
	}
	public getTimeFormated() {
		const date = new Date();
		return `<${date.getUTCFullYear()}-${date.getMonth()}-${date.getUTCDate()}:${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}>`;
	}
	public debug(...params: any[]) {
		if (Logger.DEBUG)
			console.debug(
				"\u001B[90m" + this.getTimeFormated() + RESET_COLOR,
				...this.roots,
				`[${LoggerInfo.Debug}]`,
				...params,
			);
	}
	public info(...params: any[]) {
		console.info("\u001B[90m" + this.getTimeFormated() + RESET_COLOR, ...this.roots, `[${LoggerInfo.Info}]`, ...params);
	}
	public log(...params: any[]) {
		console.log("\u001B[90m" + this.getTimeFormated() + RESET_COLOR, ...this.roots, `[${LoggerInfo.Log}]`, ...params);
	}
	public warn(...params: any[]) {
		console.warn("\u001B[90m" + this.getTimeFormated() + RESET_COLOR, ...this.roots, `[${LoggerInfo.Warn}]`, ...params);
	}
	public error(...params: any[]) {
		console.error(
			"\u001B[90m" + this.getTimeFormated() + RESET_COLOR,
			...this.roots,
			`[${LoggerInfo.Error}]`,
			...params,
		);
	}
	public static FromConsoleColor(conolseColor: number, text: string) {
		return `\u001B[${conolseColor + 30}m` + (text ?? "");
	}
	public static FromRGB(r: number, g: number, b: number, foreground = true, text?: string) {
		return `\u001B[${foreground ? 3 : 4}8;2;${r};${g};${b}m` + (text ?? "");
	}
}

function fr(color: number, text: string) {
	return `\u001B[${color + 30}m${text}\u001B[39m`;
}
