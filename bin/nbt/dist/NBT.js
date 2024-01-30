"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARRAY_TYPE = exports.DefinitionWriter = exports.DefinitionReader = exports.Short = exports.Long = exports.Int = exports.List = exports.Double = exports.Float = exports.Int64 = exports.Int32 = exports.Int16 = exports.Byte = exports.NBT_VALUE = exports.NBT_TYPE = exports.NBT_SERIALIZER = exports.NBTTag = void 0;
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-inner-declarations */
const node_buffer_1 = require("node:buffer");
var NBTTag;
(function (NBTTag) {
    NBTTag[NBTTag["EndOfCompoud"] = 0] = "EndOfCompoud";
    NBTTag[NBTTag["Byte"] = 1] = "Byte";
    NBTTag[NBTTag["Int16"] = 2] = "Int16";
    NBTTag[NBTTag["Int32"] = 3] = "Int32";
    NBTTag[NBTTag["Int64"] = 4] = "Int64";
    NBTTag[NBTTag["Float"] = 5] = "Float";
    NBTTag[NBTTag["Double"] = 6] = "Double";
    NBTTag[NBTTag["ByteArray"] = 7] = "ByteArray";
    NBTTag[NBTTag["String"] = 8] = "String";
    NBTTag[NBTTag["List"] = 9] = "List";
    NBTTag[NBTTag["Compoud"] = 10] = "Compoud";
    NBTTag[NBTTag["Int32Array"] = 11] = "Int32Array";
    NBTTag[NBTTag["Int64Array"] = 12] = "Int64Array";
})(NBTTag || (exports.NBTTag = NBTTag = {}));
const NBT_SERIALIZER = '__NBT_SERIALIZER';
exports.NBT_SERIALIZER = NBT_SERIALIZER;
const NBT_TYPE = '__NBT_TYPE';
exports.NBT_TYPE = NBT_TYPE;
const NBT_VALUE = '__nbt';
exports.NBT_VALUE = NBT_VALUE;
// Private type, you should not use it
const ARRAY_TYPE = '__NBT_ARRAY_TYPE';
exports.ARRAY_TYPE = ARRAY_TYPE;
const Construct = Symbol('Ctor');
class BigIntWrapper {
    constructor(n) {
        this[NBT_VALUE] = BigInt(n);
    }
    valueOf() {
        return this[NBT_VALUE];
    }
    toString() {
        return BigInt.prototype.toString.call(this[NBT_VALUE]);
    }
    toLocalString() {
        return BigInt.prototype.toLocaleString.call(this[NBT_VALUE]);
    }
    [NBT_SERIALIZER](m, ...params) {
        m[this[NBT_TYPE]](this.valueOf(), ...params);
    }
}
Object.setPrototypeOf(BigIntWrapper, BigInt);
Object.setPrototypeOf(BigIntWrapper.prototype, BigInt.prototype);
class NumberWrapper {
    constructor(n) {
        this[NBT_VALUE] = Number(n);
    }
    valueOf() {
        return this[NBT_VALUE];
    }
    toString() {
        return Number.prototype.toString.call(this[NBT_VALUE]);
    }
    toLocalString() {
        return Number.prototype.toLocaleString.call(this[NBT_VALUE]);
    }
    toFixed(fractionDigits) {
        return Number.prototype.toFixed.call(this[NBT_VALUE], fractionDigits);
    }
    toExponential(fractionDigits) {
        return Number.prototype.toExponential.call(this[NBT_VALUE], fractionDigits);
    }
    toPrecision(precision) {
        return Number.prototype.toPrecision.call(this[NBT_VALUE], precision);
    }
    [NBT_SERIALIZER](m, ...params) {
        m[this[NBT_TYPE]](this.valueOf(), ...params);
    }
}
Object.setPrototypeOf(NumberWrapper, Number);
Object.setPrototypeOf(NumberWrapper.prototype, Number.prototype);
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const List = function (tag, array, mapFc) {
    const a = [];
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const has = tag in ConversionTypes;
    let i = 0;
    if (array)
        for (let v of array) {
            if (mapFc)
                v = mapFc(v, i++, array);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            else if (v[NBT_TYPE] in ConversionTypes && has)
                v = ConversionTypes[tag](v);
            if (v[NBT_TYPE] !== tag)
                throw new TypeError('Mapped value must be type of ' + NBTTag[tag]);
            a.push(v);
        }
    return Object.setPrototypeOf(Object.assign(a, { [ARRAY_TYPE]: tag }), new.target?.prototype ?? List.prototype);
};
exports.List = List;
Object.setPrototypeOf(List, Array);
Object.setPrototypeOf(List.prototype, Array.prototype);
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const Byte = function (v) {
    return BaseFunction(v ?? 0, new.target ?? Byte, new.target?.[Construct] ?? NumberWrapper);
};
exports.Byte = Byte;
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const Int16 = function (v) {
    return BaseFunction(v ?? 0, new.target ?? Int16, new.target?.[Construct] ?? NumberWrapper);
};
exports.Int16 = Int16;
exports.Short = Int16;
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const Int32 = function (v) {
    return BaseFunction(v ?? 0, new.target ?? Int32, new.target?.[Construct] ?? NumberWrapper);
};
exports.Int32 = Int32;
exports.Int = Int32;
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const Int64 = function (v) {
    return BaseFunction(v ?? 0, new.target ?? Int64, new.target?.[Construct] ?? BigIntWrapper);
};
exports.Int64 = Int64;
exports.Long = Int64;
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const Float = function (v) {
    return BaseFunction(v ?? 0, new.target ?? Float, new.target?.[Construct] ?? NumberWrapper);
};
exports.Float = Float;
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-names
const Double = function (v) {
    return BaseFunction(v ?? 0, new.target ?? Double, new.target?.[Construct] ?? NumberWrapper);
};
exports.Double = Double;
function BaseFunction(v, as, ctor = NumberWrapper) {
    return Object.setPrototypeOf(Object.assign(new ctor(v), { [NBT_TYPE]: as.prototype[NBT_TYPE] }), as.prototype);
}
const DATA_MAPING = [Byte, Int16, Int32, Int64, Float, Double];
const DATA_BASES = [NumberWrapper, NumberWrapper, NumberWrapper, BigIntWrapper, NumberWrapper, NumberWrapper];
const DATA_MAP_TYPES = [NBTTag.Byte, NBTTag.Int16, NBTTag.Int32, NBTTag.Int64, NBTTag.Float, NBTTag.Double];
for (const [i, element] of DATA_MAPING.entries()) {
    // @ts-expect-error its readonly but must be initialized
    element.prototype = Object.setPrototypeOf({
        [NBT_TYPE]: DATA_MAP_TYPES[i],
        constructor: element,
    }, DATA_BASES[i].prototype);
    element[Construct] = DATA_BASES[i];
}
const ES_MAPPINGS = [
    String,
    Object,
    Array,
    Number,
    BigInt,
    Boolean,
    node_buffer_1.Buffer,
    Int32Array,
    Uint32Array,
    BigInt64Array,
    BigUint64Array,
];
const ES_MAP_TYPES = [
    NBTTag.String,
    NBTTag.Compoud,
    NBTTag.List,
    NBTTag.Int16,
    NBTTag.Int64,
    NBTTag.Byte,
    NBTTag.ByteArray,
    NBTTag.Int32Array,
    NBTTag.Int32Array,
    NBTTag.Int64Array,
    NBTTag.Int64Array,
];
for (const [i, element] of ES_MAPPINGS.entries()) {
    element.prototype[NBT_TYPE] = ES_MAP_TYPES[i];
    element.prototype[NBT_SERIALIZER] = RawWriter;
}
function RawWriter(stream, ...params) {
    stream[this[NBT_TYPE]](this[NBT_VALUE] ?? this.valueOf(), ...params);
}
const ConversionTypes = {
    [NBTTag.Byte]: Byte,
    [NBTTag.Int16]: Int16,
    [NBTTag.Int32]: Int32,
    [NBTTag.Int64]: Int64,
    [NBTTag.Float]: Float,
    [NBTTag.Double]: Double,
    [NBTTag.String]: String,
};
class DefinitionWriter {
}
exports.DefinitionWriter = DefinitionWriter;
class DefinitionReader {
}
exports.DefinitionReader = DefinitionReader;
