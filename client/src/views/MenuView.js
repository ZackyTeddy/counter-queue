import './views.css'
import io from 'socket.io-client'
import {useState, useEffect} from 'react'

const socket = io.connect("http://localhost:3001")

const MenuView = () => {

    useEffect(() => {
        document.title = "Interface Choice";
    })

    const routeToQueue = () => {
        window.location.assign('/queue');
    }
    const routeToControl = () => {
        window.location.assign('/control');
    }

    return (
        <div class="back">
            <div className="counter-row">
                <button class="menuRouteButton" onClick={routeToQueue}>Customer Queue Interface</button>
                <button class="menuRouteButton" onClick={routeToControl}>Counter Control Interface</button>
            </div>
        </div>
    );
  };
    
  export default MenuView;