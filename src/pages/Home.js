import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncToken, loginAction } from '../actions';
import { createRanking } from '../services/localStorage';
import { getGravatar } from '../serviceAPI';
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
    };
    this.handleChangeText = this.handleChangeText.bind(this);
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

  handleClickPlay() {
    const { username, email } = this.state;

    if (!username || !email) {
      alert('Ops, Insert PlayerName e Email for play !!!');
      return;
    }

    const { loginActionFunc, saveToken, settings } = this.props;
    saveToken(settings);
    loginActionFunc(username, email);
    getGravatar(email).then((response) => {
      const player = {
        player: {
          name: username,
          assertions: 0,
          score: 0,
          gravatarEmail: response.url,
        },
      };
      localStorage.setItem('state', JSON.stringify(player));
    });
    createRanking();
    this.goFor('play');
  }

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
          type="submit"
          withBorder
          onClick={() => this.handleClickPlay()}
        />
      </form>
    );
  }

  render() {
    return (
      <div className="container-main">
        <div className="container-top">
          {this.renderForm()}
          <Button
            icon={<BsFillTrophyFill size="1.4rem" />}
            title="Ranking"
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={() => this.goFor('ranking')}
          ></Button>
          <Button
            icon={<IoMdSettings size="1.8rem" />}
            title="Settings"
            textColor="white"
            textWeight="600"
            textSize="1.6rem"
            onClick={() => this.goFor('settings')}
          ></Button>
        </div>
        <p className="message-home">Test your knowledge</p>
        <h1 className="title-home">GAME</h1>
      </div>
    );
  }
}

Home.propTypes = {
  saveToken: PropTypes.func.isRequired,
  loginActionFunc: PropTypes.func.isRequired,
  settings: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  saveToken: (value) => dispatch(asyncToken(value)),
  loginActionFunc: (username, email) => dispatch(loginAction(username, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
