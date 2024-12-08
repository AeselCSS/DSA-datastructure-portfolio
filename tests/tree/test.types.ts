import { Comparable } from '../../tree/types.js';

class NumberValue implements Comparable<NumberValue> {
    constructor(public value: number) {}
    
    compareTo(other: NumberValue): number {
        return this.value - other.value;
    }
    
    toString(): string {
        return this.value.toString();
    }
}

export { NumberValue };