import { createGlobalStyle } from "styled-components";
import { MyTheme } from "./Themes";

export default createGlobalStyle<{ theme: MyTheme }>`
    :root {
        --main-bg-color: ${(props) => props.theme.mainBgColor};
        --main-text-color: ${(props) => props.theme.mainTextColor};
        --accent-color: ${(props) => props.theme.accent};
    }

    * {
        box-sizing: border-box;
        color: var(--main-text-color);
        margin:0;
        font-family: sans-serif;
        font-weight: 300;
    }
    
    h1, h2 {
       margin-bottom: 2rem;
    }
`;
