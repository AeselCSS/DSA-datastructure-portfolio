import { Grid } from "./grid.js";

// Print grid contents row by row
function printGrid<T>(grid: Grid<T>): void {
    console.log('Grid contents:');
    for (let i = 0; i < grid.numRows(); i++) {
        let rowValues: any[] = [];
        for (let j = 0; j < grid.numCols(); j++) {
            rowValues.push(grid.get(i, j));
        }
        console.log(`Row ${i}:`, rowValues);
    }
}

// Example usage of Grid<T> with different types and methods
console.log('Creating grids with different types...');

// Number grid
const numGrid = new Grid<number>(3, 3, 0);
console.log('\n=== Number Grid Examples ===');

// Basic operations
numGrid.set(0, 0, 1);
numGrid.set(0, 1, 2);
numGrid.set(0, 2, 3);
numGrid.set(1, 1, 5);

console.log('Grid values after setting:');
printGrid(numGrid);

// Test indexFor and rowColFor
console.log('\nIndex conversions:');
const index = numGrid.indexFor(1, 1);
console.log(`Index for (1,1):`, index);
const coords = numGrid.rowColFor(index);
console.log(`Coordinates for index ${index}:`, coords);

// Test neighbors
console.log('\nNeighbors for cell (1,1):');
const neighbors = numGrid.neighbors(1, 1);
console.log('Neighbor coordinates:', neighbors);
console.log('Neighbor values:', numGrid.neighbourValues(1, 1));

// Test directional methods
console.log('\nDirectional navigation from (1,1):');
console.log('North:', numGrid.north(1, 1));
console.log('South:', numGrid.south(1, 1));
console.log('East:', numGrid.east(1, 1));
console.log('West:', numGrid.west(1, 1));

// Test next in row/column
console.log('\nNext cell navigation:');
console.log('Next in row from (0,0):', numGrid.nextInRow(0, 0));
console.log('Next in column from (0,0):', numGrid.nextInCol(0, 0));

// String grid example
console.log('\n=== String Grid Examples ===');
const stringGrid = new Grid<string>(2, 2, 'empty');
stringGrid.set(0, 0, 'A');
stringGrid.set(0, 1, 'B');
stringGrid.set(1, 0, 'C');
stringGrid.set(1, 1, 'D');

console.log('String grid values:');
printGrid(stringGrid);

// Custom type example
console.log('\n=== Custom Type Grid Examples ===');
interface Player {
    name: string;
    score: number;
}

const playerGrid = new Grid<Player>(2, 2, { name: 'Empty', score: 0 });
playerGrid.set(0, 0, { name: 'Alice', score: 100 });
playerGrid.set(0, 1, { name: 'Bob', score: 85 });

console.log('Player at (0,0):', playerGrid.get(0, 0));
console.log('Neighbors of player at (0,0):', playerGrid.neighbourValues(0, 0));

// Test grid utilities
console.log('\n=== Grid Utilities ===');
console.log('Grid dimensions:', {
    rows: numGrid.numRows(),
    cols: numGrid.numCols(),
    totalSize: numGrid.size()
});

// Test fill
console.log('\nTesting fill method:');
const testGrid = new Grid<number>(2, 2, 0);
console.log('Before fill:');
console.log(testGrid.get(0, 0), testGrid.get(0, 1));
console.log(testGrid.get(1, 0), testGrid.get(1, 1));

testGrid.fill(9);
console.log('After fill with 9:');
console.log(testGrid.get(0, 0), testGrid.get(0, 1));
console.log(testGrid.get(1, 0), testGrid.get(1, 1));

// Test edge cases
console.log('\n=== Testing Edge Cases ===');
try {
    numGrid.get(-1, 0);
} catch (err: unknown) {
    const message = (err as Error).message;
    console.log('Expected error for invalid indices:', message);
}

try {
    numGrid.set(3, 3, 1);
} catch (err: unknown) {
    const message = (err as Error).message;
    console.log('Expected error for out of bounds:', message);
}

console.log('\nTesting boundary cells:');
console.log('Try to get north of top cell:', numGrid.north(0, 0));
console.log('Try to get west of leftmost cell:', numGrid.west(0, 0));
console.log('Try to get next in row from last column:', numGrid.nextInRow(0, 2));
console.log('Try to get next in column from last row:', numGrid.nextInCol(2, 0));