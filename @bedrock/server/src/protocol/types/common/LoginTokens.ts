import type { BinaryStream } from "@serenityjs/binarystream";
import { Endianness } from "@serenityjs/binarystream";
import fastJwt from "fast-jwt";
import type { Constructor } from "../general";
import { RawSerialize } from "../general";

const decoder = fastJwt.createDecoder();
export interface ClientData {
	AnimatedImageData: any[]; // TODO
	ArmSize: string;
	CapeData: string;
	CapeId: string;
	CapeImageHeight: number;
	CapeImageWidth: number;
	CapeOnClassicSkin: boolean;
	ClientRandomId: number;
	CompatibleWithClientSideChunkGen: true;
	CurrentInputMode: number;
	DefaultInputMode: number;
	DeviceId: string;
	DeviceModel: string;
	DeviceOS: number;
	GameVersion: string;
	GuiScale: number;
	IsEditorMode: boolean;
	LanguageCode: string;
	OverrideSkin: boolean;
	PersonaPieces: any[]; // TODO
	PersonaSkin: boolean;
	PieceTintColors: any[]; // TODO
	PlatformOfflineId: string;
	PlatformOnlineId: string;
	PlayFabId: string;
	PremiumSkin: boolean;
	SelfSignedId: string;
	ServerAddress: string;
	SkinAnimationData: string;
	SkinColor: string;
	SkinData: string;
	SkinGeometryData: string;
	SkinGeometryDataEngineVersion: string;
	SkinId: string;
	SkinImageHeight: number;
	SkinImageWidth: number;
	SkinResourcePatch: string;
	ThirdPartyName: string;
	ThirdPartyNameOnly: boolean;
	TrustedSkin: boolean;
	UIProfile: number;
}

export interface IdentityData {
	XUID: string;
	displayName: string;
	identity: string;
	sandBoxId: string;
	titleId: string;
}

export interface LoginTokenData {
	clientData: ClientData;
	identityData: IdentityData;
	publicKey: string;
}
export class LoginToken extends RawSerialize {
	public clientData!: ClientData;
	public identityData!: IdentityData;
	public publicKey!: string;
	protected Serialize(
		that: Constructor<this>,
		stream: BinaryStream,
		value: this,
		endian?: Endianness | undefined,
	): void {
		/*
		stream.writeVarInt(value.identity.length + value.client.length + 8);
		stream.writeString32(value.identity, Endianness.Little);
		stream.writeString32(value.client, Endianness.Little);*/
		throw new ReferenceError("No implementation");
	}
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		stream.readVarInt();
		// Parse the identity chain data
		const chains: string[] = JSON.parse(stream.readString32(Endianness.Little)).chain;
		// Decode the chains
		const decodedChains = chains.map((chain) => decoder(chain));
		// Contains mainly metadata, but also includes important XBL data (displayName, xuid, identity uuid, etc.)
		const identityData: IdentityData = decodedChains.find((chain) => chain.extraData !== undefined)?.extraData;
		// Public key for encryption
		// TODO: Implement encryption
		const publicKey = decodedChains.find((chain) => chain.identityPublicKey !== undefined)?.identityPublicKey;
		const there = new that();
		there.identityData = identityData;
		there.publicKey = publicKey;
		there.clientData = decoder(stream.readString32(Endianness.Little));
		return there;
	}
}
