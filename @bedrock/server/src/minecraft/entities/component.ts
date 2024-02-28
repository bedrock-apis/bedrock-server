export abstract class Component{
	public abstract readonly componentId: string;    
    public abstract isValid(): string;
}
