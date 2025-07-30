import {useEffect, useState} from "react";
import "./CountdownTimer.css"
const CountdownTimer = () =>{
    const [counter, setCounter] = useState(60);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);


    return(
        <div className="countdownTimer">
            {counter}
        </div>
    )
}

export default CountdownTimer