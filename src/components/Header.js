import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { name, score, avatar } = this.props;
    return (
      <header className="container-header">
        <img src={avatar} alt="userImage" />
        <div>
          <p>{name}</p>
          <p>{`Score: ${score} pts`}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  avatar: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
