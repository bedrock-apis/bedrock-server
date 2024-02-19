import { MessageWithPrototype } from "../../Messager";
import { ClientData } from "../General";

@MessageWithPrototype("bd48c117-62ec-47dd-a5cc-ba22b8ebb76d")
export class PostMessage extends ClientData {
	public message: string;
	public constructor(xuid: string, message: string) {
		super(xuid);
		this.message = message;
	}
}
