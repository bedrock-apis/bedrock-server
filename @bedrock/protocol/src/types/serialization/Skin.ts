import {AsList, Buffer, Endianness, Float, Int32, ProtocolSerializable, SerializeAs, VarBuffer, VarString} from "@bedrock/base";
import type { ClientData } from "./LoginTokens.js";

interface SkinImage {
	data: Buffer;
	height: number;
	width: number;
}

interface SkinAnimation {
	expression: number;
	frames: number;
	image: SkinImage;
	type: number;
}
interface SkinPersonaPiece {
	def: boolean;
	packId: string;
	pieceId: string;
	pieceType: string;
	productId: string;
}
interface SkinPersonaTintColor {
	colors: string[];
	type: string;
}
export class PersonaPiece extends ProtocolSerializable{
	@SerializeAs(VarString) public pieceId!: string;
	@SerializeAs(VarString) public pieceType!: string;
	@SerializeAs(VarString) public packId!: string;
	@SerializeAs(Boolean) public def!: string;
	@SerializeAs(VarString) public productId!: string;
}
export class PersonaTintColor extends ProtocolSerializable{
	@SerializeAs(VarString) public type!: string;
	@SerializeAs(VarString) @AsList(Int32, Endianness.Little) public colors!: string;
}
export class ImageData extends ProtocolSerializable{
	@SerializeAs(Int32, Endianness.Little) public width!: number;
	@SerializeAs(Int32, Endianness.Little) public height!: number;
	@SerializeAs(VarBuffer) public data!: Buffer;
}
export class Animation extends ProtocolSerializable{
	@SerializeAs(ImageData) public image!: SkinImage;
	@SerializeAs(Int32, Endianness.Little) public type!: number;
	@SerializeAs(Float, Endianness.Little) public frames!: number;
	@SerializeAs(Float, Endianness.Little) public expression!: number;
}
export class Skin extends ProtocolSerializable {
	@SerializeAs(VarString) public id!: string;
	@SerializeAs(VarString) public playFabId!: string;
	@SerializeAs(VarString) public resourcePatch!: string;
    
	@SerializeAs(ImageData) public skinImage!: SkinImage;
    
	@SerializeAs(Animation) @AsList(Int32, Endianness.Little) public animations!: SkinAnimation[];
    
    @SerializeAs(ImageData) public capeSkin!: SkinImage;
    
    @SerializeAs(VarString) public geometry!: string;
    @SerializeAs(VarString) public version: string = "0.0.0";
    @SerializeAs(VarString) public animationData!: string;
    @SerializeAs(VarString) public capeId!: string;
    @SerializeAs(VarString) public fullId!: string;
    @SerializeAs(VarString) public armSize!: string;
    @SerializeAs(VarString) public color!: string;
     
    
    // Persona
    @SerializeAs(PersonaPiece) @AsList(Int32, Endianness.Little) public personaPieces: SkinPersonaPiece[] = [];
    @SerializeAs(PersonaTintColor) @AsList(Int32, Endianness.Little) public personaTintColors: SkinPersonaTintColor[] = [];
    
    @SerializeAs(Boolean) public premium!: boolean;
    @SerializeAs(Boolean) public hasPersona!: boolean;
	@SerializeAs(Boolean) public capeOnClassic!: boolean;
    @SerializeAs(Boolean) public unknowData1: boolean = false;
    @SerializeAs(Boolean) public unknowData2: boolean = true;
    
    public isTrusted?: boolean = true;
    public static FromClientData(data: ClientData) {
    	const that = new this();
    	that.id = data.SkinId;
    	that.playFabId = data.PlayFabId;
    	that.resourcePatch = Buffer.from(data.SkinResourcePatch, "base64").toString();

    	that.skinImage = {
    		width: data.SkinImageWidth,
    		height: data.SkinImageHeight,
    		data: Buffer.from(data.SkinData, "base64"),
    	};

    	that.animations = [];
    	for (const animation of data.AnimatedImageData) {
    		that.animations.push({
    			frames: animation.Frames,
    			type: animation.Type,
    			expression: animation.AnimationExpression,
    			image: {
    				width: animation.ImageWidth,
    				height: animation.ImageHeight,
    				data: Buffer.from(animation.Image, "base64"),
    			},
    		});
    	}
        
    	that.capeId = data.CapeId;
    	that.capeSkin = {
    		data: Buffer.from(data.CapeData, "base64"),
    		width: data.CapeImageWidth,
    		height: data.CapeImageHeight,
            
    	};

    	that.color = data.SkinColor;
    	that.armSize = data.ArmSize;

    	that.geometry = Buffer.from(data.SkinGeometryData, "base64").toString();
    	that.animationData = Buffer.from(data.SkinAnimationData, "base64").toString();
    	that.premium = data.PremiumSkin;

    	that.hasPersona = data.PersonaSkin;
    	if (that.hasPersona) {
    		for (const piece of data.PersonaPieces) {
    			that.personaPieces.push({
    				def: piece.IsDefault,
    				packId: piece.PackId,
    				pieceId: piece.PieceId,
    				pieceType: piece.PieceType,
    				productId: piece.ProductId,
    			});
    		}

    		for (const tint of data.PieceTintColors) {
    			that.personaTintColors.push({
    				colors: tint.Colors,
    				type: tint.PieceType,
    			});
    		}
    	}

    	that.capeOnClassic = data.CapeOnClassicSkin;
    	that.isTrusted = data.TrustedSkin;
    	that.fullId = data.SkinId + data.CapeId;
    	return that;
    }
}
