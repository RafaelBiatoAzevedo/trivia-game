import React from 'react';
import Header from '../components/Header';
import MessageFeedback from '../components/MenssageFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div className="container-main-play">
        <Header />
        <MessageFeedback />
      </div>
    );
  }
}

export default Feedback;
