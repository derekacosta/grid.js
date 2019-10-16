import React, { Component } from "react";

interface Props {
  col: any;
  cellHeight: any;
  cellWidth: any;
  key: any;
  row: any;
  isWall: any;
  onMouseDown: any;
  onMouseEnter: any;
  onMouseUp: any;
  mousePressed: any;
}

const Cell: React.FC<Props> = (props: any) => {
  const {
    col,
    cellHeight,
    cellWidth,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
    mousePressed
  } = props;
  
  const style = {
    width: cellWidth ? cellWidth + "px" : "25px",
    height: cellHeight ? cellHeight + "px" : "25px",
    outline: ".1px solid rgb(175, 216, 248)",
    border: ".1px solid rgb(175, 216, 248)",
    display: "inline-block",
    overflow: "hidden"
  };

  return (
    <td
      id={`node-${row}-${col}`}
      // className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      style={isWall ? { backgroundColor: "rgb(12, 53, 71)", ...style } : style}
    ></td>
  );
};

export default Cell;
