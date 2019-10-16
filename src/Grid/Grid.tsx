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
  const [column, setColumn] = useState(
    props.col ? props.col : Math.floor(window.innerHeight / 30)
  );
  const [row, setRow] = useState(
    props.row ? props.row : Math.floor(window.innerWidth / 30)
  );
  const [grid, setGrid] = useState();
  const [debouncedColumn] = useDebouncedCallback(
    (val: any) => setColumn(val),
    500
  );
  const [mousePressed, setMousePressed] = useState(false);
  const [debounceRow] = useDebouncedCallback((val: any) => setRow(val), 500);
  useEffect(() => {
    setGrid(getInitialGrid(column, row));
  }, [column, row]);

  const handleMouseDown = (row: any, col: any) => {
    setGrid(getNewGridWithWallToggled(grid, row, col));
    setMousePressed(true);
  };

  const handleMouseEnter = (row: any, col: any) => {
    if (!mousePressed) return;
    setGrid(getNewGridWithWallToggled(grid, row, col));
  };

  const handleMouseUp = () => {
    setMousePressed(true);
  };

  return (
    <>
      <div>
        <label>
          Columns:
          <input
            type="text"
            placeholder={String(props.col)}
            onChange={(e: any) => debouncedColumn(e.target.value)}
          />
        </label>
        <label>
          Rows:
          <input
            type="text"
            placeholder={String(props.row)}
            onChange={(e: any) => debounceRow(e.target.value)}
          />
        </label>
      </div>
      <table
        className="grid"
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
                      cellHeight={props.cellHeight}
                      cellWidth={props.cellWidth}
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
    </>
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

const getNewGridWithWallToggled = (grid: any, row: any, col: any) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Grid;
