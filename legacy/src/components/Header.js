import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail: avatar } = this.props.player;
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
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }),
};

export default connect(mapStateToProps)(Header);
