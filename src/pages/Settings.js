import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateSettings } from '../actions';
import { getCategories } from '../serviceAPI';
import '../styles/settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.setCategories = this.setCategories.bind(this);
    this.state = {
      categories: [],
      settings: {},
    };
  }

  componentDidMount() {
    this.setCategories();
    this.getSettings();
  }

  getSettings() {
    const { settings } = this.props;
    this.setState({ settings });
  }

  setCategories() {
    getCategories().then((categories) => this.setState({ categories }));
  }

  updateSettings(evt) {
    const { name, value } = evt.target;
    this.setState((state) => ({
      ...state,
      settings: { ...state.settings, [`${name}`]: value },
    }));
  }

  renderInputNumber() {
    const { settings } = this.state;
    const { number } = settings;
    return (
      <label className="label-inputs" htmlFor="inputNumber">
        Number Questions
        <input
          id="inputNumber"
          onChange={(evt) => this.updateSettings(evt)}
          name="number"
          value={number}
          className="inputs inputNumber"
          type="number"
        />
      </label>
    );
  }

  renderSelectCategory() {
    const { settings, categories } = this.state;
    const { category } = settings;
    return (
      <label className="label-inputs" htmlFor="inputCategory">
        Category
        <select
          id="inputCategory"
          onChange={(evt) => this.updateSettings(evt)}
          name="category"
          value={category}
          className="inputs"
        >
          <option>All</option>
          {categories.map((categoryItem) => (
            <option key={categoryItem.id} value={categoryItem.id}>
              {categoryItem.name}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderSelectDifficulty() {
    const { settings } = this.state;
    const { difficulty } = settings;
    return (
      <label className="label-inputs" htmlFor="inputDifficulty">
        Difficulty
        <select
          id="inputDifficulty"
          onChange={(evt) => this.updateSettings(evt)}
          name="difficulty"
          value={difficulty}
          className="inputs"
        >
          <option>All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    );
  }

  renderSelectType() {
    const { settings } = this.state;
    const { type } = settings;
    return (
      <label className="label-inputs" htmlFor="inputType">
        Type
        <select
          id="inputType"
          onChange={(evt) => this.updateSettings(evt)}
          name="type"
          value={type}
          className="inputs"
        >
          <option>All</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True or False</option>
        </select>
      </label>
    );
  }

  renderBtn() {
    const { saveSettings } = this.props;
    const { settings } = this.state;
    return (
      <Link className="link-btn" to="/">
        <button
          onClick={() => saveSettings(settings)}
          className="btn-addSettings"
          type="button"
        >
          Add Settings
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div className="container-main-play">
        <h1 style={{ color: 'white', fontSize: '3rem', padding: '2rem 0' }}>
          Settings
        </h1>
        <div className="container-dropdowns">
          {this.renderInputNumber()}
          {this.renderSelectCategory()}
          {this.renderSelectDifficulty()}
          {this.renderSelectType()}
          {this.renderBtn()}
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
