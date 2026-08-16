import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

function useFetch<T>(fetcher: () => Promise<T>): FetchState<T> {
    const [data, setData]       = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetcher();
                if (!cancelled) setData(result);
            } catch {
                if (!cancelled) setError("Failed to load data.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [trigger]);

    const refetch = () => setTrigger((t) => t + 1);
    return { data, loading, error, refetch };
}

export default useFetch;