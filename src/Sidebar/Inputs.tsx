import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  debounceColumn: any;
  debounceRow: any;
  col: Number;
  row: Number;
}

const Inputs: React.FC<Props> = props => {
  const { debounceColumn, debounceRow, col, row } = props;

  return (
    <>
      <label>
        Columns:
        <input
          type="text"
          placeholder={String(col)}
          onChange={(e: any) => debounceColumn(e.target.value)}
        />
      </label>
      <br />
      <label>
        Rows:
        <input
          type="text"
          placeholder={String(row)}
          onChange={(e: any) => debounceRow(e.target.value)}
        />
      </label>
    </>
  );
};

export default Inputs;
