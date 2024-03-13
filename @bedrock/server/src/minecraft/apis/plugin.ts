import { OverTakes, OverTakesStatic } from "../../kernel/base.js";
import type { Server } from "../../network/Server.js";
import type { Config } from "../../types/index.js";
import type { Engine } from "../engine.js";
import * as ms from "./plugs.js";

const native = new WeakSet(); 
export abstract class Plugin{
    private readonly registredClasses = new Set<[object, object, object, object]>();
    public readonly isRegistered = false;
    public registryClassPlugin(classModification: Function){
        if(typeof classModification !== "function") throw new TypeError("Modification for class must be a function/class");
        if(typeof classModification.prototype !== "object") throw new ReferenceError("Prototype of modification must be an object");
        const proto = Object.getPrototypeOf(classModification);
        if(!native.has(proto)) throw new ReferenceError("Modification for class must be direct sub-class of that class");
        this.registredClasses.add([classModification,classModification.prototype, proto, proto.prototype]);
        return this;
    }
    public static getClass<T extends keyof typeof ms>(className: T): typeof ms[T]{
        native.add(ms[className]);
        return ms[className];
    }
    public _onInitialization(engine: Engine){}
    public _onServerStart(server: Server, config: Config){}
    public _onRegistry(engine: Engine){
        for(const [def,defProto, base, baseProto] of this.registredClasses) {
            OverTakesStatic(base,def, ["prototype", "name", "length"]);
            OverTakes(baseProto, defProto);
        }

        engine.onTick.subscribe(e=>this._onTick(e.engine, e.currentTick));
        (this as any).isRegistered = true;
    }
    protected _onTick(engine: Engine, currentTick: bigint){}
}
