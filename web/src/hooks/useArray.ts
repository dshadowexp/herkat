import { useState } from "react";

export default function useArray<T>(defaultValue: T[]) {
    const [array, setArray] = useState(defaultValue);

    function push(element: T) {
        setArray(prev => [...prev, element]);
    } 

    // function filter(callback) {
    //     setArray(prev => prev.filter(callback));
    // }

    // function update(index, newElemnt) {

    // }

    // function remove(index: number) {
    //     setArray()
    // }

    function clear() {
        setArray([]);
    }

    return {
        array, push, clear
    }
}
