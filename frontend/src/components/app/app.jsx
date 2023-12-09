
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 idle_animation.glb 
*/

/* eslint-disable */

import Model from './Idle_animation'
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const req = {
      text: inputValue
    }

    fetch('http://localhost:5000/api/v1/price/test', {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      console.log("Response data: ", data);
    }).catch((err) => {
      console.log("Error: ", err);
    })
  };

  return <div style={{ height: "100vh", display: 'flex', justifyContent: "center", padding: '50px', alignItems: 'center' }}>
    <div style={{ height: "calc(100vh - 100px)", display: 'flex', alignItems: "end" }}>
      <div style={{ width: '300px', height: '70vh' }}>
        <Canvas>
          <Model />
        </Canvas>
      </div>
    </div>
    <div style={{ paddingBottom: "140px" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Type something:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
}

export { App };