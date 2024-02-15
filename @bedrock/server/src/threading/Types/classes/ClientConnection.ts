import { Message } from "../../Messager";
import { ClientData } from "./General";

@Message("0956da6b-88c0-4180-af6d-1987871a796c")
export class ClientConnectData extends ClientData {
	public name: string;
	public uuid: string;
	public constructor(xuid: string, uuid: string, name: string) {
		super(xuid);
		this.uuid = uuid;
		this.name = name;
	}
	public static Destruct(data: any) {
		return Object.setPrototypeOf(data, ClientConnectData.prototype);
	}
	public static Struct(data: ClientConnectData) {
		return {
			name: data.name,
			xuid: data.xuid,
			uuid: data.uuid,
		};
	}
}
