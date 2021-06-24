import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

//TODO class HashTable, create a hash datastruct and replace given func for the hashing

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
    this.key = null;
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

  setKey(key) {this.key = key;}
  getKey() {return this.key;}

  
}

//TODO RELATED CONTACTS 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerArr: [],
    };

    this.sqlParser = this.sqlParser.bind(this);
    this.createCustomers = this.createCustomers.bind(this);
    this.placeArrIntoHash = this.placeArrIntoHash.bind(this);
  //  this.placeIntoHash = this.placeIntoHash.bind(this);
    this.getNewHashKey = this.getNewHashKey.bind(this);
    this.onDismiss = this.onDelete.bind(this);
  

  }

  onDelete(customer) {
    //TODO find and delete from hash and database 
    //console.log(customer.getFirstName())
    //var holder = [...this.state.customerArr];
    this.deleteFromHash(customer.getKey())
    //console.log(key);
    //this.setState({customerArr[this.getHashKey(customer,this.customerArr.length)] : null})
  }

  deleteFromHash(key) {
    var holder = [...this.state.customerArr] //needs to be copied over because data is immutable when dealing w/ react 
    holder[key] = null;
    this.setState({customerArr: holder});
    console.log('deleted customer key: ' + key);
    //this.state.customerArr.map((customer) => customer ? console.log('heyo') : null)
    //this.updateList();

  }



  //TODO add adding/removing into hash and db functionality
  placeArrIntoHash(customerHolder, maxSize) {
    maxSize += 100;
    this.customerArr= new Array(maxSize);

    while(customerHolder.length != 0) {
      var customer = customerHolder.pop();
      var key = this.getNewHashKey(customer, maxSize);

      console.log('length: ' + (customer.getFirstName().length + customer.getLastName().length));
      console.log('key: ' + key);
      
      customer.setKey(key);
      this.customerArr[key]=customer;
      console.log(this.customerArr[key].getFirstName());
      this.setState({customerArr : this.customerArr})
    }

  }

//finds an open free hash
//TODO fault with how set up check over later for scalability concerns, works for now
  getNewHashKey(customer, maxSize) {
   var key = maxSize % (customer.getFirstName().length + customer.getLastName().length);
   while(this.state.customerArr[key] != null) {
     key++;
   }
   return key;
  }

//finds the hash in an O(1) search 


/*
  placeIntoHash(customer, maxSize) {
    maxSize += 100;
    this.customerArr = new Array(maxSize);
  }
  */
  //For some reason pop() doesn't work here so had to do weird implementation
  createCustomers(newResults ,numOfInputs) {
    var maxSize =0;
    var customerHolder = [];
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

      customerHolder.push(customer) //places them in array, later can implement a hashtable possibly
      maxSize++;
      //console.log(customer.getFirstName())
      i += numOfInputs;
    }
    this.placeArrIntoHash(customerHolder,maxSize);
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

    const numOfInputs = 8;
    this.createCustomers(newResults, numOfInputs);

  }

  componentDidMount() {
    this.getCustomers();
    
  }

  getCustomers = _ => {
    return fetch('http://localhost:3001')//TODO format into vars
    .then(result => result.json())
    .then(data => {
        this.sqlParser(data);
        console.log(this.state.customerArr.length)
    })
  }






 // renderCustomers = 
  render() {
    //TODO put into a func call later 

    var renderCustomers =
      this.state.customerArr.map((customer) => customer ? 
      <details key={customer.getKey()}>
        <summary>
          {customer.getFirstName()} {customer.getLastName()}
        </summary>
          Name: {customer.getFirstName()}&nbsp;{customer.getLastName()}<br/>
          Description: {customer.getDescription()}<br/>
          Address Line 1: {customer.getAddressOne()}<br/>
          Address Line 2: {customer.getAddressTwo()}<br/>
          City: {customer.getCity()}<br/>
          State: {customer.getState()}<br/>
          Zip: {customer.getZip()}<br/>
          Business Type: {customer.getBusinessType()}<br/>
          <Button 
          onClick={() => this.onDelete(customer)}
  
          >
            Delete
          </Button>
      </details> 
      : null
    )
 

    return (
      <div className="App">
       {renderCustomers}
      </div>
    );
  }
}

const Button = ({onClick, className='defaultButton', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
    >
      {children}
    </button>




export default App;
