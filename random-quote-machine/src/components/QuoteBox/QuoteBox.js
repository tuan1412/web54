import React, { Component } from "react";
import axios from "axios";

import { RefreshCcw } from 'react-feather';

import "./QuoteBox.css";

// onLoad script => gọi API
// click button (event mouse, keyboard) => gọi API

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      status: "idle",
      quote: null,
    };
  }
  // chạy một lần sau khi render lần đầu tiên
  async componentDidMount() {
    this.fetchRandomQuote();
  }

  fetchRandomQuote = async () => {
    try {
      this.setState({ status: "loading" });
      const res = await axios.get("https://api.quotable.io/random");
      const quote = res.data;
      this.setState({
        quote,
        status: "done",
      });
    } catch (err) {
      this.setState({ status: "error" });
    }
  }

  handleRefreshQuote = () => {
    this.fetchRandomQuote();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update QuoteBox", prevProps, prevState);
    console.log("current props", this.props);
    if (this.props.activeColor !== prevProps.activeColor) {
      this.setState({
        title: `Đổi màu từ ${prevProps.activeColor} sang ${this.props.activeColor}`,
      });
    }
  }

  renderQuote = () => {
    const { status, quote } = this.state;
    if (status === "loading" || status === "idle") {
      return <div>Loading...</div>;
    }

    if (status === "error") {
      return <div>Something went wrong</div>;
    }

    return (
      <>
        <div className="content">
          {quote.content}
        </div>
        <div className="author">- {quote.author}</div>
      </>
    );
  };

  renderQuote = () => {
    const { status, quote } = this.state;
    if (status === "loading" || status === "idle") {
      return <div>Loading...</div>;
    }

    if (status === "error") {
      return <div>Something went wrong</div>;
    }

    return (
      <>
        <div className="content">
          {quote.content}
        </div>
        <div className="author">- {quote.author}</div>
      </>
    );
  };

  render() {
    console.log("render QuoteBox");

    const { activeColor } = this.props;

    return (
      <div className="QuoteBox" style={{ color: activeColor }}>
        {this.renderQuote()}
        <div>{this.state.title}</div>
        <div className="newAction">
          <button 
            className="refresh" 
            style={{ backgroundColor: activeColor }} 
            onClick={this.handleRefreshQuote}
          >
            <RefreshCcw size={18} style={{ marginRight: 4 }} />
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
