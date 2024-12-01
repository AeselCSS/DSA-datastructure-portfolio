interface Neighbor {
    row: number;
    col: number;
}

interface Cell<T> extends Neighbor {
    value: T;
}

export class Grid<T> {
    private rows: number;
    private cols: number;
    private grid: T[][];

    constructor(rows: number, cols: number, initialValue: T) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from(
            { length: rows }, 
            () => Array.from({ length: cols }, () => initialValue)
        );
    }

    private isValidIndices(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    // Set the value of a cell in the grid
    set(row: number, col: number, value: T): void {
        if (!this.isValidIndices(row, col)) {
            throw new Error('Invalid row or column');
        }
        this.grid[row]![col] = value;
    }

    // Get the value of a cell in the grid
    get(row: number, col: number): T {
        if (!this.isValidIndices(row, col)) {
            throw new Error('Invalid row or column');
        }
        return this.grid[row]![col]!;
    }

    // Returns the index of a cell in the grid
    indexFor(row: number, col: number): number {
        if (!this.isValidIndices(row, col)) {
            throw new Error('Invalid row or column');
        }
        return row * this.cols + col;
    }

    // Returns the row and column of a cell in the grid as an object
    rowColFor(index:number): {row: number, col: number} {
        if (index < 0 || index >= this.rows * this.cols) {
            throw new Error('Invalid index');
        }
        return {row: Math.floor(index / this.cols), col: index % this.cols};
    }

    // Returns a list of the neighbors of a cell in the grid as {row, col} objects
    neighbors(row: number, col: number): Neighbor[] {
        const neighbors: Neighbor[] = [];
        const orthogonalDirections = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
        const diagonalDirections = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; // up-left, up-right, down-left, down-right
        const directions = [...orthogonalDirections, ...diagonalDirections];
        
        for (const direction of directions) {
            const newRow = row + direction[0]!;
            const newCol = col + direction[1]!;
            if (this.isValidIndices(newRow, newCol)) {
                neighbors.push({row: newRow, col: newCol});
            }
        }

        return neighbors;
    }

    // Returns a list of the values of the neighbors of a cell in the grid
    neighbourValues( row: number, col: number): T[] {
        return this.neighbors(row, col).map(neighbor => this.get(neighbor.row, neighbor.col));
    }

    // Returns the next cell (right) in the grid after a given cell or undefined if the cell is the last in the grid
    nextInRow( row: number, col: number): Cell<T> | undefined {
        if (col === this.cols - 1) {
            return undefined;
        }
        return {row, col: col + 1, value: this.get(row, col + 1)};
        
    }

    // Returns the next cell (down) in the grid after a given cell or undefined if the cell is the last in the grid
    nextInCol( row: number, col: number): Cell<T> | undefined {
        if (row === this.rows - 1) {
            return undefined;
        }
        return {row: row + 1, col, value: this.get(row + 1, col)};
    }

    // Returns the cell above a given cell or undefined if the cell is in the first row
    north(row: number, col: number): Cell<T> | undefined {
        if (row === 0) {
            return undefined;
        }
        return {row: row - 1, col, value: this.get(row - 1, col)};
    }

    // Returns the cell below a given cell or undefined if the cell is in the last row
    south(row: number, col: number): Cell<T> | undefined {
        if (row === this.rows - 1) {
            return undefined;
        }
        return {row: row + 1, col, value: this.get(row + 1, col)};
    }

    // Returns the cell to the left of a given cell or undefined if the cell is in the first column
    west(row: number, col: number): Cell<T> | undefined {
        if (col === 0) {
            return undefined;
        }
        return {row, col: col - 1, value: this.get(row, col - 1)};
    }

    // Returns the cell to the right of a given cell or undefined if the cell is in the last column
    east(row: number, col: number): Cell<T> | undefined {
        if (col === this.cols - 1) {
            return undefined;
        }
        return {row, col: col + 1, value: this.get(row, col + 1)};
    }

    // Returns the number of rows in the grid
    numRows(): number {
        return this.rows;
    }

    // Returns the number of columns in the grid
    numCols(): number {
        return this.cols;
    }

    // Returns the total number of cells in the grid
    size(): number {
        return this.rows * this.cols;
    }

    // Writes the given value in each cell of the grid
    fill(value: T): void {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.set(row, col, value);
            }
        }
    }
}