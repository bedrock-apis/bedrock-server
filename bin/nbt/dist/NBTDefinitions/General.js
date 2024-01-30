"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NBT = exports.GeneralNBTDefinitionWriter = exports.GeneralNBTDefinitionReader = exports.BinaryStreamDefinitionWriter = exports.BinaryStreamDefinitionReader = void 0;
const NBT_1 = require("../NBT");
class BinaryStreamDefinitionWriter extends NBT_1.DefinitionWriter {
    [NBT_1.NBTTag.Byte](value) {
        this.stream.writeByte(value);
    }
    constructor(stream) {
        super();
        this.stream = stream;
    }
}
exports.BinaryStreamDefinitionWriter = BinaryStreamDefinitionWriter;
class BinaryStreamDefinitionReader extends NBT_1.DefinitionReader {
    [NBT_1.NBTTag.Byte]() {
        return (0, NBT_1.Byte)(this.stream.readByte());
    }
    constructor(stream) {
        super();
        this.stream = stream;
    }
}
exports.BinaryStreamDefinitionReader = BinaryStreamDefinitionReader;
class GeneralNBTDefinitionWriter extends BinaryStreamDefinitionWriter {
    writeType(value) {
        this.stream.writeByte(value);
    }
    [NBT_1.NBTTag.Compoud](value) {
        for (const [key, v] of Object.entries(value)) {
            const type = v[NBT_1.NBT_TYPE];
            if (!type)
                continue;
            this.writeType(type);
            this.writeCompoudKey(key);
            v[NBT_1.NBT_SERIALIZER](this);
        }
        this.writeType(NBT_1.NBTTag.EndOfCompoud);
    }
    [NBT_1.NBTTag.List](value) {
        const mainType = value[NBT_1.ARRAY_TYPE] ?? value[0][NBT_1.NBT_TYPE];
        this.writeType(mainType);
        this.writeArraySize(value.length);
        for (const a of value) {
            if (mainType !== a[NBT_1.NBT_TYPE])
                throw new TypeError(`List could has only one kind of type, expected ${NBT_1.NBTTag[mainType]} but got ${NBT_1.NBTTag[a[NBT_1.NBT_TYPE]]}`);
            a[NBT_1.NBT_SERIALIZER](this);
        }
    }
    [NBT_1.NBTTag.ByteArray](value) {
        this.stream.writeInt32(value.length, 1 /* Endianness.Little */);
        this.stream.writeBuffer(value);
    }
    [NBT_1.NBTTag.Int32Array](value) {
        this.writeArraySize(value.length);
        for (const i of value)
            this[NBT_1.NBTTag.Int32](i);
    }
    [NBT_1.NBTTag.Int64Array](value) {
        this.writeArraySize(value.length);
        for (const i of value)
            this[NBT_1.NBTTag.Int64](i);
    }
    WriteRootTag(tag, rootKey = '') {
        this.writeType(tag[NBT_1.NBT_TYPE]);
        this.writeCompoudKey(rootKey);
        this[tag[NBT_1.NBT_TYPE]](tag);
        return this.stream;
    }
    WriteTag(tag) {
        this.writeType(tag[NBT_1.NBT_TYPE]);
        this[tag[NBT_1.NBT_TYPE]](tag);
        return this.stream;
    }
    Write(tag) {
        this[tag[NBT_1.NBT_TYPE]](tag);
        return this.stream;
    }
}
exports.GeneralNBTDefinitionWriter = GeneralNBTDefinitionWriter;
class GeneralNBTDefinitionReader extends BinaryStreamDefinitionReader {
    readType() {
        return this.stream.readByte();
    }
    [NBT_1.NBTTag.Compoud]() {
        const compoud = {};
        while (true) {
            const readType = this.readType();
            if (readType === NBT_1.NBTTag.EndOfCompoud)
                return compoud;
            const keyName = this.readCompoudKey();
            const value = this[readType]();
            compoud[keyName] = value;
        }
    }
    [NBT_1.NBTTag.List]() {
        const readType = this.readType();
        const count = this.readArraySize();
        const array = [];
        for (let i = 0; i < count; i++)
            array.push(this[readType]());
        return array;
    }
    ReadRootTag() {
        const type = this.readType();
        this.readCompoudKey();
        return this[type]();
    }
    ReadTag() {
        const type = this.readType();
        return this[type]();
    }
    Read(tagKind) {
        return this[tagKind]();
    }
    [NBT_1.NBTTag.ByteArray]() {
        return this.stream.readBuffer(this.readArraySize());
    }
    [NBT_1.NBTTag.Int32Array]() {
        const array = new Int32Array(this.readArraySize());
        for (let i = 0; i < array.length; i++)
            array[i] = this[NBT_1.NBTTag.Int32]();
        return array;
    }
    [NBT_1.NBTTag.Int64Array]() {
        const array = new BigInt64Array(this.readArraySize());
        for (let i = 0; i < array.length; i++)
            array[i] = this[NBT_1.NBTTag.Int64]();
        return array;
    }
}
exports.GeneralNBTDefinitionReader = GeneralNBTDefinitionReader;
class NBT {
    constructor() { }
}
exports.NBT = NBT;
