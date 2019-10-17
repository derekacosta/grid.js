import React, { useState, useEffect, useRef } from "react";
import { arrayOf, bool, func, number, shape, string } from "prop-types";
import { useDebouncedCallback } from "use-debounce";
import Cell from "./Cell";

interface Props {
  col: Number;
  row: Number;
  cellHeight: Number;
  cellWidth: Number;
}

const Grid: React.FC<Props> = props => {
  const { col, row, cellHeight, cellWidth } = props;

  const [grid, setGrid] = useState();

  const [mousePressed, setMousePressed] = useState(false);
  useEffect(() => {
    setGrid(getInitialGrid(col, row));
  }, [col, row]);

  const handleMouseDown = (row: any, col: any) => {
    setGrid(RefreshGrid(grid, row, col));
    setMousePressed(true);
  };

  const handleMouseEnter = (row: any, col: any) => {
    if (!mousePressed) return;
    setGrid(RefreshGrid(grid, row, col));
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  return (
      <table
        style={{
          height: "50%",
          margin: "0 auto",
          display: "inline-block",
          borderCollapse: "collapse",
          tableLayout: "fixed"
        }}
      >
        <tbody>
          {grid &&
            grid.map((row: any, rowIdx: any) => (
              <tr key={rowIdx}>
                {row.map((node: any, nodeIdx: any) => {
                  const { row, col, isWall } = node;
                  return (
                    <Cell
                      cellHeight={cellHeight}
                      cellWidth={cellWidth}
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isWall={isWall}
                      mousePressed={mousePressed}
                      onMouseDown={(col: any, row: any) =>
                        handleMouseDown(row, col)
                      }
                      onMouseEnter={(col: any, row: any) =>
                        handleMouseEnter(row, col)
                      }
                      onMouseUp={(col: any, row: any) => handleMouseUp()}
                    />
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
  );
};

const getInitialGrid = (col: any, row: any) => {
  const grid = [];
  for (let i = 0; i < row; i++) {
    const currentRow = [];
    for (let j = 0; j < col; j++) {
      currentRow.push(createNode(i, j));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: any, row: any) => {
  return {
    col,
    row,
    // isStart: row === START_NODE_ROW && col === START_NODE_COL,
    // isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const RefreshGrid = (grid: any, row: any, col: any) => {
  const newGrid = grid.slice(0);
  const node = grid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Grid;
