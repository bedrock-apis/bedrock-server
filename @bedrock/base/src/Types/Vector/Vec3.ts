// @ts-nocheck

import type { Vector3 } from "./General";

/*
 * Copyright © 2023 Free Term Of Use ConMaster2112
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software. You must include and keep this
 * copyright notice in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const isVec3Symbol = Symbol("isVec3");
export interface Vec3 {
	/**
	 * Adds two vectors.
	 *
	 * @param vec - The second vector.
	 * @returns  The sum of the two vectors.
	 */
	add(vec: Vector3): this;
	/**
	 * Calculates the cross product of two vectors.
	 *
	 * @param vec - The second vector.
	 * @returns  The cross product of the two vectors.
	 */
	cross(vec: Vector3): this;
	/**
	 * Calculates distance between two points
	 *
	 * @param vec-Second point represented as a vector
	 * @returns -The distance between points represented by vectors 'a' and 'b'
	 */
	distance(vec: Vector3): number;
	/**
	 * Calculates the dot product of two vectors.
	 *
	 * @param vec - The second vector.
	 * @returns The dot product of the two vectors.
	 */
	dot(vec: Vector3): number;
	floor(): this;
	readonly length: number;
	/**
	 * Calculates the linear interpolation between two vectors.
	 *
	 * @param vec - The second vector.
	 * @param t - The interpolation parameter. Should be between 0 and 1.
	 * @returns  The interpolated vector.
	 */
	lerp(vec: Vector3, t: number): this;
	/**
	 * Multiplies a vector by a scalar value.
	 *
	 * @param num - The scalar value or vector to multiply the vector by.
	 * @returns  The product of the vector and the scalar value.
	 */
	multiply(num: Vector3 | number): this;
	readonly normalized: this;
	/**
	 * Calculates projection of 'a' onto 'b'
	 *
	 * @param vec-Second Vector onto which first is projected
	 * @returns -The projection of 'a' onto 'b'
	 */
	projection(vec: Vector3): this;
	/**
	 * Reflects a vector across a given normal vector.
	 *
	 * @param vec - The normal vector to reflect across.
	 * @returns  The reflected vector.
	 */
	reflect(vec: Vector3): this;
	/**
	 * Calculates rejection of 'a' from 'b'
	 *
	 * @param vec-Second Vector from which first is rejected
	 * @returns -The rejection of 'a' from 'b'
	 */
	rejection(vec: Vector3): this;
	/**
	 * Subtracts the second vector from the first vector.
	 *
	 * @param vec - The second vector.
	 * @returns  The difference of the two vectors.
	 */
	subtract(vec: Vector3): this;
	toString(): string;
	x: number;
	y: number;
	z: number;
}
export interface Vec3Constructor<S extends Vec3 = Vec3> {
	new (x?: number, y?: number, z?: number): S;
	(x?: number, y?: number, z?: number): S;
	/**
	 * Adds two vectors.
	 *
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns  The sum of the two vectors.
	 */
	add(a: Vector3, b: Vector3): S;
	/**
	 * Calculates angle between two vectors in radians
	 *
	 * @param a-The first vector
	 * @param b-The second vector
	 * @returns -The angle between two vectors in radians
	 */
	angleBetween(a: Vector3, b: Vector3): number;
	readonly backward: Vec3;
	/**
	 * Calculates the cross product of two vectors.
	 *
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns  The cross product of the two vectors.
	 */
	cross(a: Vector3, b: Vector3): S;
	/**
	 * Calculates distance between two points
	 *
	 * @param a-First point represented as a vector
	 * @param b-Second point represented as a vector
	 * @returns -The distance between points represented by vectors 'a' and 'b'
	 */
	distance(a: Vector3, b: Vector3): number;
	/**
	 * Calculates the dot product of two vectors.
	 *
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns The dot product of the two vectors.
	 */
	dot(a: Vector3, b: Vector3): number;
	readonly down: Vec3;
	floor(vec: Vector3): S;

