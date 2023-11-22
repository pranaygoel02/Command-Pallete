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
import cmdkData, { newData } from "@/lib/cmdkData";
import fuzzy_match from "@/lib/fuzzy";
import flattenMenu from "@/lib/flattenMenu";

const CMDKContext = createContext();

export function CMDKProvider({ children }) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState(cmdkData.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionStack, setActionStack] = useState([]);

  const flattedMenu = flattenMenu(newData);
  console.log(flattedMenu);

  const filteredData = useMemo(() => {

    let idCounter = 0;
  
    const isChildItem = (item, stack) =>
      item.title.join(" / ").toLowerCase().includes((stack.join(" / ") + " /").toLowerCase());
  
    const isMatchingType = (item, searchTerm) => {
      if (item.type === null) return item;
      
      const title = item.title[item.title.length - 1];
      const matchResult = fuzzy_match(title, searchTerm);
  
      return matchResult.length > 0
        ? { ...item, matchResult: matchResult }
        : null;
    };
  
    const filterByActionStack = (data) =>
      data.filter((item) => isChildItem(item, actionStack));
  
    const filterByTitleLength = (data, length) =>
      data.filter((item) => item.title.length <= length);
  
    const filterBySearchTerm = (data) =>
      data.map((item) => isMatchingType(item, searchTerm)).filter(Boolean);
  
    const addIdToTypes = (data) =>
      data.map((item, index) =>
        item.type === null
          ? !data[index + 1]?.title.join("/").includes(item.title.join("/"))
            ? null
            : item
          : { ...item, id: ++idCounter }
      ).filter(Boolean);
  
    let filteredData = flattedMenu;
  
    if (actionStack.length > 0) {
      filteredData = filterByActionStack(filteredData);
    }
  
    if (searchTerm.length === 0) {
      filteredData = filterByTitleLength(filteredData, actionStack.length + 2);
    }
  
    if (searchTerm.length === 0 && actionStack.length > 0) {
      filteredData = filterByTitleLength(filteredData, actionStack.length + 1);
    }
  
    if (searchTerm.length > 0) {
      filteredData = filterBySearchTerm(filteredData);
    }
  
    return addIdToTypes(filteredData);
  }, [searchTerm, actionStack]);
  

  useEffect(() => {
    setSelectedItem(null);
  }, [filteredData]);

  function handleSelection(event) {
    event.preventDefault();
    event.stopPropagation();
    if (selectedItem !== null) {
      const obj = filteredData.find((item) => item.id === selectedItem);
      if (obj) {
        if (obj.url) {
          window.open(obj.url, "_blank");
        } else if (obj.type === "action") {
          setActionStack((prev) => obj.title);
        }
      }
    }
  }

  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        openCommandPalette();
      }
      if (event.key === "Escape") {
        closeCommandPalette();
      }
      if (event.key === "Backspace") {
        if (searchTerm.length === 0 && actionStack.length > 0)
          setActionStack((prev) => prev.slice(0, prev.length - 1));
      }
      if (event.key === "ArrowDown") {
        setSelectedItem((prev) =>
          Math.min(
            prev + 1,
            filteredData.filter((item) => item.type !== null).length
          )
        );
      }
      if (event.key === "ArrowUp") {
        setSelectedItem((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Enter") {
        handleSelection(event);
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
    setSelectedItem(null);
    setActionStack([]);
    setSearchTerm("");
  };

  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function search(e) {
    setSearching(true);
    if (e.target.value.length > 0) await wait(300);
    setSearchTerm((prev) => e.target.value);
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
    handleSelection,
    actionStack,
    searchTerm,
    setSearchTerm,
  };

  return <CMDKContext.Provider value={value}>{children}</CMDKContext.Provider>;
}
export function useCMDK() {
  return useContext(CMDKContext);
}
