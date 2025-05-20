"use client"
export const localStorageUtil = <T>(isDebug: boolean = false) => {
    const getValue = (key: string): T | null => {

        const item = window.localStorage.getItem(key) 
        if (isDebug) {
            console.log("getValue", key, item);
        }
        return item ? JSON.parse(item) as T : null;
    }
    const setValue = (key: string, value: T) => {
        window.localStorage.setItem(key, JSON.stringify(value));
        if (isDebug) {
            console.log("setValue", key, value);
        }
    }
    const resetValue = (key: string) => {
        window.localStorage.removeItem(key);
        if (isDebug) {
            console.log("resetValue", key);
        }
    }
    return { getValue, setValue, resetValue };
}