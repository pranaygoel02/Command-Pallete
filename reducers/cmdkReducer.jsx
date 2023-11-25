"use client";
import {
  useReducer,
} from "react";

const initialState = {
  showCommandPalette: false,
  searching: false,
  data: null,
  searchTerm: "",
  selectedItem: null,
  actionStack: [],
  selectedTypes: [],
  commands: [],
  showAllCommands: false,
};

export const actions = {
    SET_DATA: "SET_DATA",
    SET_SHOW_COMMAND_PALETTE: "SET_SHOW_COMMAND_PALETTE",
    OPEN_COMMAND_PALLETE: "OPEN_COMMAND_PALLETE",
    CLOSE_COMMAND_PALLETE: "CLOSE_COMMAND_PALLETE",
    SET_SEARCHING: "SET_SEARCHING",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
    SET_ACTION_STACK: "SET_ACTION_STACK",
    SET_SELECTED_TYPES: "SET_SELECTED_TYPES",
    SET_COMMANDS: "SET_COMMANDS",
    SET_SHOW_ALL_COMMANDS: "SET_SHOW_ALL_COMMANDS",
}

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_DATA:
      return { ...state, data: action.payload };
    case actions.SET_SHOW_COMMAND_PALETTE:
      return { ...state, showCommandPalette: action.payload };
    case actions.OPEN_COMMAND_PALLETE:
      return { ...state, showCommandPalette: true };
    case actions.CLOSE_COMMAND_PALLETE:
      return {
        ...state,
        showCommandPalette: false,
        actionStack: [],
        searchTerm: "",
        selectedItem: null,
        selectedTypes: [],
      };
    case actions.SET_SEARCHING:
      return { ...state, searching: action.payload };
    case actions.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actions.SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload };
    case actions.SET_ACTION_STACK:
      return { ...state, actionStack: action.payload };
    case actions.SET_SELECTED_TYPES:
      return { ...state, selectedTypes: action.payload };
    case actions.SET_COMMANDS:
      return { ...state, commands: action.payload };
    case actions.SET_SHOW_ALL_COMMANDS:
      return { ...state, showAllCommands: action.payload };
    default:
      return state;
  }
}

export default function useCmdkReducer() {
    return useReducer(reducer, initialState);
}