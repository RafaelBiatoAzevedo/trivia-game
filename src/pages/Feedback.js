import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/feedback.css';

import { Button } from '../components/Button';
import { BsFillTrophyFill, BsPlayFill } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import { createAsks, savePlayer } from '../actions';

class Feedback extends React.Component {
  messageAssertions = () => {
    const { player, settings } = this.props;
    const { assertions } = player;
    const { number: quantityQuestion } = settings;

    if (assertions === 0) return "Ops !!!, You didn't get any questions right";
    if (assertions === quantityQuestion) return 'Excellent !!!, Keep it up';
    if (assertions > Math.ceil(quantityQuestion / 2))
      return 'Very good !!!, But you can be improved';
    if (assertions === Math.ceil(quantityQuestion / 2))
      return 'Good !!!, You are in the average';
    else return 'Bad !!!, you have a lot to improve';
  };

  goFor = (pageName) => {
    this.props.history.push(`/${pageName}`);
  };

  playAgain = () => {
    const { createAsks, settings, savePlayer, player } = this.props;
    const resetPlayer = { ...player, score: 0, assertions: 0 };

    savePlayer(resetPlayer);
    createAsks(settings);
    this.goFor('play');
  };

  render() {
    const { player, settings } = this.props;
    const { name, gravatarEmail, score, assertions } = player;
    const { number: quantityQuestion } = settings;

    return (
      <div className="container-feedback">
        <h1 style={{ color: 'white', fontSize: '3rem', padding: '2rem 0' }}>
          Results
        </h1>
        <img src={gravatarEmail} alt="avatarImage"></img>
        <h2>{name}</h2>
        <p>{this.messageAssertions()}</p>
        <p>{`Correct Questions:  ${assertions}/${quantityQuestion} - ${
          (assertions / quantityQuestion) * 100
        }%`}</p>
        <h1 className="score">{`${score}  pts`}</h1>
        <div>
          <Button
            title="Home"
            icon={<HiHome size="1.6rem" />}
            withBorder
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={() => this.goFor('')}
          />
          <Button
            title="Play Again"
            icon={<BsPlayFill size="1.6rem" />}
            withBorder
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={this.playAgain}
          />
          <Button
            title="Ranking"
            icon={<BsFillTrophyFill size="1.4rem" />}
            withBorder
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={() => this.goFor('ranking')}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  createAsks: (settings) => dispatch(createAsks(settings)),
  savePlayer: (player) => dispatch(savePlayer(player)),
});

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }),
  settings: PropTypes.shape({
    number: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  createAsks: PropTypes.func.isRequired,
  savePlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
