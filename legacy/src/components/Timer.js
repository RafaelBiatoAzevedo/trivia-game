import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTime, saveInterval, updateStatus } from '../actions';
import { BsStopwatch } from 'react-icons/bs';
import '../styles/timer.css';

class Timer extends React.Component {
  componentDidMount() {
    const { setTimeProp, saveIntervalProp } = this.props;
    const intervalTime = 1000;
    const interval = setInterval(() => setTimeProp(1), intervalTime);
    saveIntervalProp(interval);
  }

  resetTimer() {
    const { interval, saveIntervalProp, updateStatusProp } = this.props;
    updateStatusProp();
    clearInterval(interval);
    saveIntervalProp(null);
  }

  render() {
    const { time } = this.props;

    if (time === 0) this.resetTimer();

    return (
      <div className="container-timer">
        <BsStopwatch color="#000" size="4rem" />
        {time === 0 ? (
          <p style={{ color: 'red' }}>Finished</p>
        ) : (
          <p style={{ color: time < 10 ? 'red' : 'green' }}>{time}</p>
        )}
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number,
  interval: PropTypes.number,
  setTimeProp: PropTypes.func,
  saveIntervalProp: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  time: state.timer.time,
  interval: state.timer.interval,
});

const mapDispatchToProps = (dispatch) => ({
  setTimeProp: (value) => dispatch(setTime(value)),
  saveIntervalProp: (value) => dispatch(saveInterval(value)),
  updateStatusProp: () => dispatch(updateStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
