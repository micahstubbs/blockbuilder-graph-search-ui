import React from 'react';

export default class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultQuery };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('this.state.value from QueryForm handleSubmit', this.state.value);
    this.props.getGraphSearch(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          type="text"
          cols="200"
          rows="5"
          autoComplete="on"
          autoFocus="true"
          spellCheck="false"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Search the Graph" />
      </form>
    );
  }
}
