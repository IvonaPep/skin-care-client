import { useState } from "react";

function SearchBar({ searchProducts }) {
  const [searched, setSearched] = useState("");

  return (
    <div className="input-box">
      <input
        id="search"
        placeholder="Search product"
        type="search"
        value={searched}
        onChange={(e) => {
          setSearched(e.target.value);
          searchProducts(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
