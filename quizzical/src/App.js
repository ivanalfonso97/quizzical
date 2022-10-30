import React from "react"
import Landing from "./Components/Landing"
import Quiz from "./Components/Quiz"

export default function App() {
    const [started, setStarted] = React.useState(false)

    function toggleStart() {
        setStarted(prevState => !prevState)
    }
    
    return (
        <div className="app flex-center">
            {started ? 
            <Quiz /> : 
            <Landing 
                toggleStart={toggleStart} 
            />}
        </div>
    )
}

// Logs
// Start 20:12
// CSS done 21:57
// Break 00:40
// Did random stuff for 10 mins
// Start 06:36
// End 08:00
// Start 03:30
// Done 04:53