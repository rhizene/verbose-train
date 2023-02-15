import { render } from "@testing-library/react";
import defaultStore from "Containers/App/store"
import { Provider } from "react-redux";


/**
 * 
 * @param {import("react").ReactElement} ui 
 * @returns 
 */
export function renderWithProviders(
    ui,
    {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = defaultStore,
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
  }
