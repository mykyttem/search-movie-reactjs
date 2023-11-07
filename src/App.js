import './App.css';
import React, { Component } from 'react';
import parseSearch from './parse';
import Modal from './Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      inputValue: '',
      selectedItem: null,
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

  // open modal window     
  openModal = (item) => {
    this.setState({ selectedItem: item });
  }

  // close
  closeModal = () => {
    this.setState({ selectedItem: null });
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
              // results
              <div key={index} className="result-item">

                {item.i && <img src={item.i.imageUrl} alt={item.l} className="poster" />}
                <p className="title">{item.l}</p>
                <button onClick={() => this.openModal(item)}>More</button> 

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

        {this.state.selectedItem && (
          // show model window, if selectedItem not null
          <Modal item={this.state.selectedItem} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;