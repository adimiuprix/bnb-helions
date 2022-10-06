import React, { useState, useContext } from "react";
import { MultiSelect } from "react-multi-select-component";
 
 
const Example = ({nfts}) => {
  const [selected, setSelected] = useState([]);

  const options = [nfts];
 
  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{selected}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};
 
export default Example;
