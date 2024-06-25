/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";


export default function useUpdateLogger(value: string | object | number, desc: string) {
    useEffect(() => {
        console.log(`${desc}`);
        console.log(value)
    }, [value])
}
