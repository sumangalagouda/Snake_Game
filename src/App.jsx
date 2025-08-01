import Button from './Components/Button.jsx';
import Food from './Components/Food.jsx';
import Menu from './Components/Menu.jsx';
import Snake from './Components/Snake.jsx';

import './App.css';

import React,{useState,useEffect,useRef} from 'react';

const randomFood=()=>{
  let min=0;
  let max=98;
 let x=Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y=Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y];
};
function App() {
      const [snakeDot,setSnakeDot]=useState([[0,0],[0,2],]);
      const [food,setFood]=useState(randomFood());
      const [route,setRoute]=useState("menu");
      const [speed,setSpeed]=useState(100);
      const [direction,setDirection]=useState("RIGHT");

      const intervalRef=useRef(null);

      useEffect(()=>{
        if(route==="game"){
          intervalRef.current=setInterval(moveSnake,speed);
          return ()=>clearInterval(intervalRef.current);
        }
      },[route,speed,snakeDot]);
      useEffect(()=>{
        const handleKey=(e)=>{
          switch(e.keyCode){
            case 37:setDirection("LEFT");break;
            case 38:setDirection("UP");break;
            case 39:setDirection("RIGHT");break;
            case 40:setDirection("DOWN");break;
          }
        }
        document.addEventListener("keydown",handleKey);
        return ()=>document.removeEventListener("keydown",handleKey);
      },[]);

      const moveSnake=()=>{
        const newDots=[...snakeDot];
        let head=newDots[newDots.length-1];
        switch(direction){
          case "LEFT" : head  = [head[0]-2,head[1]];break;
          case "RIGHT": head  = [head[0]+2,head[1]];break;
          case "UP"   : head  = [head[0],head[1]-2];break;
          case "DOWN" : head  = [head[0],head[1]+2];break;
        }
        newDots.push(head);
        newDots.shift();
        setSnakeDot(newDots);

        handleHitWall(head);
        handleHitItself(newDots);
        handleEatFood(head);
      }

      const handleHitWall=(head)=>{
        if(head[0]>=100 || head[1]>=100 || head[0]<0 || head[1]<0){
          gameOver();
        }
      };
      const handleHitItself=(newDots)=>{
        const head=newDots[newDots.length-1];
        let body=newDots.slice(0,-1);
        body.forEach((newDots)=>{
          if(head[0]===newDots[0] && head[1]===newDots[1]){
            gameOver();
          }
        })
      }

      const handleEatFood=(head)=>{
        if(head[0]===food[0]&& head[1]===food[1]){
          setFood(randomFood());
          growSnake();
          if(speed>10){
            setSpeed(speed-10);
          }
        }
      }

      const growSnake=()=>{
        const newDots=[...snakeDot];
        newDots.unshift([]);
        setSnakeDot(newDots);
      }

      const gameOver=()=>{
        alert(`Game is over Your Score is ${snakeDot.length-2}`);
        setSnakeDot([[0,0],[0,2],]);
        setFood(randomFood());
        setRoute("menu");
        setDirection("RIGHT");
        setSpeed(100);
      }
  const moveUp = () => setDirection("UP");
  const moveDown = () => setDirection("DOWN");
  const moveLeft = () => setDirection("LEFT");
  const moveRight = () => setDirection("RIGHT");

  return (
<div>
  {
  route==="menu"?
  (
     <Menu OnRouteChange={()=>setRoute("game")}/>
  ):(
    <div>
      <div className="game-area">
      <Snake snakeDot={snakeDot}/>
      <Food dot={food}/>
      </div>
<Button onUp={moveUp} onDown={moveDown} onLeft={moveLeft} onRight={moveRight} />
    </div>
  )}
</div>
  );
}
export default App;