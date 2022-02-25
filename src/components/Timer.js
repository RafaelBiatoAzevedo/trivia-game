import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTime, saveInterval, updateStatus } from '../actions';

class Timer extends React.Component {
  componentDidMount() {
    const { setTimeProp, saveIntervalProp } = this.props;
    const intervalTime = 1000;
    const interval = setInterval(() => setTimeProp(1), intervalTime);
    saveIntervalProp(interval);
  }

  render() {
    const { time, interval, saveIntervalProp, updateStatusProp } = this.props;
    if (time === 0) {
      updateStatusProp();
      clearInterval(interval);
      saveIntervalProp(null);
      return <p className="text-timer">Timer : Finished</p>;
    }
    return <p className="text-timer">{`Timer : ${time}`}</p>;
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
