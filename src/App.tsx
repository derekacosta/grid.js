import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./Grid/Grid";
import Inputs from "./Sidebar/Inputs";
import { useDebouncedCallback } from "use-debounce";
import { createContainer } from "unstated-next";

let useGrid = () => {
  const [column, setColumn] = useState(Math.floor(window.innerWidth / 40));
  const [row, setRow] = useState(Math.floor(window.innerHeight / 30));
  const [debounceColumn] = useDebouncedCallback(
    (val: any) => setColumn(val),
    500
  );
  const [debounceRow] = useDebouncedCallback((val: any) => setRow(val), 500);
  return { column, row, debounceColumn, debounceRow };
};

let Grids = createContainer(useGrid);

let GridDisplay = () => {
  let grids = Grids.useContainer();
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "30%" }}>
        <Inputs
          col={grids.column}
          row={grids.row}
          debounceColumn={grids.debounceColumn}
          debounceRow={grids.debounceRow}
        />
        <br />
        <br />
        <br />
        <Grid col={8} row={8} cellHeight={25} cellWidth={25} />
      </div>
      <div style={{ flex: "70%" }}>
        <Grid
          col={grids.column}
          row={grids.row}
          cellHeight={25}
          cellWidth={25}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <br />
      <Grids.Provider>
        <GridDisplay />
      </Grids.Provider>
    </div>
  );
};

export default App;
