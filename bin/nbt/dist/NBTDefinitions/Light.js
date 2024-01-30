"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightNBTDefinitionWriter = exports.LightNBTDefinitionReader = exports.LightNBT = void 0;
const node_buffer_1 = require("node:buffer");
const NBT_1 = require("../NBT");
const General_1 = require("./General");
class LightNBTDefinitionWriter extends General_1.GeneralNBTDefinitionWriter {
    [NBT_1.NBTTag.Int16](value) {
        this.stream.writeInt16(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Int32](value) {
        this.stream.writeVarInt(value);
    }
    [NBT_1.NBTTag.Float](value) {
        this.stream.writeFloat32(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Double](value) {
        this.stream.writeFloat64(value, 1 /* Endianness.Little */);
    }
    [NBT_1.NBTTag.Int64](value) {
        this.stream.writeVarLong(value);
    }
    [NBT_1.NBTTag.ByteArray](value) {
        this.stream.writeVarInt(value.length);
        this.stream.writeBuffer(value);
    }
    [NBT_1.NBTTag.String](value) {
        const buf = node_buffer_1.Buffer.from(value, 'utf8');
        this.stream.writeVarInt(buf.length);
        this.stream.writeBuffer(buf);
    }
    writeCompoudKey(key) {
        const buf = node_buffer_1.Buffer.from(key, 'utf8');
        this.stream.writeVarInt(buf.length);
        this.stream.writeBuffer(buf);
    }
    writeArraySize(size) {
        this.stream.writeVarInt(size * 2);
    } // IDK why the size is doubled
}
exports.LightNBTDefinitionWriter = LightNBTDefinitionWriter;
class LightNBTDefinitionReader extends General_1.GeneralNBTDefinitionReader {
    readCompoudKey() {
        return this.stream.readBuffer(this.stream.readVarInt()).toString('utf8');
    }
    readArraySize() {
        return this.stream.readVarInt() / 2;
    } // IDK why the size is doubled
    [NBT_1.NBTTag.Int16]() {
        return (0, NBT_1.Int16)(this.stream.readInt16(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Int32]() {
        return (0, NBT_1.Int32)(this.stream.readVarInt());
    }
    [NBT_1.NBTTag.Float]() {
        return (0, NBT_1.Float)(this.stream.readFloat32(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Double]() {
        return (0, NBT_1.Double)(this.stream.readFloat64(1 /* Endianness.Little */));
    }
    [NBT_1.NBTTag.Int64]() {
        return (0, NBT_1.Int64)(this.stream.readVarLong());
    }
    [NBT_1.NBTTag.ByteArray]() {
        return this.stream.readBuffer(this.stream.readVarInt());
    }
    [NBT_1.NBTTag.String]() {
        return this.stream.readBuffer(this.stream.readVarInt()).toString('utf8');
    }
}
exports.LightNBTDefinitionReader = LightNBTDefinitionReader;
class LightNBT extends General_1.NBT {
    static ReadRootTag(stream) {
        return new LightNBTDefinitionReader(stream).ReadRootTag();
    }
    static ReadTag(stream) {
        return new LightNBTDefinitionReader(stream).ReadTag();
    }
    static Read(tag, stream) {
        return new LightNBTDefinitionReader(stream).Read(tag);
    }
    static WriteRootTag(stream, tag) {
        new LightNBTDefinitionWriter(stream).WriteRootTag(tag);
    }
    static WriteTag(stream, tag) {
        new LightNBTDefinitionWriter(stream).WriteTag(tag);
    }
    static Write(stream, tag) {
        new LightNBTDefinitionWriter(stream).Write(tag);
    }
}
exports.LightNBT = LightNBT;
