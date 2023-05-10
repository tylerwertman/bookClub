import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedDarkMode = Cookies.get('darkMode') === 'true';
        setDarkMode(storedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const updatedDarkMode = !darkMode;
        setDarkMode(updatedDarkMode);
        Cookies.set('darkMode', updatedDarkMode.toString(), { expires: 7 });
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                Dark Mode
            </label>
        </div>
    );
};

export default DarkModeToggle;
