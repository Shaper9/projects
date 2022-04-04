import { useState, useCallback } from 'react'

const useFetch = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    const sendRequest = useCallback(async (config, func: (data: any) => void) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                config.url, {
                method: config.method ? config.method : "GET",
                headers: config.headers ? config.headers : {},
                body: config.body ? JSON.stringify(config.body) : null
            }
            )
            if (!response.ok) {
                throw new Error('Request failed')
            }
            const data = await response.json()

            func(data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }, [])


    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
    // Needs RETURN at the end of a component
}


export default useFetch;