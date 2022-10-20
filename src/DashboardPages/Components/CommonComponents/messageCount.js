import { useState } from "react"

export const messageCount = () => {
    const [count, set] = useState(0)
    // console.log(count)
    const setCount = (number) => {
        set(number)
    }
    return { setCount, count }
}