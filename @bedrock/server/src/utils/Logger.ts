
export class Logger{
	public static DEBUG: boolean = false;
	protected roots: string[];
	public constructor(session: string, base?: Logger){
		const roots = base?[...base.roots,"["+session+"]"]:["[" + session + "]"];
		this.roots = roots;
		this.debug = this.debug.bind(this);
		this.info = this.info.bind(this);
		this.log = this.log.bind(this);
		this.warn = this.warn.bind(this);
		this.error = this.error.bind(this);
	}
	public getTimeFormated(){
		const date = new Date();
		return `<${date.getUTCFullYear()}-${date.getMonth()}-${date.getUTCDate()}:${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}>`;
	}
	public debug(...params: any[]){ if(Logger.DEBUG) console.debug(this.getTimeFormated(),...this.roots, "[DEBUG]", ...params); }
	public info(...params: any[]){ console.info(this.getTimeFormated(),...this.roots, "[INFO]", ...params); }
	public log(...params: any[]){ console.log(this.getTimeFormated(),...this.roots, "[LOG]", ...params); }
	public warn(...params: any[]){ console.warn(this.getTimeFormated(),...this.roots, "[WARN]", ...params); }
	public error(...params: any[]){ console.error(this.getTimeFormated(),...this.roots, "[ERROR]", ...params); }
}
