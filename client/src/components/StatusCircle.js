import React from 'react'
import "./StatusCircle.css"

const StatusCircle = (status) => {

    if(status === 'Online'){
        return (
                <div class="greenStatus"/>
        )
    }
    else if(status === 'Busy'){
        return (
                <div class="redStatus"/>
        )
    }
    else if(status === 'Offline'){
        return (
                <div class="grayStatus"/>
        )
    }
    else{
        return (
                <div class="grayStatus"/>
        )
    }
}

export default StatusCircle;