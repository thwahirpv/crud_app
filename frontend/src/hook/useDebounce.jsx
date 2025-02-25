import { useState, useEffect } from "react"

const useDebounce = (value, delay) => {
    const [ deBounceValue, setDebounceValue ] = useState(value)

    useEffect(() => {
        const timeHandler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timeHandler)
        }
    }, [value])

    return deBounceValue
}

export default useDebounce 