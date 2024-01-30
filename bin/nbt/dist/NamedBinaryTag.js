"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedBinaryTag = void 0;
const node_buffer_1 = require("node:buffer");
const binarystream_1 = require("@serenityjs/binarystream");
const NbtTag_1 = require("./NbtTag");
class NamedBinaryTag extends binarystream_1.BinaryStream {
    constructor(buffer, varint = false) {
        super(buffer);
        this.varint = varint;
        this.readLength = varint ? this.readVarInt : this.readUint16;
        this.writeLength = varint ? this.writeVarInt : this.writeUint16;
    }
    readString() {
        const length = this.readLength(1 /* Endianness.Little */);
        const value = this.read(length);
        return String.fromCodePoint(...value);
    }
    writeString(value) {
        this.writeLength(value.length, 1 /* Endianness.Little */);
        this.writeBuffer(node_buffer_1.Buffer.from(value));
    }
    readTag() {
        const tag = this.readByte();
        switch (tag) {
            default: {
                throw new Error(`Unknown tag type: ${tag} at offset ${this.offset - 1}`);
            }
            case NbtTag_1.NbtTag.End: {
                return { name: '', type: NbtTag_1.NbtTag.End, value: null };
            }
            case NbtTag_1.NbtTag.Byte: {
                return this.readByteTag();
            }
            case NbtTag_1.NbtTag.Short: {
                return this.readShortTag();
            }
            case NbtTag_1.NbtTag.Int: {
                return this.readIntTag();
            }
            case NbtTag_1.NbtTag.Long: {
                return this.readLongTag();
            }
            case NbtTag_1.NbtTag.Float: {
                return this.readFloatTag();
            }
            case NbtTag_1.NbtTag.Double: {
                return this.readDoubleTag();
            }
            case NbtTag_1.NbtTag.ByteList: {
                return this.readByteListTag();
            }
            case NbtTag_1.NbtTag.String: {
                return this.readStringTag();
            }
            case NbtTag_1.NbtTag.List: {
                return this.readListTag();
            }
            case NbtTag_1.NbtTag.Compound: {
                return this.readCompoundTag();
            }
        }
    }
    readByteTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.Byte,
            value: this.readByte(),
        };
    }
    writeByteTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeByte(value.value);
    }
    readShortTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.Short,
            value: this.readShort(1 /* Endianness.Little */),
        };
    }
    writeShortTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeShort(value.value, 1 /* Endianness.Little */);
    }
    readIntTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.Int,
            value: this.varint ? this.readVarInt() : this.readInt32(1 /* Endianness.Little */),
        };
    }
    writeIntTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        if (this.varint) {
            this.writeVarInt(value.value);
        }
        else {
            this.writeInt32(value.value, 1 /* Endianness.Little */);
        }
    }
    readLongTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.Long,
            value: this.readLong(1 /* Endianness.Little */),
        };
    }
    writeLongTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeLong(value.value, 1 /* Endianness.Little */);
    }
    readFloatTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.Float,
            value: this.readFloat32(1 /* Endianness.Little */),
        };
    }
    writeFloatTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeFloat32(value.value, 1 /* Endianness.Little */);
    }
    readDoubleTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.Double,
            value: this.readFloat64(1 /* Endianness.Little */),
        };
    }
    writeDoubleTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeFloat64(value.value, 1 /* Endianness.Little */);
    }
    readByteListTag() {
        const name = this.readString();
        const length = this.readInt32(1 /* Endianness.Little */);
        const value = this.read(length);
        return {
            name,
            type: NbtTag_1.NbtTag.ByteList,
            value,
        };
    }
    writeByteListTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeInt32(value.value.length, 1 /* Endianness.Little */);
        this.write(value.value);
    }
    readStringTag() {
        return {
            name: this.readString(),
            type: NbtTag_1.NbtTag.String,
            value: this.readString(),
        };
    }
    writeStringTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeString(value.value);
    }
    readListTag() {
        const name = this.readString();
        const type = this.readByte();
        const length = this.varint ? this.readVarInt() : this.readInt32(1 /* Endianness.Little */);
        const entries = [];
        for (let i = 0; i < length; i++) {
            switch (type) {
                default: {
                    throw new Error(`Unknown tag type: ${type}`);
                }
                case NbtTag_1.NbtTag.Byte: {
                    entries.push(this.readByte());
                    break;
                }
                case NbtTag_1.NbtTag.Short: {
                    entries.push(this.readShort(1 /* Endianness.Little */));
                    break;
                }
                case NbtTag_1.NbtTag.Int: {
                    entries.push(this.readInt32(1 /* Endianness.Little */));
                    break;
                }
                case NbtTag_1.NbtTag.Long: {
                    entries.push(this.readLong(1 /* Endianness.Little */));
                    break;
                }
                case NbtTag_1.NbtTag.Float: {
                    entries.push(this.readFloat32(1 /* Endianness.Little */));
                    break;
                }
                case NbtTag_1.NbtTag.Double: {
                    entries.push(this.readFloat64(1 /* Endianness.Little */));
                    break;
                }
                case NbtTag_1.NbtTag.ByteList: {
                    const size = this.readInt32(1 /* Endianness.Little */);
                    const bytes = [];
                    for (let i = 0; i < size; i++) {
                        bytes.push(this.readByte());
                    }
                    entries.push(bytes);
                    break;
                }
                case NbtTag_1.NbtTag.String: {
                    entries.push(this.readString16(1 /* Endianness.Little */));
                    break;
                }
                case NbtTag_1.NbtTag.List: {
                    throw new Error('Nested lists are not supported yet');
                }
                case NbtTag_1.NbtTag.Compound: {
                    const entries2 = [];
                    do {
                        const tag = this.readTag();
                        if (tag.type === NbtTag_1.NbtTag.End)
                            break;
                        entries.push(tag);
                    } while (this.cursorAtEnd() === false);
                    entries.push(entries2);
                    break;
                }
            }
        }
        return {
            name,
            type: NbtTag_1.NbtTag.List,
            value: entries,
        };
    }
    writeListTag(value) {
        this.writeByte(value.type);
        this.writeString(value.name);
        this.writeByte(value.value[0]);
        this.writeInt32(value.value.length, 1 /* Endianness.Little */);
        for (const entry of value.value) {
            switch (value.value[0]) {
                default: {
                    throw new Error(`Unknown tag type: ${value.value[0]}`);
                }
                case NbtTag_1.NbtTag.Byte: {
                    this.writeByte(entry);
                    break;
                }
                case NbtTag_1.NbtTag.Short: {
                    this.writeShort(entry, 1 /* Endianness.Little */);
                    break;
                }
                case NbtTag_1.NbtTag.Int: {
                    this.writeInt32(entry, 1 /* Endianness.Little */);
                    break;
                }
                case NbtTag_1.NbtTag.Long: {
                    this.writeLong(entry, 1 /* Endianness.Little */);
                    break;
                }
                case NbtTag_1.NbtTag.Float: {
                    this.writeFloat32(entry, 1 /* Endianness.Little */);
                    break;
                }
                case NbtTag_1.NbtTag.Double: {
                    this.writeFloat64(entry, 1 /* Endianness.Little */);
                    break;
                }
                case NbtTag_1.NbtTag.ByteList: {
                    this.writeInt32(entry.length, 1 /* Endianness.Little */);
                    this.write(entry);
                    break;
                }
                case NbtTag_1.NbtTag.String: {
                    this.writeString16(entry, 1 /* Endianness.Little */);
                    break;
                }
                case NbtTag_1.NbtTag.List: {
                    throw new Error('Nested lists are not supported yet');
                }
                case NbtTag_1.NbtTag.Compound: {
                    throw new Error('Writing nested compounds are not supported yet');
                }
            }
        }
    }
    readCompoundTag() {
        const name = this.readString();
        const entries = [];
        do {
            const tag = this.readTag();
            if (tag.type === NbtTag_1.NbtTag.End)
                break;
            entries.push(tag);
        } while (this.cursorAtEnd() === false);
        return {
            name,
            type: NbtTag_1.NbtTag.Compound,
            value: entries,
        };
    }
}
exports.NamedBinaryTag = NamedBinaryTag;
