import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./Grid/Grid";

const App: React.FC = () => {
  return (
    <div className="App">
      <Grid col={12} row={12} cellHeight={25} cellWidth={25} />
    </div>
  );
};

export default App;
