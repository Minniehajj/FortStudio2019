import Theme from "./components";
import image from "@frontity/html2react/processors/image";
const acfOptionsHandler = {
  pattern: "acf-options-page",
  func: async ({ route, state, libraries }) => {
    // 1. Get ACF option page from REST API.
    const response = await libraries.source.api.get({
      endpoint: `/acf/v3/options/options`
    });
    const option = await response.json();

    // 2. Add data to `source`.
    const data = state.source.get(route);
    Object.assign(data, { ...option, isAcfOptionsPage: true });
  }
};
const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    // In Frontity, any package can add React components to the site.
    // We use roots for that, scoped to the "theme" namespace.
    theme: Theme
  },
  state: {
    // State is where the packages store their default settings and other
    // relevant state. It is scoped to the "theme" namespace.
    theme: {
      menu: [],
      navDark:true,
    }
  },
  // Actions are functions that modify the state or deal with other parts of
  // Frontity like libraries.
   actions: {
    theme: {
      beforeSSR: async ({ state, actions }) => {
        // This will make Frontity wait until the ACF options
        // page has been fetched and it is available
        // using state.source.get("acf-options-page").
        await actions.source.fetch("acf-options-page");
      }
    }
  },
  libraries: {
    html2react: {
      // Add a processor to html2react so it processes the <img> tags
      // inside the content HTML. You can add your own processors too.
      processors: [image]
    },
    source:{
        handlers: [acfOptionsHandler]
    }
  }
};

export default marsTheme;
