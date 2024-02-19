export enum GameMessageType {
	Response = 0,
	Debug = 1,
	StartServer = 2,
	KickPlayer = 3,
	SendMessage = 4,
	BroatcastMessage = 5
}
export enum HostMessageType {
	Response = 0,
	PlayerJoin = 1,
	PlayerLeave = 2,
}