	readonly forward: Vec3;
	from(object: any): S;
	isVec3(vec: any): vec is S;
	readonly left: Vec3;
	/**
	 * Calculates the linear interpolation between two vectors.
	 *
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @param t - The interpolation parameter. Should be between 0 and 1.
	 * @returns  The interpolated vector.
	 */
	lerp(a: Vector3, b: Vector3, t: number): S;
	/**
	 * Calculates magnitude (length) of given vector
	 *
	 * @param a-The vector to calculate magnitude of
	 * @returns -The magnitude (length) of given vector
	 */
	magnitude(vec: Vector3): number;
	/**
	 * Multiplies a vector by a scalar value.
	 *
	 * @param v - The vector to be multiplied.
	 * @param n - The vector or scalar value to multiply the vector by.
	 * @returns  The product of the vector and the scalar value.
	 */
	multiply(v: Vector3, n: Vector3 | number): S;
	/**
	 * Normalizes given vector to have magnitude (length) of 1
	 *
	 * @param a-The vector to normalize
	 * @returns -The normalized vector
	 */
	normalize(vec: Vector3): S;
	/**
	 * Calculates projection of 'a' onto 'b'
	 *
	 * @param a-First Vector to project onto second Vector
	 * @param b-Second Vector onto which first is projected
	 * @returns -The projection of 'a' onto 'b'
	 */
	projection(a: Vector3, b: Vector3): S;
	readonly prototype: S;
	/**
	 * Reflects a vector across a given normal vector.
	 *
	 * @param v - The vector to reflect.
	 * @param n - The normal vector to reflect across.
	 * @returns  The reflected vector.
	 */
	reflect(v: Vector3, n: Vector3): S;
	/**
	 * Calculates rejection of 'a' from 'b'
	 *
	 * @param a-First Vector to reject from second Vector
	 * @param b-Second Vector from which first is rejected
	 * @returns -The rejection of 'a' from 'b'
	 */
	rejection(a: Vector3, b: Vector3): S;
	readonly right: Vec3;
	sort(vec1: Vector3, vec2: Vector3): [S, S];
	/**
	 * Subtracts the second vector from the first vector.
	 *
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns  The difference of the two vectors.
	 */
	subtract(a: Vector3, b: Vector3): S;
	readonly up: Vec3;
	readonly zero: Vec3;
}
// @ts-expect-error Lmao
// eslint-disable-next-line @typescript-eslint/no-redeclare, func-style
export const Vec3: Vec3Constructor = function Vec3(this: Vec3, x = 0, y = 0, z = 0) {
	if (new.target) {
		this.x = Number(x);
		this.y = Number(y);
		this.z = Number(z);
	} else return Object.setPrototypeOf({ x: Number(x), y: Number(y), z: Number(z) }, Vec3.prototype) as Vec3;
};

Object.defineProperties(
	Vec3.prototype,
	Object.getOwnPropertyDescriptors({
		distance(vec: Vector3) {
			return Vec3.distance(this, vec);
		},
		lerp(vec: Vector3, t: number) {
			return Vec3.lerp(this, vec, t);
		},
		projection(vec: Vector3) {
			return Vec3.projection(this, vec);
		},
		reflect(vec: Vector3) {
			return Vec3.reflect(this, vec);
		},
		rejection(vec: Vector3) {
			return Vec3.rejection(this, vec);
		},
		cross(vec: Vector3) {
			return Vec3.cross(this, vec);
		},
		dot(vec: Vector3) {
			return Vec3.dot(this, vec);
		},
		floor() {
			return Vec3.floor(this);
		},
		add(vec: Vector3) {
			return Vec3.add(this, vec);
		},
		subtract(vec: Vector3) {
			return Vec3.subtract(this, vec);
		},
		multiply(num: Vector3) {
			return Vec3.multiply(this, num);
		},
		get length(): number {
			return Vec3.magnitude(this);
		},
		get normalized(): Vector3 {
			return Vec3.normalize(this);
		},
		x: 0,
		y: 0,
		z: 0,
		[isVec3Symbol]: true,
		toString() {
			return `<${this.x}, ${this.y}, ${this.z}>`;
		},
	}),
);
Vec3.magnitude = function magnitude(vec) {
	return Math.hypot(vec.x, vec.y, vec.z);
};

