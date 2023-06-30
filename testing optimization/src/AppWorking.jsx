import { useState, useDeferredValue, useTransition, useEffect } from "react";

import "./App.css";
import Select from "react-select";

function App() {
  //   const [inputValue, setInputValue] = useState("");

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fetchData = () => {
    const SIZE = 1000;
    const results = Array(SIZE)
      .fill()
      .map((_, index) => ({ value: index, label: "option " + index }));

    return results;
  };
  const options = isPending ? [] : fetchData();

  return (
    <Select
      //   onBlur={() => setMenuIsOpen(false)}
      autoFocus
      onFocus={() => startTransition(() => setMenuIsOpen(true))}
      //   menuIsOpen={menuIsOpen}
      isMulti
      isLoading={isPending}
      options={options}
      onInputChange={(text) => {
        // setInputValue(text);
        if (text === "") return;

        // setMenuIsOpen(false);

        startTransition(() => setMenuIsOpen(true));
      }}
    />
  );
}

export default App;
