import io from 'socket.io-client'
import {useState} from 'react'


import CounterControl from '../components/CounterControl'

const CounterControlView = () => {
    const [counterStatus1,setCounterStatus1] = useState(true);
    const [counterStatus2,setCounterStatus2] = useState(true);
    const [counterStatus3,setCounterStatus3] = useState(true);
    const [counterStatus4,setCounterStatus4] = useState(true);

    return(
        <div class="counter-rows">
            <CounterControl status={counterStatus1} number="1" />
            <CounterControl status={counterStatus2} number="2" />
            <CounterControl status={counterStatus3} number="3" />
            <CounterControl status={counterStatus4} number="4" />
        </div>
    )
}

export default CounterControlView;