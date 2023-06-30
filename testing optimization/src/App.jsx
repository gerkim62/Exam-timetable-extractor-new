import { useMemo, useTransition } from "react";

import "./App.css";
import Select from "react-select";

function App() {
  const [isPending, startTransition] = useTransition();
  const fetchData = () => {
    const SIZE = 9000;
    const results = Array(SIZE)
      .fill()
      .map((_, index) => ({ value: index, label: "option " + index }));

    return results;
  };
  const fetched = useMemo(() => {
    console.log("Fetching");

    return fetchData();
  }, []);
  const options = isPending ? [] : fetched;

  return (
    <Select
      autoFocus
      onFocus={() => startTransition(() => {})}
      isMulti
      isLoading={isPending}
      options={options}
      onInputChange={() => startTransition(() => {})}
    />
  );
}

export default App;
