import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  savePlayer,
  saveInterval,
  setTime,
  restartTime,
  updateStatus,
} from '../actions';
import { addPlayerInRanking } from '../services/localStorage';
import { decodeHtml } from '../services/prepareAnswers';
import { CgPlayTrackNextO } from 'react-icons/cg';
import { GiExitDoor } from 'react-icons/gi';

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
    this.setRanking = this.setRanking.bind(this);
  }
  componentDidMount() {
    const { status } = this.props.game;

    if (!status) this.goFor('');
  }

  setRanking() {
    const player = JSON.parse(localStorage.getItem('@TriviaGame:player'));
    addPlayerInRanking(player.gravatarEmail, player);
    this.goFor('feedback');
  }

  goFor = (pageName) => {
    this.props.history.push(`/${pageName}`);
  };

  updateScore(answer) {
    const { game, timer, player, savePlayer } = this.props;
    const { asks } = game;
    const ask = asks.find((askItem) => answer === askItem.correct_answer);
    const { difficulty } = ask;
    const valuePattern = 10;
    const valueDifficulty =
      difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1;
    const scoreAsk = valuePattern + timer.time * valueDifficulty;

    const updatePlayer = { ...player };

    updatePlayer.score += scoreAsk;
    updatePlayer.assertions += 1;

    localStorage.setItem(
      '@TriviaGame:player',
      JSON.stringify({ ...updatePlayer })
    );
    savePlayer(updatePlayer);
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
    const { timer } = this.props;
    const { value } = evt.target;

    this.setState({ answerSelected: true });
    clearInterval(timer.interval);
    if (value) this.updateScore(value);
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

  btnNext() {
    const { asks } = this.props.game;
    const { answerIndex } = this.state;
    const MAX = asks.length - 1;

    if (answerIndex === MAX) {
      return (
        <Button
          className="button-finish"
          icon={<GiExitDoor size="2.8rem" />}
          title="Finish"
          textColor="#3babc4"
          textSize="2rem"
          type="button"
          onClick={this.setRanking}
        />
      );
    }
    return (
      <Button
        className="button-next"
        icon={<CgPlayTrackNextO size="3rem" />}
        title="Next"
        textColor="#49a356"
        textSize="2rem"
        type="button"
        onClick={this.nextQuestion}
      />
    );
  }

  renderAnswers(answers) {
    const { answerIndex, answerSelected } = this.state;
    const { asks } = this.props.game;

    return answers.map((answerElement) => {
      const { answer } = answerElement;

      if (answer === asks[answerIndex].correct_answer) {
        return (
          <Button
            title={decodeHtml(answer)}
            isBtnAnswer
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
          title={decodeHtml(answer)}
          isBtnAnswer
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
    const { game, timer, updateStatusProp } = this.props;
    const { asks } = game;
    const MAX_QUESTIONS = asks.length - 1;

    if (timer.statusFinishTimer) {
      this.setState({ answerSelected: true });
      updateStatusProp();
    }

    return (
      <div className="container-main-play">
        <Header />
        {asks.length > 0 ? (
          <div className="container-ask">
            <h1>{decodeHtml(asks[answerIndex].category)}</h1>
            <h2>{decodeHtml(asks[answerIndex].question)}</h2>
            <div className="container-answers">
              {this.renderAnswers(asks[answerIndex].results)}
            </div>
            <div className="container-btn-next">
              {answerSelected && answerIndex <= MAX_QUESTIONS && this.btnNext()}
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
  game: PropTypes.shape({
    asks: PropTypes.arrayOf(PropTypes.object).isRequired,
    status: PropTypes.bool.isRequired,
  }),
  timer: PropTypes.shape({
    time: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
    statusFinishTimer: PropTypes.bool.isRequired,
  }),
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }),
  savScore: PropTypes.func.isRequired,
  setTimeProp: PropTypes.func.isRequired,
  saveIntervalProp: PropTypes.func.isRequired,
  restartTimeProp: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  game: state.game,
  timer: state.timer,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  savePlayer: (player) => dispatch(savePlayer(player)),
  setTimeProp: (value) => dispatch(setTime(value)),
  saveIntervalProp: (value) => dispatch(saveInterval(value)),
  restartTimeProp: () => dispatch(restartTime()),
  updateStatusProp: () => dispatch(updateStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
