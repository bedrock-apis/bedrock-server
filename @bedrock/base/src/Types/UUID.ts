import { NewSerializable } from "../ProtocolSerializable.js";

export const UUID = NewSerializable((str,v: string)=>{str.writeUuid(v);}, (str)=>str.readUuid());
