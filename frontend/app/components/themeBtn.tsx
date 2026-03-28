"use client"
import { useTheme } from "next-themes"
import { FaSun, FaMoon } from "react-icons/fa6";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();

    return(
        <button onClick={() => setTheme(theme == "dark" ? "light": "dark")}>
            {theme === "dark" ? <FaMoon/> : <FaSun/>}
        </button>
    )

}