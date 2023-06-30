import { useState, useDeferredValue, useTransition, useEffect } from "react";

import "./App.css";
import Select from "react-select";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [canFilter, setCanFilter] = useState(true);
  const [noOptionsMessage, setNoOptionsMessage] = useState("Loading...");
  let timeout;

  const fetchData = () => {
    const SIZE = 1000;
    const results = Array(SIZE)
      .fill()
      .map((_, index) => ({ value: index, label: "option " + index }));

    return results;
  };
  const options = fetchData();

  // useEffect(() => {
  //   setCanFilter(deferredInput === inputValue);
  // }, [inputValue, deferredInput]);
  // const [inputValue, setInputValue] = useState("");

  return (
    <Select
      isLoading={!canFilter}
      autoFocus
      noOptionsMessage={() => noOptionsMessage}
      onInputChange={(text) => {
        setCanFilter(false);
        setNoOptionsMessage("Loading...");

        setInputValue(inputValue);

        console.log("added timeout");
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          setCanFilter(true);
          clearTimeout(timeout);
          console.log("Cleared the timeout");
          setNoOptionsMessage("No option");
        }, 2000);
      }}
      filterOption={(e) => {
        return canFilter;
      }}
      // inputValue={deferredInput}
      isMulti
      options={options}
    />
  );
}

export default App;
