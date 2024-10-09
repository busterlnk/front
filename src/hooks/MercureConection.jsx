import { useState, useEffect } from 'react';

export default function useMercure(topic) {
    const url = 'http://localhost/.well-known/mercure';
    const completeTopic = `http://localhost/api/${topic}`
    const [data, setData] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const fullUrl = new URL(url);
        fullUrl.searchParams.append('topic', completeTopic);


        const eventSource = new EventSource(fullUrl);
        eventSource.onopen = () => setIsConnected(true);
        eventSource.onerror = () => setIsConnected(false);
        eventSource.onmessage = event => {
            setData(JSON.parse(event.data));
        };

        return () => {
            eventSource.close();
        };
    }, [url, topic]);

    return { data, isConnected };
}
