import useDarkMode from '@/utils/hooks/useDarkMode'
import { useCallback } from 'react';
import { FiSun, FiMoon } from "react-icons/fi";

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked: boolean) => {
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark],
    )

    return (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                    style={{
                    padding: "10px",
                    fontSize: "18px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: isDark ? "#222" : "#ddd",
                    color: isDark ? "#fff" : "#000",
                    }}
                    onClick={() => onSwitchChange(!isDark)}
                >
                    {isDark? <FiMoon />: <FiSun/>}
                </button>
            </div>
    )
}

export default ModeSwitcher
