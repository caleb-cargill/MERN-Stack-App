export const SetDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");        
};

export const SetLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};

export const GetTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = 
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const defaultDark = 
        storedTheme === "dark" || (storedTheme === null && prefersDark);

    return defaultDark;
};

export const SetTheme = () => {    
    const defaultDark = GetTheme();
    if (defaultDark) {
        SetDark();
    }
};