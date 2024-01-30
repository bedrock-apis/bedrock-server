"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedrockNBTDefinitionWriter = exports.BedrockNBTDefinitionReader = exports.BedrockNBT = void 0;
const NBT_1 = require("../NBT");
const General_1 = require("./General");
class BedrockNBTDefinitionWriter extends General_1.GeneralNBTDefinitionWriter {
    [NBT_1.NBTTag.Int16](value) {
        this.stream.writeInt16(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Int32](value) {
        this.stream.writeInt32(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Float](value) {
        this.stream.writeFloat32(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Double](value) {
        this.stream.writeFloat64(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Int64](value) {
        this.stream.writeInt64(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.String](value) {
        this.stream.writeString16(value, 1 /* Endianness.Little */);
    }
    writeCompoudKey(key) {
        this[NBT_1.NBTTag.String](key);
    }
    writeArraySize(size) {
        this[NBT_1.NBTTag.Int32](size);
    }
}
exports.BedrockNBTDefinitionWriter = BedrockNBTDefinitionWriter;
class BedrockNBTDefinitionReader extends General_1.GeneralNBTDefinitionReader {
    readCompoudKey() {
        return this[NBT_1.NBTTag.String]();
    }
    readArraySize() {
        return this[NBT_1.NBTTag.Int32]().valueOf();
    }
    [NBT_1.NBTTag.Int16]() {
        return (0, NBT_1.Int16)(this.stream.readInt16(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Int32]() {
        return (0, NBT_1.Int32)(this.stream.readInt32(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Float]() {
        return (0, NBT_1.Float)(this.stream.readFloat32(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Double]() {
        return (0, NBT_1.Double)(this.stream.readFloat64(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Int64]() {
        return (0, NBT_1.Int64)(this.stream.readInt64(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.String]() {
        return this.stream.readString16(1 /* Endianness.Little */);
    }
}
exports.BedrockNBTDefinitionReader = BedrockNBTDefinitionReader;
class BedrockNBT extends General_1.NBT {
    static ReadRootTag(stream) {
        return new BedrockNBTDefinitionReader(stream).ReadRootTag();
    }
    static ReadTag(stream) {
        return new BedrockNBTDefinitionReader(stream).ReadTag();
    }
    static Read(tag, stream) {
        return new BedrockNBTDefinitionReader(stream).Read(tag);
    }
    static WriteRootTag(stream, tag) {
        new BedrockNBTDefinitionWriter(stream).WriteRootTag(tag);
    }
    static WriteTag(stream, tag) {
        new BedrockNBTDefinitionWriter(stream).WriteTag(tag);
    }
    static Write(stream, tag) {
        new BedrockNBTDefinitionWriter(stream).Write(tag);
    }
}
exports.BedrockNBT = BedrockNBT;
