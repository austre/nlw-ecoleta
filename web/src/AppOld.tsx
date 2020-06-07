import React,{useState} from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [counter,setCounter]=useState(0);

  function handleButtomClick(){
    setCounter(counter+1);
  }
  return (
    <div>
      <Header title={`Contador: ${counter}`} />
      
      <h1>{counter*2}</h1>
      <button type="button" onClick={handleButtomClick}>Aumentar</button>
    </div>
  );
}

export default App;
