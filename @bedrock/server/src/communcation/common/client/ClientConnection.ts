import { Message, MessageWithPrototype } from "../../Messager";
import { ClientData } from "../General";

@MessageWithPrototype("219debfc-62c0-42aa-ad6f-15d25cb38b29")
export class ClientConnectData extends ClientData {
	public name: string;
	public uuid: string;
	public constructor(xuid: string, uuid: string, name: string) {
		super(xuid);
		this.uuid = uuid;
		this.name = name;
	}
}
