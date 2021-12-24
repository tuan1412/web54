import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Header from "./components/Header";
import ColorPicker from "./components/ColorPicker";
import QuoteBox from "./components/QuoteBox";
import { resetActiveColor } from './redux/colorSlice';

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const activeColor = useSelector(state => state.color.activeColor )
  return (
    <div className="App" style={{ backgroundColor: activeColor }}>
    <div className="Header-box">
      <Header title="Random quote machine" />
    </div>
    <div className="Quote-wrapper">
      <QuoteBox />
    </div>
    <div className="ColorPicker-box">
      <ColorPicker />
    </div>
    <div>
      <button onClick={() => {
        dispatch(resetActiveColor())
      }}>Reset</button>
    </div>
  </div>
  )
}


export default App;
