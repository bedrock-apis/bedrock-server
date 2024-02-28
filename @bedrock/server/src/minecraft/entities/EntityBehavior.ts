export class EntityBehavior{
	public clone(): EntityBehavior{
		return Object.setPrototypeOf({}, this);
	}
}
