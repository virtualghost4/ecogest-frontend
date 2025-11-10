import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: false,
  darkMode: false,
  sidenavColor: "info",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "SET_TRANSPARENT_SIDENAV":
      return { ...state, transparentSidenav: action.value };
    case "SET_WHITE_SIDENAV":
      return { ...state, whiteSidenav: action.value };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.value };
    case "SET_SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    default:
      return state;
  }
}

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMiniSidenav = (value) => dispatch({ type: "SET_MINI_SIDENAV", value });
  const setTransparentSidenav = (value) => dispatch({ type: "SET_TRANSPARENT_SIDENAV", value });
  const setWhiteSidenav = (value) => dispatch({ type: "SET_WHITE_SIDENAV", value });
  const setDarkMode = (value) => dispatch({ type: "SET_DARK_MODE", value });
  const setSidenavColor = (value) => dispatch({ type: "SET_SIDENAV_COLOR", value });

  const value = {
    ...state,
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
    setDarkMode,
    setSidenavColor,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
}

export default MenuContext;
