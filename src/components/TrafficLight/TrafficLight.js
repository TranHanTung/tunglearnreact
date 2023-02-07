import React, { useCallback, useEffect } from "react";
import Light from "../Light/Light";
import "./TrafficLight.css";

import Countdown from "../../Countdown/Countdown";
const Lights = {
    Red: {
        color: "red",
        timer: 20,
    },
    Yellow: {
        color: "yellow",
        timer: 5,
    },
    Green: {
        color: "green",
        timer: 25,
    },
};  
export default function TrafficLight()  {
    const[lightOn, setLightOn] = React.useState(Lights.Green);

    const turnOnNextLight = useCallback (() => {
        if(lightOn === Lights.Green) {
            setLightOn(Lights.Yellow);
            return;
        }

        if(lightOn === Lights.Yellow) {
            setLightOn(Lights.Red);
            return;
        }
        if(lightOn === Lights.Red) {
            setLightOn(Lights.Green);
            return;
        }
            

    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            turnOnNextLight();
        }, 1000 * lightOn.timer);
        return() => {
            return clearTimeout(timeoutId);
        };
    }, [lightOn, turnOnNextLight]);

  return (
    <div>
        <div className="traffic-light">
        <Countdown timer = {lightOn.timer} />
        <Light color ={Lights.Red.color} isOn={lightOn === Lights.Red} />
        <Light color ={Lights.Yellow.color} isOn={lightOn === Lights.Yellow} />
        <Light color ={Lights.Green.color} isOn={lightOn === Lights.Green} />
    </div>
    
    </div>
    
  );
}
