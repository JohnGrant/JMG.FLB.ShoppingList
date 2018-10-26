import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', cart: ['bananas', 'soap', 'water'], list: ['cottage cheese', 'toothpaste'] };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    event.preventDefault();
  }

  handleSubmit = (event) => {
    let value = this.state.value;
    if (this.state.value.length === 0) {
      alert('Enter item name.');
    }
    else if (this.state.list.indexOf(value) > -1) {
      alert('Item ' + value + ' already in shopping list.');
    } else if (this.state.cart.indexOf(value) > -1) {
      alert('Item ' + value + ' already in cart.');
    } else {
      let list = this.state.list;
      list = [value, ...list];
      this.setState({ list, value: '' });
    }
    event.preventDefault();
  }

  handleCartClick = (event) => {
    const item = event.target.dataset.value;
    const list = [item, ...this.state.list];
    const cart = this.state.cart.filter(s => s !== item);
    this.setState({ list, cart });
  }

  handleListClick = (event) => {
    const item = event.target.dataset.value;
    const cart = [item, ...this.state.cart];
    const list = this.state.list.filter(s => s !== item);
    this.setState({ list, cart });
  }

  render() {
    return (
      <div class="container-fluid">
        <header>
          <h1>Shopping List</h1>
        </header>
        <section>
          <header>
            <h2>New Item</h2>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label style={{display: 'none'}} htmlFor="new-item">Item:</label>
                <input className='form-control' id="new-item" type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                <input className='btn btn-primary' type="submit" value="Submit" />
              </div>
            </form>
          </header>
        </section>
        <section>
          <header>
            <h2>In Cart</h2>
            <ul className='list-group'>
              {this.state.cart.map(s => <li className='list-group-item' data-value={s} onClick={this.handleCartClick}>{s}</li>)}
            </ul>
          </header>
        </section>
        <section>
          <header>
            <h2>Need to Buy</h2>
            <ul className='list-group'>
              {this.state.list.map(s => <li className='list-group-item' data-value={s} onClick={this.handleListClick}>{s}</li>)}
            </ul>
          </header>
        </section>
      </div>
    );
  }
}

export default App;