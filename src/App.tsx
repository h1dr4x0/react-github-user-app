import { useState } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import UserInfo from "./components/UserInfo";

function App() {
  const [data, setData] = useState<Array<any>>([]);
  const onSearch = (data: Array<any>) => {
    console.log(data);
    setData(data);
  };
  return (
    <div className="content">
      <h1>Search for a GitHub user</h1>
      <SearchInput onSearch={onSearch} />
      {data.length > 0 && <UserInfo data={data} />}
    </div>
  );
}

export default App;
