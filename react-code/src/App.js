import {useState} from 'react';
import Swal from 'sweetalert2';
import './App.css';
import useSound from 'use-sound';
import finishTimer from './finishTimer.mp3'
import typeSec from './type.mp3';

let timeInterval = null;
function App() {
  const [hour, setHour] = useState(0);
  const [minute,setMinute] = useState(0);
  const [second,setSecond ] = useState(5);
  const [st, setSt] = useState(false);

  const [playOn] = useSound(finishTimer,{ volume: 0.25 });
  const [typeSecond] = useSound(typeSec,{ volume: 0.25 });


  const hourFunction = () =>{
    Swal.fire({
      title:"CHOOSE HOUR",
      icon:"question",
      input:"range",
      inputAttributes: {
        min: 0,
        max: 23,
        step: 1
      },
      inputValue:hour,
      confirmButtonText:"Update Hour"
    }).then(res=>{
      if(res.value){
        setHour(parseInt(res.value));
      }
    })
  }

  const minuteFunction = () =>{
    Swal.fire({
      title:"CHOOSE MINUTE",
      icon:"question",
      input:"range",
      inputAttributes: {
        min: 0,
        max: 59,
        step: 1
      },
      inputValue:minute,
      confirmButtonText:"Update Minute"
    }).then(res=>{
      if(res.value){
        setMinute(parseInt(res.value));
      }
    })
  }

  const secondFunction = () =>{
    Swal.fire({
      title:"CHOOSE SECOND",
      icon:"question",
      input:"range",
      inputAttributes: {
        min: 0,
        max: 59,
        step: 1
      },
      inputValue:second,
      confirmButtonText:"Update Second"
    }).then(res=>{
      if(res.value){
        setSecond(parseInt(res.value));
      }
    })
  }

  const start = () =>{
    if(!st){

      //check if there is no time set
      if(minute===0&&second===0&&hour===0){
        Swal.fire('ZERO SECONDS','','error');
        return;
      }
      playOn();
      setSt(true);
      timer();
    }else {
      playOn();
      setSt(false);
      clearInterval(timeInterval);
    }
    
  }

  const timer = () =>{

    const now = Date.now();
		let sec = now + second * 1000;
    timeInterval = setInterval(()=>{
      let secondLeft = Math.round((sec - Date.now()) / 1000)
      if(secondLeft>0) setSecond(secondLeft)			
     
      if (secondLeft <= 0) {
        
        if(secondLeft===0){
          setSecond(0); 
          if(secondLeft===0&&minute===0&&hour===0){
            finish();
            return;
          }
          
        }else if(secondLeft<0){
          setSecond(59);
          secondLeft=59;
          sec = Date.now()+59000;
          if(minute>0){
            setMinute(prev=>prev-1);
          }else if(minute<=0){

            if(hour>0){
              setMinute(59);
              setHour(prev=>prev-1);
            }
          }
        }
			}
      if(secondLeft<10&&minute===0&&hour===0){
        typeSecond();
      }
    },1000)

  }

  const finish = () =>{
    playOn();
    clearInterval(timeInterval);
  }
  const reset = () =>{
    setSt(false);
    typeSecond();
    clearInterval(timeInterval);
    setHour(0);
    setMinute(5);
    setSecond(4);
  }
  return (
    <div className="Main">

      
      
      <div className="timer">
        
        <div onClick={hourFunction}>
          {hour<10?"0"+hour:hour}
          <span>hrs</span>
        </div>
        
        <div onClick={minuteFunction}>
          {minute<10?"0"+minute:minute}
          <span>min</span>
        </div>
        
        <div onClick={secondFunction}>
          {second<10?"0"+second:second}
          <span>sec</span>
        </div>
        
        <header className="init">
          <button className={st?"pause":"start"} onClick={start}>{st?"PAUSE":"START"}</button>
          <button className="reset" onClick={reset}>RESET</button>
        </header>
        
      
      </div>

    </div>
  );
}

export default App;
