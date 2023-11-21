"use client";
import useDebounce from "@/lib/useDebounce";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import cmdkData from "@/lib/cmdkData";
import fuzzy_match from "@/lib/fuzzy";

const CMDKContext = createContext();

export function CMDKProvider({ children }) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState(cmdkData.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = useMemo(() => {
    if(searchTerm.length === 0) return cmdkData.slice(0, 10);
    return cmdkData.map((item) =>
      {
        const title = item.title;
        const matchResult = fuzzy_match(title, searchTerm);
        return matchResult.length > 0 ? {...item, matchResult} : null;
      }
    ).filter(item => item !== null);
  }, [searchTerm]);

  useEffect(() => {
    setSelectedItem(null);
  }, [filteredData]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        openCommandPalette();
      }
      if (event.key === "Escape") {
        closeCommandPalette();
      }
      if (event.key === "ArrowDown") {
        setSelectedItem((prev) => Math.min(prev + 1, filteredData.length));
      }
      if (event.key === "ArrowUp") {
        setSelectedItem((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (selectedItem !== null) {
          const obj = filteredData[selectedItem - 1];
          // console.log(obj);
          if (obj) {
            const url = obj.url;
            if (url) {
              window.open(url, "_blank");
            }
          }
        }
      }
    },
    [filteredData, selectedItem]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const element = document.getElementById(selectedItem);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  }, [selectedItem]);

  const toggleCommandPalette = (state) => {
    setShowCommandPalette(state ?? !showCommandPalette);
  };

  const openCommandPalette = () => {
    setShowCommandPalette(true);
  };

  const closeCommandPalette = () => {
    setShowCommandPalette(false);
  };

  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function search(e) {
    // console.log(e.target.value);
    setSearching(true);
    if (e.target.value.length > 0) await wait(300);
    setSearchTerm(e.target.value);
    setSearching(false);
  }

  function handleItemSelection(e) {
    e.stopPropagation();
    // console.log(e.target);
    const id = e.target?.id;
    if (id && Number(id) !== NaN) {
      setSelectedItem(Number(id));
    }
  }

  const handleSearch = useCallback(useDebounce(search, 300), []);

  const value = {
    showCommandPalette,
    setShowCommandPalette,
    toggleCommandPalette,
    openCommandPalette,
    closeCommandPalette,
    searching,
    handleSearch,
    data,
    filteredData,
    selectedItem,
    setSelectedItem,
    handleItemSelection,
  };

  return <CMDKContext.Provider value={value}>{children}</CMDKContext.Provider>;
}
export function useCMDK() {
  return useContext(CMDKContext);
}
