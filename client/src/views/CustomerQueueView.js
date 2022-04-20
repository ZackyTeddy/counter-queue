import io from 'socket.io-client'
import {useState} from 'react'

import CounterDisplay from '../components/CounterDisplay';
import TakeNumber from '../components/TakeNumber';

const socket = io.connect("http://localhost:3001")

const CustomerQueueView = () => {
    const [counterStatus1,setCounterStatus1] = useState(true);
    const [counterStatus2,setCounterStatus2] = useState(true);
    const [counterStatus3,setCounterStatus3] = useState(true);
    const [counterStatus4,setCounterStatus4] = useState(true);

    return (
        <div>
            <TakeNumber/>
            <div class="counter-rows">
                <CounterDisplay status={counterStatus1} number="1" current="Placeholder" />
                <CounterDisplay status={counterStatus2} number="2" current="Placeholder" />
                <CounterDisplay status={counterStatus3} number="3" current="Placeholder" />
                <CounterDisplay status={counterStatus4} number="4" current="Placeholder" />
            </div>
        </div>
    );
  };
    
  export default CustomerQueueView;