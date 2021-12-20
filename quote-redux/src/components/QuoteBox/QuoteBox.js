import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RefreshCcw } from 'react-feather';
import { fetchQuotes } from '../../redux/quoteSlice';

import "./QuoteBox.css";

function QuoteBox() {
  const activeColor = useSelector(state => state.color.activeColor);
  const status = useSelector(state => state.quote.status);
  const quote = useSelector(state => state.quote.quote);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchQuotes()) // UI chỉ dispatch một action // action này async action
  }, [dispatch]);

  const handleRefreshQuote = () => {
    dispatch(fetchQuotes())
  }

  const renderQuote = () => {
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

  return (
    <div className="QuoteBox" style={{ color: activeColor }}>
        {renderQuote()}
        <div className="newAction">
          <button 
            className="refresh" 
            style={{ backgroundColor: activeColor }} 
            onClick={handleRefreshQuote}
          >
            <RefreshCcw size={18} style={{ marginRight: 4 }} />
            New Quote
          </button>
        </div>
      </div>
  )  
}



export default QuoteBox;
