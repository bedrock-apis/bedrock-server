"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringifiedNBTDefinitionWriter = exports.StringifiedNBTDefinitionReader = exports.StringifiedNBT = void 0;
const NBT_1 = require("../NBT");
const General_1 = require("./General");
class StringifiedNBTDefinitionWriter extends NBT_1.DefinitionWriter {
    writeType(value) {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Byte](value) {
        this.text += value + 'b';
    }
    [NBT_1.NBTTag.Int16](value) {
        this.text += value + 's';
    }
    [NBT_1.NBTTag.Int32](value) {
        this.text += value + 'i';
    }
    [NBT_1.NBTTag.Float](value) {
        this.text += value + 'f';
    }
    [NBT_1.NBTTag.Double](value) {
        this.text += value + 'd';
    }
    [NBT_1.NBTTag.Int64](value) {
        this.text += value + 'l';
    }
    [NBT_1.NBTTag.Compoud](value, spacing, depth = 0) {
        this.text += '{';
        let hasBefore = false;
        const baseSpace = spacing ? spacing.repeat((depth ?? 0) + 1) : '';
        for (const [key, v] of Object.entries(value)) {
            if (!v[NBT_1.NBT_TYPE])
                continue;
            if (hasBefore)
                this.text += ',';
            if (spacing)
                this.text += '\n' + baseSpace;
            this.text += key + ':' + (spacing ? ' ' : '');
            v[NBT_1.NBT_SERIALIZER](this, spacing, (depth ?? 0) + 1);
            hasBefore = true;
        }
        if (hasBefore && spacing)
            this.text += '\n' + spacing.repeat(depth ?? 0);
        this.text += '}';
    }
    [NBT_1.NBTTag.List](value, spacing, depth = 0) {
        this.text += '[';
        let hasBefore = false;
        const baseSpace = spacing ? spacing.repeat((depth ?? 0) + 1) : '';
        for (const v of value) {
            if (hasBefore)
                this.text += ',';
            if (spacing)
                this.text += '\n' + baseSpace;
            v[NBT_1.NBT_SERIALIZER](this, spacing, (depth ?? 0) + 1);
            hasBefore = true;
        }
        if (hasBefore && spacing)
            this.text += '\n' + spacing.repeat(depth ?? 0);
        this.text += ']';
    }
    [NBT_1.NBTTag.ByteArray](value) {
        this.text += '<';
        let hasBefore = false;
        for (const v of value) {
            if (hasBefore)
                this.text += ',';
            this.text += v.toString(16);
            hasBefore = true;
        }
        this.text += '>';
    }
    [NBT_1.NBTTag.Int32Array](value) {
        throw new Error('No implementation');
    }
    [NBT_1.NBTTag.Int64Array](value) {
        throw new Error('No implementation');
    }
    [NBT_1.NBTTag.String](value) {
        this.text += JSON.stringify(value);
    }
    constructor() {
        super();
        this.text = '';
    }
    Stringify(tag, spacing) {
        const type = tag[NBT_1.NBT_TYPE];
        this.text = '';
        this[type](tag, spacing);
        return this.text;
    }
}
exports.StringifiedNBTDefinitionWriter = StringifiedNBTDefinitionWriter;
class StringifiedNBTDefinitionReader extends NBT_1.DefinitionReader {
    readType() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Byte]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Int16]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Int32]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Float]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Double]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Int32Array]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Int64Array]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Int64]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.Compoud]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.List]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.ByteArray]() {
        throw new Error('Method not implemented.');
    }
    [NBT_1.NBTTag.String]() {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super();
    }
    Parse(text) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return SNBT.read(text);
    }
}
exports.StringifiedNBTDefinitionReader = StringifiedNBTDefinitionReader;
const NUMBER_PARSERS = {
    b: Number,
    s: Number,
    i: Number,
    l: BigInt,
    f: Number,
    d: Number,
};
const NUMBER_NBT_CONTRUCTORS = {
    b: NBT_1.Byte,
    s: NBT_1.Int16,
    i: NBT_1.Int32,
    l: NBT_1.Int64,
    f: NBT_1.Float,
    d: NBT_1.Double,
};
class Source extends String {
    constructor(data, offset = 0) {
        super(data);
        this.offset = offset;
    }
    read(count = 1) {
        if (count <= 1)
            return this[this.offset++];
        else
            return this.slice(this.offset, (this.offset += count));
    }
    peek(count = 1) {
        if (count <= 1)
            return this[this.offset];
        else
            return this.slice(this.offset, this.offset + count);
    }
    [Symbol.iterator]() {
        return {
            next: () => ({ done: this.offset >= this.length, value: this[this.offset++] }),
        };
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var SNBT;
(function (SNBT) {
    const kinds = {
        string: readString,
        compoud: readCompoud,
        array: readArray,
        number: readNumber,
    };
    const numberChars = '0123456789';
    const numberKinds = 'bsilfd';
    const whiteSpace = ' \n\r\0\t';
    const specialCharacters = {
        n: '\n',
        r: '\r',
        '0': '\0',
        t: '\t',
    };
    function readSNBTType(source) {
        readWhiteSpace(source);
        const mainChar = source.peek();
        if (mainChar === '"')
            return 'string';
        else if (mainChar === '{')
            return 'compoud';
        else if (mainChar === '[')
            return 'array';
        else if ('0123456789-'.includes(mainChar))
            return 'number';
        else
            return mainChar;
    }
    function readString(source) {
        const string = [];
        let prefixed = false;
        if (source.read() !== '"')
            throw new TypeError('Is not a string kind');
        for (const char of source) {
            if (char === '\\') {
                if (prefixed)
                    string.push('\\');
                prefixed = !prefixed;
                continue;
            }
            if (prefixed) {
                if (char in specialCharacters)
                    string.push(specialCharacters[char]);
                else
                    throw new TypeError('Unknown special character');
                prefixed = false;
                continue;
            }
            if (char === '"')
                return string.join('');
            string.push(char);
        }
        throw new ReferenceError('Unexpected end of input');
    }
    function readSourceName(source) {
        let string = '';
        while (/[\w-]+/g.test(source.peek()))
            string += source.read();
        return string;
    }
    function readNumber(source) {
        let number = '';
        let isFloat = false;
        let isNegative = false;
        let firstIteration = false;
        let isEnd = false;
        let kind = 'i';
        let hasExponen = false;
        for (let char of source) {
            if (!firstIteration && char === '-') {
                isNegative = true;
                number += char;
                firstIteration = true;
                if (readWhiteSpace(source))
                    char = source.peek();
                continue;
            }
            if (char === '.' && !isFloat && !isEnd) {
                isFloat = true;
                number += char;
                continue;
            }
            if (numberChars.includes(char) && !isEnd)
                number += char;
            else if (char.toLowerCase() === 'e' && !isEnd && !hasExponen) {
                hasExponen = true;
                char = source.read();
                if (char !== '+')
                    throw new TypeError('InvalidExponent');
                number += 'e+';
                isFloat = true;
                if (!numberChars.includes(source.peek()))
                    throw new TypeError('InvalidExponent');
            }
            else if (numberKinds.includes(char.toLowerCase()) && !isEnd) {
                kind = char.toLowerCase();
                isEnd = true;
            }
            else {
                source.offset--;
                break;
            }
            firstIteration = true;
        }
        return new NUMBER_NBT_CONTRUCTORS[kind](NUMBER_PARSERS[kind](number));
    }
    function readCompoud(source) {
        const obj = {};
        let firsObj = true;
        if (source.read() !== '{')
            throw new TypeError('Is not a compoud kind');
        readWhiteSpace(source);
        for (let char of source) {
            if (char === '}')
                return obj;
            else if (!firsObj && char !== ',') {
                throw new SyntaxError('Unexpected: ' + char);
            }
            if (!firsObj && char === ',') {
                readWhiteSpace(source);
                char = source.read();
            }
            source.offset--;
            let key = '';
            if (char === '"')
                key = String(readString(source));
            else
                key = readSourceName(source);
            char = source.read();
            if (readWhiteSpace(source, char))
                char = source.peek();
            if (char !== ':')
                throw new TypeError('Unexpected: ' + char);
            if (readWhiteSpace(source))
                char = source.peek();
            const kind = readSNBTType(source);
            if (!(kind in kinds))
                throw new TypeError('Unexpected kind: ' + kind);
            const value = kinds[kind](source);
            obj[key] = value;
            readWhiteSpace(source);
            firsObj = false;
        }
        throw new ReferenceError('Unexpected end of input');
    }
    function readArray(source) {
        const obj = [];
        let firsObj = true;
        let initialKind = null;
        if (source.read() !== '[')
            throw new TypeError('Is not a Array kind');
        readWhiteSpace(source);
        for (let char of source) {
            if (char === ']')
                return obj;
            else if (!firsObj && char !== ',') {
                throw new SyntaxError('Unexpected: ' + char);
            }
            if (!firsObj && char === ',') {
                readWhiteSpace(source);
                char = source.read();
            }
            source.offset--;
            const kind = readSNBTType(source);
            if (!(kind in kinds))
                throw new TypeError('Unexpected kind: ' + kind);
            const value = kinds[kind](source);
            if (!initialKind)
                initialKind = value[NBT_1.NBT_TYPE];
            else if (initialKind !== value[NBT_1.NBT_TYPE])
                throw new TypeError('Array could have just one kind of elements, but multiple, expected: ' +
                    NBT_1.NBTTag[initialKind] +
                    ' but got: ' +
                    NBT_1.NBTTag[value[NBT_1.NBT_TYPE]]);
            obj.push(value);
            readWhiteSpace(source);
            firsObj = false;
        }
        throw new ReferenceError('Unexpected end of input');
    }
    function readWhiteSpace(source, char = source.peek()) {
        let ch = char;
        const i = 0;
        while (whiteSpace.includes(ch)) {
            source.offset++;
            ch = source.peek();
        }
        return i;
    }
    function read(string) {
        const source = new Source(string);
        readWhiteSpace(source);
        const kind = readSNBTType(source);
        if (!(kind in kinds))
            throw new SyntaxError('Unexpected: ' + source.read());
        return kinds[kind](source);
    }
    SNBT.read = read;
})(SNBT || (SNBT = {}));
class StringifiedNBT extends General_1.NBT {
    static Stringify(tag, spacing) {
        return new StringifiedNBTDefinitionWriter().Stringify(tag, spacing);
    }
    static Parse(text) {
        return new StringifiedNBTDefinitionReader().Parse(text);
    }
}
exports.StringifiedNBT = StringifiedNBT;
