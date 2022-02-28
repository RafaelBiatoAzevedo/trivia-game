import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAsks, resetGame, savePlayer, setStatusGame } from '../actions';
import { createRanking } from '../services/localStorage';
import { getGravatar } from '../services/serviceAPI';
import { Toast } from '../components/Toast';
import '../styles/home.css';

import { BsFillTrophyFill, BsPlayFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      isShowToast: false,
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
  }

  componentDidMount() {
    const { resetGame } = this.props;
    localStorage.setItem('@TriviaGame:player', JSON.stringify({}));
    resetGame();
  }

  goFor = (pageName) => {
    this.props.history.push(`/${pageName}`);
  };

  handleChangeText({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClickPlay = async () => {
    const { username, email } = this.state;
    const { savePlayer, createAsks, settings, setStatusGame } = this.props;

    if (!username || !email) {
      this.setState({ isShowToast: true });
      setTimeout(() => this.setState({ isShowToast: false }), 10000);
    } else {
      setStatusGame(true);
      createAsks(settings);
      getGravatar(email).then((response) => {
        const player = {
          name: username,
          email: email,
          assertions: 0,
          score: 0,
          gravatarEmail: response,
        };
        savePlayer(player);
      });

      createRanking();
      this.goFor('play');
    }
  };

  renderForm() {
    const { username, email } = this.state;

    return (
      <form className="form-login">
        <label
          style={{ color: 'white', fontSize: '1.4rem', fontWeight: '500' }}
          htmlFor="player-name"
        >
          Player Name
        </label>
        <Input
          autoFocus
          placeHolder="Insert nickName"
          textSize="1.4rem"
          type="text"
          name="username"
          value={username}
          onChange={this.handleChangeText}
        />
        <label
          className="margin-horizontal-30"
          style={{ color: 'white', fontSize: '1.4rem', fontWeight: '500' }}
          htmlFor="gravatar-email"
        >
          Gravatar E-mail
        </label>
        <Input
          placeHolder="Insert your email"
          type="text"
          textSize="1.4rem"
          name="email"
          value={email}
          onChange={this.handleChangeText}
          width="30rem"
        />
        <Button
          icon={<BsPlayFill size="2rem" />}
          iconEnd
          title="Play"
          textColor="white"
          textSize="1.6rem"
          textWeight="600"
          type="button"
          withBorder
          onClick={this.handleClickPlay}
        />
      </form>
    );
  }

  render() {
    const { isShowToast } = this.state;

    return (
      <div className="container-main">
        {isShowToast && (
          <Toast
            type="error"
            title="Ops, PlayerName or email invalid !"
            description="Correcty e try again."
          />
        )}
        <div className="container-top">
          {this.renderForm()}
          <Button
            icon={<BsFillTrophyFill size="1.4rem" />}
            title="Ranking"
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={() => this.goFor('ranking')}
          />
          <Button
            icon={<IoMdSettings size="1.8rem" />}
            title="Settings"
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={() => this.goFor('settings')}
          />
        </div>
        <p className="message-home">Test your knowledge</p>
        <h1 className="title-home">GAME</h1>
      </div>
    );
  }
}

Home.propTypes = {
  settings: PropTypes.shape({
    number: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  createAsks: PropTypes.func.isRequired,
  clearAsks: PropTypes.func.isRequired,
  savePlayer: PropTypes.func.isRequired,
  setStatusGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  savePlayer: (player) => dispatch(savePlayer(player)),
  resetGame: () => dispatch(resetGame()),
  createAsks: (settings) => dispatch(createAsks(settings)),
  setStatusGame: (status) => dispatch(setStatusGame(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
