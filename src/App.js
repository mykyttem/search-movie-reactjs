import './App.css';
import React, { Component } from 'react';
import parseSearch from './parse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      inputValue: '',
    };
  }

  async componentDidMount() {
    const results = await parseSearch();
    this.setState({ results });
  }

  handleSearch = async () => {
    if (this.state.inputValue) {
      const results = await parseSearch(this.state.inputValue);
      this.setState({ results });
    }
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  renderResults = () => {
    const { results } = this.state;
    const data = results && JSON.parse(results);

    if (data && data.data && data.data.d) {
      const items = data.data.d;

      return (
        <div>
          <div className="results-container">
            {items.map((item, index) => (
              <div key={index} className="result-item">
                {item.i && <img src={item.i.imageUrl} alt={item.l} className="poster" />}
                <p className="title">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <p>Loading...</p>;
  }


  render() {
    return (
      <div className="App">
        <input
          autoFocus
          type="text"
          placeholder="Type keyword..."
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />

        <button onClick={this.handleSearch}><i className="fas fa-search"></i>Search</button>

        {this.renderResults()}
      </div>
    );
  }
}

export default App;