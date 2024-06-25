import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
    const [value, setValue] = useState(defaultValue);

    function on() {
        setValue(true);
    }

    function off() {
        setValue(false)
    }

    function toggle(tValue?: boolean) {
        setValue(currentValue => typeof tValue === "boolean" ? value : !currentValue);
    }

    return { value, on, off, toggle };
}