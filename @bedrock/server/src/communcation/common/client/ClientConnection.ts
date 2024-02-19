import { Message, MessageWithPrototype } from "../../Messager";
import { ClientData } from "../General";

@MessageWithPrototype("219debfc-62c0-42aa-ad6f-15d25cb38b29")
export class ClientConnectData extends ClientData {
	public name: string;
	public xuid: string;
	public identity: string;
	public constructor(xuid: string, uuid: bigint, name: string, identity: string) {
		super(uuid);
		this.xuid = xuid;
		this.name = name;
		this.identity = identity;
	}
}
