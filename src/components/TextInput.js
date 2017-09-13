import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '2e885160bf2b4d690e976db0f9de1557' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // run the default query once on initial load
    const query = `MATCH (n)-[r:LINKS_TO]-(f)
      WHERE f.gistId = "${this.state.value}"
      MATCH (n)-[:LINKS_TO]-()-[:LINKS_TO]-(fof)
      RETURN n, fof, f`;
    this.props.getGraphSearch(query);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(
      'this.state.value from QueryForm handleSubmit',
      this.state.value
    );

    const query = `MATCH (n)-[r:LINKS_TO]-(f)
      WHERE f.gistId = "${this.state.value}"
      MATCH (n)-[:LINKS_TO]-()-[:LINKS_TO]-(fof)
      RETURN n, fof, f`;    
    this.props.getGraphSearch(query);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          type="text"
          cols="80"
          rows="1"
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
