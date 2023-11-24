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
import { types, realData } from "@/lib/cmdkData";
import fuzzy_match from "@/lib/fuzzy";
import flattenMenu from "@/lib/flattenMenu";

const CMDKContext = createContext();

export function CMDKProvider({ children }) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionStack, setActionStack] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [commands, setCommands] = useState([]);

  function addSelectedType(name) {
    setSelectedTypes((prev) => [...prev, name]);
  }

  function removeSelectedType(name) {
    setSelectedTypes((prev) => prev.filter((type) => type !== name));
  }

  function toggleTypeSelection(name) {
    if (selectedTypes.includes(name)) removeSelectedType(name);
    else addSelectedType(name);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/cmdk");
        const data = await response.json();
        setData(data);
      }
      catch(err) {
        console.log(err);
      }
    }

    fetchData()
  },[])
  
  const flattedMenu = useMemo(() => flattenMenu(data), [data]);
  
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

    function filterByMatchScore(data, percent = 80) {
      return data.filter((item) => {
        if(item.type === null) return true;
        const splittedArray = item?.matchResult?.split("<b>")
        console.log(splittedArray);
        return splittedArray?.length >= percent / 100 * searchTerm.length}
      )
     }

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
    
    actionMenu = actionMenu.filter((item) => {
      if (selectedTypes.length === 0) return true;
      if (item.type === null) return true;
      return selectedTypes.includes(item.type);
    });
    if(searchTerm.length > 0) {
      let tmp = filterByMatchScore(actionMenu)
      if(tmp.filter(item => item.type !== null).length === 0) tmp = filterByMatchScore(actionMenu, 20)
      actionMenu = tmp;
    };
    return addIdToTypes(actionMenu);
  }, [searchTerm, actionStack, selectedTypes, flattedMenu]);

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

  useEffect(() => {
    setCommands(filteredData.filter(item => item?.cmd?.onKeyPress !== undefined))
  },[filteredData])

  useEffect(() => {
    console.log('COMMANDS ', commands);
    let listeners
    if(commands.length > 0) {
      listeners = commands.map(command => {
        return window.addEventListener("keydown", (event) => {
          const isInputOrTextarea = event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";
          if(!isInputOrTextarea)
            event.preventDefault();
          let keyCombinationPressed = []
          const isAlt = event.altKey;
          if(isAlt) keyCombinationPressed.push('Alt')
          const isCtrl = event.ctrlKey;
          if(isCtrl) keyCombinationPressed.push('Ctrl')
          const isShift = event.shiftKey;
          if(isShift) keyCombinationPressed.push('Shift')
          const isMeta = event.metaKey;
          if(isMeta) keyCombinationPressed.push('Meta')
          const key = event.key;
          if(key !== 'Alt' && key !== 'Ctrl' && key !== 'Shift' && key !== 'Meta')
            keyCombinationPressed.push(key)
          const keyCombination = keyCombinationPressed.join('+')
          if(keyCombination.toLowerCase() === command.cmd.name.toLowerCase()) {
            const actionToPerform = command.cmd.onKeyPress
            switch(actionToPerform) {
              case 'openCommandPalette':
                openCommandPalette()
                break;
              case 'closeCommandPalette':
                closeCommandPalette()
                break;
              case 'toggleCommandPalette':
                toggleCommandPalette()
                break;
              case 'push_to_action_stack':
                openCommandPalette()
                setActionStack((prev) => command.stack)
                break;
              default:
                break;
            }
          }
        })
      })
    }
    return () => {
      if(listeners) {
        listeners.forEach(listener => {
          window.removeEventListener("keydown", listener)
        })
      }
    }
  },[commands])

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
