import { useState } from "react";
import useFetch from "react-fetch-hook";

import "./App.css";

const timetableJsonUrl = `https://jsonkeeper.com/b/AD61`;

function App() {
  const { isLoading, data } = useFetch(timetableJsonUrl);

  return isLoading ? <p>Loading...</p> : <div>{data}</div>;
}

export default App;
