import React, { Component } from 'react';
import FilledMadlib from './FilledMadlib';
import UnfilledMadlib from './UnfilledMadlib';
import './MadlibForm.css';

export default class extends Component {
  state = {
    fields: this.getFormFieldsFromMadlibText(),
    userValues: [],
    submitted: false,
    started: false,
  };

  getFormFieldsFromMadlibText() {
    function capitalizate(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const fields = [];
    const { inputRegex, madlib } = this.props;
    let result = inputRegex.exec(madlib);
    while (result) {
      fields.push(capitalizate(result[1]));
      result = inputRegex.exec(madlib);
    }
    return fields;
  }

  updateUserValues = (index, value) => {
    this.setState((prevState) => {
      const userValues = [...prevState.userValues];
      userValues[index] = value;
      return ({
        userValues,
      });
    });
  }

  renderHeader = () => (
    <header
      onClick={() => !this.state.started && this.setState({ started: true })}
      className={this.state.started ? 'header-started' : 'header-not-started'}
    >
      Flocabulary Madlib
      {!this.state.started &&
        <div className="sub-header">
          Fill out the form to create your madlib
        </div>
      }
    </header>
  )

  renderForm = () => {
    const newProps = {
      fields: this.state.fields,
      userValues: this.state.userValues,
      updateUserValues: this.updateUserValues,
      onSubmit: () => {
        this.setState({ submitted: true });
      },
    };
    return <UnfilledMadlib {...newProps} />;
  }

  renderResults = () => {
    const newProps = {
      fields: this.state.fields,
      userValues: this.state.userValues,
      madlib: this.props.madlib,
      inputRegex: this.props.inputRegex,
      resetMadlibForm: () => {
        this.setState({ ...this.getInitialState(), started: true });
      },
    };
    return <FilledMadlib {...newProps} />;
  }

  render = () => (
    <div className="madlib-form">
      {this.renderHeader()}
      {this.state.submitted
        ? this.renderResults()
        : this.state.started && this.renderForm()
      }
    </div>
  );
}
