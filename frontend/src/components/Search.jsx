import React, { useState, useRef, useEffect } from "react";

function Search(props) {
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { onSearch } = props;
  const handleSearching = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);
  return (
    <div className="relative flex items-center gap-4 rounded-lg">
      <span className="absolute top-2.5 left-3">
        <box-icon name="search-alt-2" color="gray"></box-icon>
      </span>
      <input
        value={keyword}
        onChange={handleSearching}
        type="text"
        placeholder="Tìm kiếm"
        className="w-full px-12 py-2 outline-none rounded-lg bg-transparent border focus:border-primary focus:border-2"
      />
      {closeX && (
        <span
          className="absolute top-2.5 right-3 cursor-pointer"
          onClick={() => {
            setKeyword("");
          }}
        >
          <box-icon name="x" color="gray"></box-icon>
        </span>
      )}
    </div>
  );
}

export default Search;
