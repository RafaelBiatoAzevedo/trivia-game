import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/feedback.css';

class MessageFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: JSON.parse(localStorage.getItem('state')).player.assertions,
      score: JSON.parse(localStorage.getItem('state')).player.score,
    };
  }

  render() {
    const valuePattern = 3;
    const { assertions, score } = this.state;
    return (
      <div className="container-feedback">
        <p data-testid="feedback-text">
          {assertions >= valuePattern ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <p data-testid="feedback-total-score">
          <span>{'Score '}</span>
          {score}
        </p>
        {assertions === 0 ? (
          <p data-testid="feedback-total-question">
            Did not get any questions right
          </p>
        ) : (
          <p data-testid="feedback-total-question">
            {`${assertions} questions right`}
          </p>
        )}
        <div className="container-btns-feedback">
          <Link to="/">
            <button
              className="btn-next"
              type="button"
              data-testid="btn-play-again"
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              className="btn-next"
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MessageFeedback;
