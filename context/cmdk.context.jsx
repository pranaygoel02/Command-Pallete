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
import cmdkData, { newData, types } from "@/lib/cmdkData";
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
  const [selectedTypes, setSelectedTypes] = useState([]);

  function addSelectedType(name) {
    setSelectedTypes((prev) => [...prev, name]);
    console.log("added");
  }

  function removeSelectedType(name) {
    setSelectedTypes((prev) => prev.filter((type) => type !== name));
    console.log("removed");
  }

  function toggleTypeSelection(name) {
    console.log(name, selectedTypes);
    if (selectedTypes.includes(name)) removeSelectedType(name);
    else addSelectedType(name);
  }

  const flattedMenu = flattenMenu(newData);
  console.log(flattedMenu);

  const filteredData = useMemo(() => {
    const isChildItem = (item, stack) => {
      const titleString = item.title.join(" / ").toLowerCase();
      const actionString = stack?.join(" / ").toLowerCase();
      return titleString.includes(actionString);
    };

    // getting all child items of action menu
    const getActionMenu = (actionStack, menu) => {
      return menu
        .map((item) => {
          if (isChildItem(item, actionStack))
            return { ...item, stack: item.title };
          return null;
        })
        .filter((item) => item !== null);
    };

    const addIdToTypes = (data) => {
      let idCounter = 0;
      return data
        .map((item, index) => {
          if (data[index]?.type === null && data[index + 1]?.type === null)
            return null;
          return item.type === null
            ? !data[index + 1]?.title
                .join("/")
                .toLowerCase()
                .includes(item.title.join("/").toLowerCase())
              ? null
              : {
                  ...item,
                  level: item?.stack?.length - actionStack?.length - 1,
                  title: item.title[item.title.length - 1],
                }
            : {
                ...item,
                id: ++idCounter,
                level: item?.stack?.length - actionStack?.length - 1,
                title: item.title[item.title.length - 1],
              };
        })
        .filter((item) => item !== null);
    };

    let actionMenu = getActionMenu(actionStack, flattedMenu);

    if (searchTerm.length === 0) {
      actionMenu = actionMenu.filter(
        (item) =>
          item.title.length - actionStack.length <= 2 &&
          item.title.length - actionStack.length > 0
      );
    } else {
      actionMenu = actionMenu
        .map((item) => {
          if (item.type === null)
            return {
              ...item,
              matchResult: fuzzy_match(
                item.title[item.title.length - 1],
                searchTerm
              ),
            };
          const titleString = item.title.join(" / ");
          const matchResult = fuzzy_match(titleString, searchTerm);
          if (matchResult.length > 0)
            return {
              ...item,
              matchResult: ((matchResult) => {
                let tmp = matchResult.split(" / ");
                tmp = tmp[tmp.length - 1];
                if (!tmp.includes("<b>")) tmp = fuzzy_match(tmp, searchTerm);
                return tmp;
              })(matchResult),
            };
          return null;
        })
        .filter((item) => item !== null);
    }

    console.log("actionMenu ", actionMenu);
    actionMenu = actionMenu.filter((item) => {
      if (selectedTypes.length === 0) return true;
      if (item.type === null) return true;
      return selectedTypes.includes(item.type);
    });
    actionMenu = addIdToTypes(actionMenu);
    console.log(actionMenu);
    return actionMenu;
  }, [searchTerm, actionStack, selectedTypes]);

  function handleSelection(event) {
    event.preventDefault();
    event.stopPropagation();
    if (selectedItem !== null) {
      const obj = filteredData.find((item) => item.id === selectedItem);
      if (obj) {
        if (obj.url) {
          window.open(obj.url, "_blank");
        } else if (obj.type === "action") {
          setActionStack((prev) => obj.stack);
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
    types,
    selectedTypes,
    addSelectedType,
    removeSelectedType,
    toggleTypeSelection,
  };

  return <CMDKContext.Provider value={value}>{children}</CMDKContext.Provider>;
}
export function useCMDK() {
  return useContext(CMDKContext);
}
