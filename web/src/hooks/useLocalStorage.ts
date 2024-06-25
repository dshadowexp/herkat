/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: string | (() => void)) {
    try {
        const savedValue = JSON.parse(localStorage.getItem(key) || '');
        if (savedValue) return savedValue;

        if (initialValue instanceof Function) return initialValue();

        return initialValue
    } catch (error) {
        console.log('getSaveValue:useLocalStorage:', error)
    }
}

export default function useLocalStorage(key: string, initialValue: string) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log('useEffect:useLocalStorage:', error);
        }
    }, [value])

    function removeValue() {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.log('removeValue:useLocalStorage', error);
        }
    }

    return [value, setValue, removeValue]
}