import "./CounterDisplay.css"
import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import StatusCircle from "./StatusCircle";

const socket = io.connect("http://localhost:3001")

//Props: status (Counter status), number (Counter number), current (Current serving number)
function CounterDisplay(props){
    const [status,setStatus] = useState("Online");
    const [currentServing,setCurrentServing] = useState("Available");

    useEffect(() => {
        socket.on("status-received",(data) => {
            if(data.number === props.number){
                setStatus(data.status);
                console.log(`Received status change for counter ${data.number} as ${data.status}`)
            }
        })

        socket.on("current-received",(data) => {
            if(data.number === props.number){
                setCurrentServing(data.current);
                console.log(`Received current serving for counter ${data.number} as ${data.current}`)
            }
        })
    }, [socket])
    

    return(
        <div class="outer-box">
            <div>
                {StatusCircle(status)}
            </div>
            <div>
                <p>Counter {props.number}</p>
            </div>
            <div>
                <p>Currently Serving</p>
                <div class="content-box">{currentServing}</div>
            </div>
        </div>
    )
}

export default CounterDisplay;