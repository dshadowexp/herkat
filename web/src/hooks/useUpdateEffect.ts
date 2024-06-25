/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

export default function useUpdateEffect(callback: ()=>void, dependencies: string[]) {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }

        return callback();
    }, [dependencies])
}
