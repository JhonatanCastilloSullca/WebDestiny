import { useEffect, useState } from "react";

export function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_REACT_API_KEY}`,
        };

        const fetchOptions = {
            method: options.method || 'GET',
            headers,
            ...options.body && { body: JSON.stringify(options.body) },
        };

        fetch(url, fetchOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
