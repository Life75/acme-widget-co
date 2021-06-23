import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

class Customer {
  constructor() {
    this.firstname ='';
    this.lastname = '';
    this.description = '';
    this.addressOne = '';
    this.addressTwo = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.businessType = '';
  }

  setFirstName(firstname) {this.firstname = firstname;}
  getFirstName() {return this.firstname;}

  setLastName(lastname) {this.lastname=lastname;}
  getLastName() {return this.lastname;}

  setDescription(desc) {this.description = desc;}
  getDescription() {return this.description;}

  setAddressOne(addressOne) {this.addressOne = addressOne;}
  getAddressOne() {return this.addressOne;}

  setAddressTwo(addressTwo) {this.addressTwo = addressTwo;}
  getAddressTwo() {return this.addressTwo};

  setCity(city) {this.city = city;}
  getCity() {return this.city;}

  setState(state) {this.state = state;}
  getState() {return this.state;}

  setZip(zip) {this.zip = zip;}
  getZip() {return this.zip;}

  setBusinessType(businessType) {this.businessType = businessType;}
  getBusinessType() {return this.businessType;}




  




}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerArr: [],
    };

    this.sqlParser = this.sqlParser.bind(this);
  }

  //parses and places into customer objects and return a customer object array from init database input 
  sqlParser(data) {
    var newResults = [];
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
    //For some reason pop() doesn't work here so had to do weird implementation
    const numOfInputs = 8;
    for(var i=0; i < newResults.length; i++) {
      var customer = new Customer();
      
      customer.setFirstName(newResults[i])
      customer.setLastName(newResults[i+1])
      customer.setDescription(newResults[i+2])
      customer.setAddressOne(newResults[i+3])
      customer.setAddressTwo(newResults[i+4])
      customer.setCity(newResults[i+5])
      customer.setState(newResults[i+6])
      customer.setZip(newResults[i+7])
      customer.setBusinessType(newResults[i+8])

      this.state.customerArr.push(customer); //places them in array, later can implement a hashtable possibly
      console.log(customer.getFirstName())
      i += numOfInputs;
    }
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = _ => {
    return fetch('http://localhost:3001')
    .then(result => result.json())
    .then(data => {
        return this.sqlParser(data);
    })
  }


  //renderCustomer = ({FirstName, LastName, Age}) => <div key={Age}>{FirstName} {LastName}</div>

  render() {
    const {customers} = this.state;
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
