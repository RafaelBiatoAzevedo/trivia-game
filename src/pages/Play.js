import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  saveScore,
  saveInterval,
  setTime,
  restartTime,
  updateStatus,
} from '../actions';
import { addPlayerInRanking } from '../services/localStorage';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { Button } from '../components/Button';
import '../styles/play.css';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      answerSelected: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.styleAnswer = this.styleAnswer.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
  }

  setRanking() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    addPlayerInRanking(player.gravatarEmail, player);
  }

  setReduxAndLocalStorage(answer) {
    const { asks, time } = this.props;
    const ask = asks.find((askItem) => answer === askItem.correct_answer);
    const { difficulty } = ask;
    const valuePattern = 10;
    const valueHard = 3;
    let valueDifficulty = 0;

    if (difficulty === 'hard') valueDifficulty = valueHard;
    else if (difficulty === 'medium') valueDifficulty = 2;
    else valueDifficulty = 1;
    const score = valuePattern + time * valueDifficulty;
    const dataStorage = { ...JSON.parse(localStorage.getItem('state')) };
    dataStorage.player.score += score;
    this.updateScore(dataStorage);
  }

  updateScore(dataStorage) {
    const { savScore } = this.props;
    dataStorage.player.assertions += 1;
    savScore(dataStorage.player.score);
    localStorage.setItem('state', JSON.stringify({ ...dataStorage }));
  }

  styleAnswer(isCorrect) {
    const { answerSelected } = this.state;

    if (answerSelected) {
      if (isCorrect) {
        return { border: '3px solid rgb(6, 240, 15)' };
      } else {
        return { border: '3px solid rgb(255, 0, 0)' };
      }
    }
    return { border: null };
  }

  answerSelected(evt) {
    const { interval } = this.props;
    const { value } = evt.target;

    this.setState({ answerSelected: true });
    clearInterval(interval);
    if (value) this.setReduxAndLocalStorage(value);
  }

  nextQuestion() {
    const { setTimeProp, saveIntervalProp, restartTimeProp } = this.props;
    const { answerIndex } = this.state;
    this.setState({ answerIndex: answerIndex + 1, answerSelected: false });
    restartTimeProp();
    const intervalTime = 1000;
    const interval = setInterval(() => setTimeProp(1), intervalTime);
    saveIntervalProp(interval);
  }

  elementButtonNext() {
    const { asks } = this.props;
    const { answerIndex } = this.state;
    const MAX = asks.length - 1;

    if (answerIndex === MAX) {
      return (
        <Link className="link-feedback" to="/feedback">
          <button
            className="btn-finish"
            onClick={this.setRanking}
            type="button"
            data-testid="btn-next"
          >
            Finish
          </button>
        </Link>
      );
    }
    return (
      <button
        className="btn-next"
        type="button"
        data-testid="btn-next"
        onClick={this.nextQuestion}
      >
        Next
      </button>
    );
  }

  renderAnswers(answers) {
    const { answerIndex, answerSelected } = this.state;
    const { asks } = this.props;

    return answers.map((answerElement) => {
      const { answer } = answerElement;

      if (answer === asks[answerIndex].correct_answer) {
        return (
          <Button
            title={answer}
            textColor="white"
            textSize="1.6rem"
            value={answer}
            disabled={answerSelected}
            type="button"
            style={this.styleAnswer(true)}
            onClick={this.answerSelected}
            withBorder
            padding="1rem 3rem"
          />
        );
      }
      return (
        <Button
          title={answer}
          textSize="1.6rem"
          textColor="white"
          value={''}
          disabled={answerSelected}
          type="button"
          style={this.styleAnswer(false)}
          onClick={this.answerSelected}
          withBorder
          padding="1rem 3rem"
        />
      );
    });
  }

  render() {
    const { answerIndex, answerSelected } = this.state;
    const { asks, statusTimer, updateStatusProp } = this.props;
    const MAX_QUESTIONS = asks.length - 1;

    if (statusTimer) {
      this.setState({ answerSelected: true });
      updateStatusProp();
    }

    return (
      <div className="container-main-play">
        <Header />
        {asks.length > 0 ? (
          <div className="container-ask">
            <h1>{asks[answerIndex].category}</h1>
            <h2>{asks[answerIndex].question}</h2>
            <div className="container-answers">
              {this.renderAnswers(asks[answerIndex].results)}
            </div>
            <div className="container-btn-next">
              {answerSelected &&
                answerIndex <= MAX_QUESTIONS &&
                this.elementButtonNext()}
            </div>
            <Timer />
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    );
  }
}

Play.propTypes = {
  asks: PropTypes.arrayOf(PropTypes.object),
  savScore: PropTypes.func,
  setTimeProp: PropTypes.func,
  saveIntervalProp: PropTypes.func,
  restartTimeProp: PropTypes.func,
  interval: PropTypes.number,
  time: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  asks: state.askAndAnswersReducer,
  interval: state.timer.interval,
  time: state.timer.time,
  statusTimer: state.timer.statusFinishTimer,
});

const mapDispatchToProps = (dispatch) => ({
  savScore: (score) => dispatch(saveScore(score)),
  setTimeProp: (value) => dispatch(setTime(value)),
  saveIntervalProp: (value) => dispatch(saveInterval(value)),
  restartTimeProp: () => dispatch(restartTime()),
  updateStatusProp: () => dispatch(updateStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
