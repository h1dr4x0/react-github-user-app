import "../assets/SearchInput.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Props {
  onSearch: (data: Array<any>) => void;
}

function SearchInput({ onSearch }: Props) {
  return (
    <div className="search-div">
      <div className="children">
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value;
              if (value) {
                fetch(`https://api.github.com/users/${value}/repos`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.message === "Not Found") {
                      alert("User not found");
                    } else {
                      onSearch(data);
                    }
                  });
              }
            }
          }}
          className="search-input"
          placeholder="Enter a username..."
          maxLength={39}
        />
        <FaMagnifyingGlass className="search-icon" />
      </div>
    </div>
  );
}

export default SearchInput;
