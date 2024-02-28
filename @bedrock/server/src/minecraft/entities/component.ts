import type { Entity } from "./entity.js";

export abstract class Component{
	public readonly componentId: string;
	protected readonly _source;
	protected constructor(componentId: string, source: Entity){
    	this.componentId = componentId;
		this._source = source;
	}
	public isValid(){
		return this._source.isValid();
	}
}
export abstract class AttributeComponent extends Component{
	public abstract currentValue: number;
	public abstract efectiveMax: number;
	public abstract efectiveMin: number;
    public abstract readonly defualt: number;
    public abstract readonly defualtMax: number;
    public abstract readonly defualtMin: number;
    protected readonly _onUpdate;
    protected constructor(componentId: string, source: Entity, onUpdate: (t: AttributeComponent)=>any){
    	super(componentId, source);
    	this._onUpdate = onUpdate;
    }
}
