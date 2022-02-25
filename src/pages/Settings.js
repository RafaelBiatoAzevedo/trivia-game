import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FaArrowLeft } from 'react-icons/fa';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { DropDown } from '../components/DropDown';
import { updateSettings } from '../actions';
import { getCategories } from '../serviceAPI';
import '../styles/settings.css';

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const TYPES_QUESTIONS = [
  { id: 'multiple', name: 'Multiple choice' },
  { id: 'boolean', name: 'True or False' },
];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = this.initialState.bind(this);
    this.state = {
      categories: [],
      settings: {},
    };
  }

  componentDidMount() {
    this.initialState();
  }

  goFor = (pageName) => {
    this.props.history.push(`/${pageName}`);
  };

  initialState() {
    const { settings } = this.props;
    this.setState({ settings });
    getCategories().then((categories) => this.setState({ categories }));
  }

  updateSettings(evt) {
    const { name, value } = evt.target;
    let valueValid = null;
    if (name === 'number' && value > 50) valueValid = 50;

    this.setState((state) => ({
      ...state,
      settings: { ...state.settings, [`${name}`]: valueValid || value },
    }));
  }

  render() {
    const { settings, categories } = this.state;
    const { number, category, difficulty, type } = settings;

    return (
      <div className="container-main-play">
        <h1 style={{ color: 'white', fontSize: '3rem', padding: '2rem 0' }}>
          Settings
        </h1>
        <div className="container-btns">
          <Button
            icon={<FaArrowLeft size="1.6rem" />}
            title="Home"
            textSize="1.4rem"
            textColor="white"
            textWeight="600"
            onClick={() => this.goFor('')}
          />
        </div>
        <div className="container-settings">
          <label htmlFor="inputNumber">Number Questions</label>
          <Input
            width="100%"
            textSize="1.6rem"
            type="number"
            name="number"
            min={1}
            max={50}
            value={number}
            onChange={(evt) => this.updateSettings(evt)}
          ></Input>
          <label className="label-inputs" htmlFor="inputCategory">
            Categories
          </label>
          <DropDown
            items={categories}
            name="category"
            value={category}
            onChange={(evt) => this.updateSettings(evt)}
          ></DropDown>
          <label className="label-inputs" htmlFor="inputCategory">
            Difficulties
          </label>
          <DropDown
            items={DIFFICULTIES}
            name="difficulty"
            value={difficulty}
            onChange={(evt) => this.updateSettings(evt)}
          ></DropDown>
          <label className="label-inputs" htmlFor="inputCategory">
            Type Questions
          </label>
          <DropDown
            items={TYPES_QUESTIONS}
            name="type"
            value={type}
            onChange={(evt) => this.updateSettings(evt)}
          ></DropDown>
          <div className="container-btns">
            <Button
              title="Reset default"
              textColor="#fff"
              textSize="1.6rem"
              textWeight="600"
            ></Button>
            <Button
              title="Save settings"
              textColor="#fff"
              textSize="1.6rem"
              textWeight="600"
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.objectOf(),
  saveSettings: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (value) => dispatch(updateSettings(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
