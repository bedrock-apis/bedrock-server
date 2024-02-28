import { DEFAULT_ATTRIBUTES } from "../constants";

export class Component{
	public id;
	public constructor(id: string){
		this.id = id;
	}
}
export class AttributeComponent extends Component{
	public default;
	public current;
	public max;
	public min;
	public get defualtMax(){return DEFAULT_ATTRIBUTES[this.id as "minecraft:luck"].max;};
	public get defualtMin(){return DEFAULT_ATTRIBUTES[this.id as "minecraft:luck"].min;};
	public constructor(id: string){
		super(id);
		if(!(id in DEFAULT_ATTRIBUTES)) console.warn("Unknown attribute: " + id);
		this.id = id;
		const {default: def, current, max, min} = DEFAULT_ATTRIBUTES[id as "minecraft:luck"];
		this.default = def;
		this.current = current;
		this.max = max;
		this.min = min;
	}
}
