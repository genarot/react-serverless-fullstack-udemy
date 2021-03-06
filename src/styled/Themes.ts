const SharedStyles = {
    accent: "#e16365"
}

export const darkTheme =  {
    mainBgColor: "#333",
    mainTextColor: "#f9f9f9",
    ...SharedStyles
}

export const lightTheme = {
    mainBgColor: "#f9f9f9",
    mainTextColor: "#333",
    ...SharedStyles
}

export interface MyTheme {
    mainBgColor: string;
    mainTextColor: string;
    accent: string;
}