export class ClientData {
	public uuid: bigint;
	public constructor(uuid: bigint) {
		this.uuid = uuid;
	}
}
export interface ClientData{
	uuid: bigint;
}
