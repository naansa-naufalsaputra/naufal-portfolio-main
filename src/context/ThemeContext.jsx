import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default to 'hacker' mode (isProfessionalMode = false)
    const [isProMode, setIsProMode] = useState(false);

    // Load preference from local storage on mount
    useEffect(() => {
        const savedMode = localStorage.getItem('ns_portfolio_mode');
        if (savedMode === 'professional') {
            setIsProMode(true);
        }
    }, []);

    const toggleMode = () => {
        setIsProMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('ns_portfolio_mode', newMode ? 'professional' : 'hacker');
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ isProMode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
