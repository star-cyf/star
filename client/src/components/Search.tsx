import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { FormControl, TextField } from "@mui/material";
import {
  consistentBgColor,
  consistentBorder,
} from "../themes/ConsistentStyles";
import { SearchProps } from "../types/components";

const Search = ({ setDebouncedSearchTerm }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isSearchPending, setIsSearchPending] = useState(false);

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      setIsSearchPending(true);
    },
    [setIsSearchPending]
  );

  useEffect(() => {
    if (searchTerm.trim()?.length === 0 && !isSearchPending) {
      return;
    }

    const timerId = setTimeout(async () => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearchPending(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchTerm, setDebouncedSearchTerm, isSearchPending, setIsSearchPending]);

  return (
    <FormControl sx={{ width: "200px" }}>
      <TextField
        type="text"
        variant={"outlined"}
        size={"small"}
        placeholder="Search Questions..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          bgcolor: consistentBgColor,
          borderRadius: 1,
          border: consistentBorder,
        }}
      />
    </FormControl>
  );
};

export default Search;
