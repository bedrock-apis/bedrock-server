"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NbtTag = void 0;
var NbtTag;
(function (NbtTag) {
    NbtTag[NbtTag["End"] = 0] = "End";
    NbtTag[NbtTag["Byte"] = 1] = "Byte";
    NbtTag[NbtTag["Short"] = 2] = "Short";
    NbtTag[NbtTag["Int"] = 3] = "Int";
    NbtTag[NbtTag["Long"] = 4] = "Long";
    NbtTag[NbtTag["Float"] = 5] = "Float";
    NbtTag[NbtTag["Double"] = 6] = "Double";
    NbtTag[NbtTag["ByteList"] = 7] = "ByteList";
    NbtTag[NbtTag["String"] = 8] = "String";
    NbtTag[NbtTag["List"] = 9] = "List";
    NbtTag[NbtTag["Compound"] = 10] = "Compound";
    NbtTag[NbtTag["IntList"] = 11] = "IntList";
    NbtTag[NbtTag["LongList"] = 12] = "LongList";
})(NbtTag || (exports.NbtTag = NbtTag = {}));
