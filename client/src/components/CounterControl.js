import "./CounterControl.css";
import {useState,useEffect} from 'react';
import io from 'socket.io-client'
import StatusCircle from "./StatusCircle";

const socket = io.connect("http://localhost:3001")

//Props: status (Counter status), number (Counter number), current (Current serving number)
function CounterControl(props){
    var [status,setStatus] = useState("Online");
    var [current,setCurrent] = useState("Available");
    var [queue,setQueue] = useState([]);

    useEffect(() => {
        socket.on("queue-received",(data) => {
            setQueue(data);
            console.log(`Queue updated to ${data}`)
        })
    }, [socket])

    function getSize() {
        return queue.length;
    }

    function isEmpty() {
        return getSize() === 0;
    }

    function dequeue() {
        if(status){
            var dequeued = 0;

            if (isEmpty()){
                console.log('empty!');
                setCurrent("None");
            } else {
                dequeued = queue[0]
                queue.shift()
                socket.emit("queue-change", queue);
                setCurrent(dequeued);

                const data = {
                    current: dequeued,
                    number: props.number
                }
                socket.emit("current-change", data)
                changeStatus("Busy")
            }
        } else {
            console.log("Counter currently offline!")
        }
    }

    async function completeCurrent() {
        setCurrent("Available");
        const data = {
            current: "Available",
            number: props.number
        }
        socket.emit("current-change", data)
        changeStatus("Online")
    }

    function changeStatus(newStatus) {
        setStatus(newStatus);
        const data = {
            number: props.number,
            status: newStatus
        }
        socket.emit('status-change', data)
    }

    function toggleStatus() {
        var newStatus = "";
        var newCurrent;
        if(status === "Online"){
            newStatus = "Offline";
            setCurrent("Offline");
            newCurrent = {
                current: "Offline",
                number: props.number
            }
        } else {
            newStatus = "Online";
            setCurrent("Available");
            newCurrent = {
                current: "Available",
                number: props.number
            }
        }
        setStatus(newStatus);
        const data = {
            number: props.number,
            status: newStatus
        }
        socket.emit('status-change', data)
        socket.emit("current-change", newCurrent)
    }

    return(
        <div class="outer-box">
            <div>
                {StatusCircle(status)}
            </div>
            <div>
                <p>Counter {props.number}</p>
            </div>
            <div>
                <p>Currently Serving: </p>
                <div class="content-box">{current}</div>
            </div>
            <div>
                <button onClick={toggleStatus}>Toggle Status</button>
            </div>
            <div>
                <button onClick={completeCurrent}>Complete Current</button>
            </div>
            <div>
                <button onClick={dequeue}>Call Next</button>
            </div>
        </div>
    )
}

export default CounterControl;