/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/");
        });

        return () => { clearTimeout(timeout) };
    }, []);

    return (
        <div>NotFound</div>
    )
}