Vec3.normalize = function normalize(vec) {
	const l = this.magnitude(vec);
	return Object.setPrototypeOf({ x: vec.x / l, y: vec.y / l, z: vec.z / l }, this?.prototype ?? Vec3.prototype);
};

Vec3.cross = function cross(a, b) {
	return Object.setPrototypeOf(
		{ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x },
		this?.prototype ?? Vec3.prototype,
	);
};

Vec3.dot = function dot(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
};

Vec3.angleBetween = function angleBetween(a, b) {
	return Math.acos(this.dot(a, b) / (this.magnitude(a) * this.magnitude(b)));
};

Vec3.subtract = function subtract(a, b) {
	return Object.setPrototypeOf({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }, this?.prototype ?? Vec3.prototype);
};

Vec3.add = function add(a, b) {
	return Object.setPrototypeOf({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }, this?.prototype ?? Vec3.prototype);
};

Vec3.multiply = function multiply(vec, num) {
	if (typeof num === "number")
		return Object.setPrototypeOf({ x: vec.x * num, y: vec.y * num, z: vec.z * num }, this?.prototype ?? Vec3.prototype);
	else
		return Object.setPrototypeOf(
			{ x: vec.x * num.x, y: vec.y * num.y, z: vec.z * num.z },
			this?.prototype ?? Vec3.prototype,
		);
};

Vec3.isVec3 = function isVec3(vec: any) {
	return vec[isVec3Symbol] === true;
} as any;
Vec3.floor = function floor(vec) {
	return Object.setPrototypeOf(
		{ x: Math.floor(vec.x), y: Math.floor(vec.y), z: Math.floor(vec.z) },
		this?.prototype ?? Vec3.prototype,
	);
};

Vec3.projection = function projection(a, b) {
	return this.multiply(b, this.dot(a, b) / (b.x * b.x + b.y * b.y + b.z * b.z) ** 2);
};

Vec3.rejection = function rejection(a, b) {
	return this.subtract(a, this.projection(a, b));
};

Vec3.reflect = function reflect(v, n) {
	return this.subtract(v, this.multiply(n, 2 * this.dot(v, n)));
};

Vec3.lerp = function lerp(a, b, t) {
	return this.multiply(a, 1 - t).add(this.multiply(b, t));
};

Vec3.distance = function distance(a, b) {
	return this.magnitude(this.subtract(a, b));
};

Vec3.from = function from(object) {
	if (Vec3.isVec3(object)) return object;
	if (Array.isArray(object)) return (this ?? Vec3)(object[0], object[1], object[2]);
	const { x = 0, y = 0, z = 0 } = object ?? {};
	return { x: Number(x), y: Number(y), z: Number(z), __proto__: this?.prototype ?? Vec3.prototype } as any;
};

Vec3.sort = function sort(vec1, vec2) {
	const [x1, x2] = vec1.x < vec2.x ? [vec1.x, vec2.x] : [vec2.x, vec1.x];
	const [y1, y2] = vec1.y < vec2.y ? [vec1.y, vec2.y] : [vec2.y, vec1.y];
	const [z1, z2] = vec1.z < vec2.z ? [vec1.z, vec2.z] : [vec2.z, vec1.z];
	return [
		Object.setPrototypeOf({ x: x1, y: y1, z: z1 }, this?.prototype ?? Vec3.prototype),
		Object.setPrototypeOf({ x: x2, y: y2, z: z2 }, this?.prototype ?? Vec3.prototype),
	] as any;
};

const constantIds = ["up", "down", "right", "left", "forward", "backward", "zero"];
const constants = [
	{ x: 0, y: 1, z: 0, __proto__: Vec3.prototype },
	{ x: 0, y: -1, z: 0, __proto__: Vec3.prototype },
	{ x: 1, y: 0, z: 0, __proto__: Vec3.prototype },
	{ x: -1, y: 0, z: 0, __proto__: Vec3.prototype },
	{ x: 0, y: 0, z: 1, __proto__: Vec3.prototype },
	{ x: 0, y: 0, z: -1, __proto__: Vec3.prototype },
	{ x: 0, y: 0, z: 0, __proto__: Vec3.prototype },
];
for (const [i, id] of constantIds.entries()) (Vec3 as any)[id] = constants[i];
