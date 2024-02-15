import type { Client } from "../server/Client";
import { PublicEvent } from "../utils";

export class ClientEventData {
	public readonly connection;
	public readonly client;
	public readonly server;
	public readonly port;
	public constructor(client: Client) {
		this.connection = client.connection;
		this.client = client;
		this.server = client.server;
		this.port = client.server.port;
	}
}
export class ClientEvent<T extends ClientEventData> extends PublicEvent<[T]> {}

export class ClientDisconnectEventData extends ClientEventData {}
export class ClientConnectEventData extends ClientEventData {}

export class ClientDisconnectEvent extends ClientEvent<ClientDisconnectEventData> {}
export class ClientConnectEvent extends ClientEvent<ClientConnectEventData> {}
