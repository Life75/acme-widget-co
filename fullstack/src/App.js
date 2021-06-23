import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: [],
    };

  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = _ => {
    return fetch('http://localhost:3000')
    .then(result => result.json())
    .then(data => {
        console.log(data)
        let newResults = [];
        for(let key in data) {
          if(key === "recordsets") {
            data[key].forEach(arr => {
              arr.forEach(obj => {
                Object.keys(obj).forEach((key) => {
                  newResults.push(obj[key])
                })
              })
            })
          }
        }
        console.log(newResults);
        return data;
    })
  }

  renderCustomer = ({FirstName, LastName, Age}) => <div key={Age}>{FirstName} {LastName}</div>

  render() {
    const {customers} = this.state;
    return (
      <div className="App">
        {customers.map(this.renderCustomer)}
      </div>
    );
  }
}

export default App;
