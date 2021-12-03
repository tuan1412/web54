import React, { Component } from "react";
import Header from "./components/Header";
import ColorPicker from "./components/ColorPicker";
import QuoteBox from "./components/QuoteBox";

import "./App.css";

// Fragment <==> <>
const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen",
];

// để đổi màu được background color của app => cần có biến quản lý màu đấy
// props, state
// nằm cứ cấp App
// tuy nhiên color lại nằm ở Color Picker là con của App

class App extends Component {
  constructor(props) {
    super(props);
    // khai báo được một cái biến để quy định thằng nào active
    this.state = {
      activeColor: colors[0],
    };
  }

  handleActiveColor = (newColor) => {
    // modify directly
    // this.state.activeColor = newColor
    console.log("set state");
    this.setState({
      activeColor: newColor,
    });
  };
  // fetch colors
  render() {
    const { activeColor } = this.state;

    return (
      <div className="App" style={{ backgroundColor: activeColor }}>
        <div className="Header-box">
          <Header title="Random quote machine" />
        </div>
        <div className="Quote-wrapper">
          <QuoteBox activeColor={activeColor} />
        </div>
        <div className="ColorPicker-box">
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            handleActiveColor={this.handleActiveColor}
          />
        </div>
      </div>
    );
  }
}

// để con có thể thay đổi được state cha
// state => cha mới có quyền gọi hàm this.setState
// khai báo ở cha một hàm có this.setState
// đẻ con thể sử dụng được hàm này => truyền hàm này xuống thằng con qua props
// lift state up

export default App;
