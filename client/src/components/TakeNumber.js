import "./TakeNumber.css"
import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';

const socket = io.connect("http://localhost:3001")

function TakeNumber(){
    var [queue,setQueue] = useState([]);
    var [nextServing,setNextServing] = useState(0);
    var [yourNum,setYourNum] = useState(0);

    useEffect(() => {
        setNextServing(queue[0]);
    },[queue])

    useEffect(() => {
        socket.on("queue-received",(data) => {
            setQueue(data);
            console.log(`Queue updated to ${data}`)
        })
    }, [socket])

    function notify(num){
        toast.success(`Your number is ${num}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function getSize() {
        return queue.length;
    }

    function isEmpty() {
        return getSize() === 0;
    }

    function peek() {
        if(isEmpty()){
            return 0;
        }
        return queue[0];
    }

    function enqueue() {
        var newItem = 0;

        if (isEmpty()){
            newItem = 1;
            console.log('empty! adding new number');
        } else {
            newItem = queue[getSize() - 1] + 1
        }
        queue.push(newItem);
        console.log(queue)
        setYourNum(newItem);
        setNextServing(queue[0]);
        socket.emit("queue-change", queue);
    }

    return(
        <div class="take-num-outer-box">
            <div>
                <p class="take">Next in line: {nextServing}</p>
            </div>
            <div>
                <p class="take">Your Number: {yourNum}</p>
            </div>
            <button onClick={enqueue}>Take a Number</button>
        </div>
    )
}



export default TakeNumber;