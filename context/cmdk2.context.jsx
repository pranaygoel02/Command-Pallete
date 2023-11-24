"use client";
import useDebounce from "@/lib/useDebounce";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { types } from "@/lib/cmdkData";
import flattenMenu from "@/lib/flattenMenu";
import filterCmdkResultByMatchScore from "@/lib/filterCmdkResultByMatchScore";
import { addIdToCmdkResult } from "@/lib/addIdToCmdkResult";
import { getCmdkMenuListByActionStack } from "@/lib/getCmdkMenuListByActionStack";
import { filterCmdkResultByType } from "@/lib/filterCmdkResultByType";
import { searchCmdkMatchingResults } from "@/lib/searchCmdkMatchingResults";

const CMDKContext = createContext();

const initialState = {
  showCommandPalette: false,
  searching: false,
  data: null,
  searchTerm: "",
  selectedItem: null,
  actionStack: [],
  selectedTypes: [],
  commands: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_SHOW_COMMAND_PALETTE":
      return { ...state, showCommandPalette: action.payload };
    case "OPEN_COMMAND_PALLETE":
        return { ...state, showCommandPalette: true };
    case "CLOSE_COMMAND_PALLETE":
        return { ...state, showCommandPalette: false, actionStack: [], searchTerm: "", selectedItem: null, selectedTypes: [] };
    case "SET_SEARCHING":
      return { ...state, searching: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.payload };
    case "SET_ACTION_STACK":
      return { ...state, actionStack: action.payload };
    case "SET_SELECTED_TYPES":
      return { ...state, selectedTypes: action.payload };
    case "SET_COMMANDS":
      return { ...state, commands: action.payload };
    default:
      return state;
  }
}

export function CMDKProvider({ children }) {
  
  
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const {showCommandPalette, searching, data, searchTerm, selectedItem, actionStack, selectedTypes, commands} = state;
    console.log(state);

  function addSelectedType(name) {
    dispatch({ type: "SET_SELECTED_TYPES", payload: [...selectedTypes, name] })
  }

  function removeSelectedType(name) {
    dispatch({ type: "SET_SELECTED_TYPES", payload: selectedTypes.filter((type) => type !== name) })
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
        dispatch({ type: "SET_DATA", payload: data });
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const flattedMenu = useMemo(() => flattenMenu(data), [data]);

  const filteredData = useMemo(() => {

    let actionMenu = getCmdkMenuListByActionStack(actionStack, flattedMenu);

    if (searchTerm.length === 0) {
      actionMenu = actionMenu.filter(
        (item) =>
          item.title.length - actionStack.length <= 2 &&
          item.title.length - actionStack.length > 0
      );
    } else {
      actionMenu = searchCmdkMatchingResults(actionMenu, searchTerm);
    }

    actionMenu = filterCmdkResultByType(actionMenu, selectedTypes);

    if (searchTerm.length > 0) {
        /* 
        default threshold is 80% match, causing more results to be filtered out due to nesting of menu items
        but if no results are found, then we try with a lower threshold of 20% match, i.e, more results are shown
        */
      let tmp = filterCmdkResultByMatchScore(actionMenu, searchTerm);
      if (tmp.filter((item) => item.type !== null).length === 0)
        tmp = filterCmdkResultByMatchScore(actionMenu, searchTerm, 20);
      actionMenu = tmp;
    }
    return addIdToCmdkResult(actionMenu);
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
            dispatch({ type: "SET_ACTION_STACK", payload: obj.stack });
        }
      }
    }
  }

  useEffect(() => {
    dispatch({type: "SET_COMMANDS", payload: filteredData.filter((item) => item?.cmd?.onKeyPress !== undefined)})
  }, [filteredData]);

  
  // attaching keypress event listeners on commands with onKeyPress property retrieved from data
  useEffect(() => {
    let listeners;
    if (commands.length > 0) {
      listeners = commands.map((command) => {
        return window.addEventListener("keydown", (event) => {
          const isInputOrTextarea =
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA";
          if (!isInputOrTextarea) event.preventDefault();
          let keyCombinationPressed = [];
          const isAlt = event.altKey;
          if (isAlt) keyCombinationPressed.push("Alt");
          const isCtrl = event.ctrlKey;
          if (isCtrl) keyCombinationPressed.push("Ctrl");
          const isShift = event.shiftKey;
          if (isShift) keyCombinationPressed.push("Shift");
          const isMeta = event.metaKey;
          if (isMeta) keyCombinationPressed.push("Meta");
          const key = event.key;
          if (
            key !== "Alt" &&
            key !== "Ctrl" &&
            key !== "Shift" &&
            key !== "Meta"
          )
            keyCombinationPressed.push(key);
          const keyCombination = keyCombinationPressed.join("+");
          if (keyCombination.toLowerCase() === command.cmd.name.toLowerCase()) {
            const actionToPerform = command.cmd.onKeyPress;
            switch (actionToPerform) {
              case "openCommandPalette":
                openCommandPalette();
                break;
              case "closeCommandPalette":
                closeCommandPalette();
                break;
              case "toggleCommandPalette":
                toggleCommandPalette();
                break;
              case "push_to_action_stack":
                openCommandPalette();
                dispatch({ type: "SET_ACTION_STACK", payload: command.stack });
                break;
              default:
                break;
            }
          }
        });
      });
    }
    return () => {
      if (listeners) {
        listeners.forEach((listener) => {
          window.removeEventListener("keydown", listener);
        });
      }
    };
  }, [commands]);

  // attaching default keypress event listeners
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
            dispatch({ type: "SET_ACTION_STACK", payload: actionStack.slice(0, actionStack.length - 1) });
      }
      if (event.key === "ArrowDown") {
        dispatch({type: "SET_SELECTED_ITEM", payload: Math.min(selectedItem + 1, filteredData.filter((item) => item.type !== null).length)})
      }
      if (event.key === "ArrowUp") {
        dispatch({type: "SET_SELECTED_ITEM", payload: Math.max(selectedItem - 1, 0)})
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
    dispatch({type: "SET_SHOW_COMMAND_PALETTE", payload: state ?? !showCommandPalette})
  };

  const openCommandPalette = () => {
    dispatch({type: "OPEN_COMMAND_PALLETE"})
  };

  const closeCommandPalette = () => {
    dispatch({type: "CLOSE_COMMAND_PALLETE"})
  };

  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function search(e) {
    dispatch({type: "SET_SEARCHING", payload: true})
    if (e.target.value.length > 0) await wait(300);
    dispatch({type: "SET_SEARCH_TERM", payload: e.target.value})
    dispatch({type: "SET_SELECTED_ITEM", payload: null})
    dispatch({type: "SET_SEARCHING", payload: false})
  }

  function handleItemSelection(e) {
    e.stopPropagation();
    const id = e.target?.id;
    if (id && Number(id) !== NaN) {
        dispatch({type: "SET_SELECTED_ITEM", payload: Number(id)})
    }
  }

  const handleSearch = useCallback(useDebounce(search, 300), []);

  const value = {
    showCommandPalette,
    toggleCommandPalette,
    openCommandPalette,
    closeCommandPalette,
    searching,
    handleSearch,
    data,
    filteredData,
    selectedItem,
    handleItemSelection,
    handleSelection,
    actionStack,
    searchTerm,
    types,
    selectedTypes,
    addSelectedType,
    removeSelectedType,
    toggleTypeSelection,
    ...state,
    dispatch
  };

  return <CMDKContext.Provider value={value}>{children}</CMDKContext.Provider>;
}
export function useCMDK() {
  return useContext(CMDKContext);
}
