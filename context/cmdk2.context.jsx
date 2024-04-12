"use client";
import useDebounce from "@/lib/useDebounce";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { types } from "@/lib/cmdkData";
import flattenMenu from "@/lib/flattenMenu";
import filterCmdkResultByMatchScore from "@/lib/filterCmdkResultByMatchScore";
import { addIdToCmdkResult } from "@/lib/addIdToCmdkResult";
import { getCmdkMenuListByActionStack } from "@/lib/getCmdkMenuListByActionStack";
import { filterCmdkResultByType } from "@/lib/filterCmdkResultByType";
import { searchCmdkMatchingResults } from "@/lib/searchCmdkMatchingResults";
import { cmdkDefaultCommands } from "@/lib/commands";
import useCmdkReducer, {actions} from "@/reducers/cmdkReducer";

const CMDKContext = createContext();
export function CMDKProvider({ children }) {
    const [state, dispatch] = useCmdkReducer();
  
    const {
      showCommandPalette,
      searching,
      data,
      searchTerm,
      selectedItem,
      actionStack,
      selectedTypes,
      commands,
      showAllCommands,
    } = state;
    
    function addSelectedType(name) {
      dispatch({ type: actions.SET_SELECTED_TYPES, payload: [...selectedTypes, name] });
    }
  
    function removeSelectedType(name) {
      dispatch({
        type: actions.SET_SELECTED_TYPES,
        payload: selectedTypes.filter((type) => type !== name),
      });
    }
  
    function toggleTypeSelection(name) {
      if (selectedTypes.includes(name)) removeSelectedType(name);
      else addSelectedType(name);
    }
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cmdk`);
          const data = await response.json();
          dispatch({ type: actions.SET_DATA, payload: data });
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
      if (selectedItem !== null && !showAllCommands) {
        const obj = filteredData.find((item) => item.id === selectedItem);
        if (obj) {
          if (obj.url) {
            window.open(obj.url, "_blank");
          } else if (obj.type === "action") {
            dispatch({ type: actions.SET_ACTION_STACK, payload: obj.stack });
          }
        }
      }
    }
  
    useEffect(() => {
      dispatch({
        type: actions.SET_COMMANDS,
        payload: filteredData.filter(
          (item) => item?.cmd?.onKeyPress !== undefined
        ),
      });
    }, [filteredData]);
  
   
    // attaching default keypress event listeners
    const handleKeyPress = useCallback(
      (event) => {
        const allCommands = [...cmdkDefaultCommands, ...commands];
  
        const isInputOrTextarea =
          event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";
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
        console.log("KEY", key);
        if (
          key !== "Alt" &&
          key !== "Ctrl" &&
          key !== "Shift" &&
          key !== "Meta"
        ) {
          keyCombinationPressed.push(key);
        }
        const keyCombination = keyCombinationPressed.join("+");
        const matchingCommand = allCommands.find((command) => {
          return (
            command?.cmd?.key?.toLowerCase() === keyCombination.toLowerCase()
          );
        });
  
        
        if (matchingCommand) {
          if(matchingCommand.cmd.key !== "Backspace")
              event.preventDefault();
          const actionToPerform = matchingCommand.cmd.onKeyPress;
          switch (actionToPerform) {
            case "open_command_palette":
              openCommandPalette();
              break;
            case "select_menu_item":
              handleSelection(event);
              break;
            case "navigate_up":
              dispatch({
                type: actions.SET_SELECTED_ITEM,
                payload: Math.max(selectedItem - 1, 0),
              });
              break;
            case "navigate_down":
              dispatch({
                type: actions.SET_SELECTED_ITEM,
                payload: Math.min(
                  selectedItem + 1,
                  filteredData.filter((item) => item.type !== null).length
                ),
              });
              break;
            case "navigate_back":
              if (searchTerm.length === 0 && actionStack.length > 0)
                dispatch({
                  type: actions.SET_ACTION_STACK,
                  payload: actionStack.slice(0, actionStack.length - 1),
                });
              break;
            case "navigate_top_or_exit":
              if (actionStack.length > 0)
                dispatch({ type: actions.SET_ACTION_STACK, payload: [] });
              else closeCommandPalette();
              break;
            case "push_to_action_stack":
              openCommandPalette();
              dispatch({
                type: actions.SET_ACTION_STACK,
                payload: matchingCommand.stack,
              });
              break;
            default:
              break;
          }
        }
      },
      [filteredData, selectedItem, cmdkDefaultCommands, commands]
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
      dispatch({
        type: actions.SET_SHOW_COMMAND_PALETTE,
        payload: state ?? !showCommandPalette,
      });
    };
  
    const openCommandPalette = () => {
      dispatch({ type: actions.OPEN_COMMAND_PALLETE });
    };
  
    const closeCommandPalette = () => {
      dispatch({ type: actions.CLOSE_COMMAND_PALLETE });
    };
  
    async function wait(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
  
    async function search(e) {
      dispatch({ type: actions.SET_SEARCHING, payload: true });
      let value = e.target.value;
      if (value.length > 0) await wait(300);
      if (value.length === 1 && value === "/" && actionStack.length === 0) {
        dispatch({ type: actions.SET_SHOW_ALL_COMMANDS, payload: true });
      } else {
        dispatch({ type: actions.SET_SHOW_ALL_COMMANDS, payload: false });
      }
      if (value.length > 1 && value.includes("/")) {
        const tmp = value.split("/").map((item) => item.trim());
        const newValue = tmp[tmp.length - 1];
        value = newValue;
        dispatch({
          type: actions.SET_ACTION_STACK,
          payload: tmp.slice(0, tmp.length - 1),
        });
      }
      dispatch({ type: actions.SET_SEARCH_TERM, payload: value });
      document.getElementById("cmdk-search").value = value;
      dispatch({ type: actions.SET_SELECTED_ITEM, payload: null });
      dispatch({ type: actions.SET_SEARCHING, payload: false });
    }
  
    function handleItemSelection(e) {
      e.stopPropagation();
      const id = e.target?.id;
      if (id && Number(id) !== NaN) {
        dispatch({ type: actions.SET_SELECTED_ITEM, payload: Number(id) });
      }
    }
  
    const handleSearch = useCallback(useDebounce(search, 500), []);
  
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
      dispatch,
    };
  
    return <CMDKContext.Provider value={value}>{children}</CMDKContext.Provider>;
  }
  export function useCMDK() {
    return useContext(CMDKContext);
  }
