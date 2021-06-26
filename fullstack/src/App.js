import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";

const KEY_TOO_BIG = -1;
//TODO class HashTable, create a hash datastruct and replace given func for the hashing

class CustomerContacts {
  constructor() {
    this.firstname ='';
    this.lastname ='';
    this.phoneNum = '';
    this.emailAdd ='';
  }

  //TODO getters and setters 
}

class Customer {
  constructor() {
    this.firstname ='';
    this.lastname = '';
    this.description = '';
    this.addressOne = '';
    this.addressTwo = '';
    this.city = '';
    this.state = '';
    this.businessType = '';
    this.key = null;
    this.id = -1;
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

  setID(id) {this.id = id;}
  getID(id) {return this.id;}

  setKey(key) {this.key = key;}
  getKey() {return this.key;}

  //TODO addCustomerContacts()

  
}

//TODO RELATED CONTACTS 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerArr: [],
      createCustomerSwitch: false,
      firstname: '',
      lastname: '',
      description: '',
      addressLineOne: '',
      addressLineTwo: '',
      City: '',
      State: '',
      Zip: '',
      BusinessType: '',

    };

    this.sqlParser = this.sqlParser.bind(this);
    this.createCustomers = this.createCustomers.bind(this);
    this.placeArrIntoHashFromDB = this.placeArrIntoHashFromDB.bind(this);
  //  this.placeIntoHash = this.placeIntoHash.bind(this);
    this.getNewHashKey = this.getNewHashKey.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.createCustomerButton = this.createCustomerButton.bind(this);
    this.onSubmitCustomer = this.onSubmitCustomer.bind(this);
    


  

  }

  changeHandler= (event) => {
    //console.log(event.target.value);
    if (event.target.name == 'State') {
      console.log('for the state: ' + event.target.value)
    } 

    if (event.target.name == 'fname') {
      console.log('for the first name: ' + event.target.value)
    } 

  }

  onSubmitCustomer = (event) => {
    event.preventDefault();
    //console.log(event.target.value);
    console.log(event.target.name)

    this.setState({createCustomerSwitch: false})
  }


  
  createCustomerButton() {
    this.setState({createCustomerSwitch: true});
    
    var button = document.getElementById('createCustomer');
    console.log('hey')
    button.style.display = "none"

    

  }



 

  onDelete(customer) {
    //TODO find and delete from hash and database 
    //console.log(customer.getFirstName())
    //var holder = [...this.state.customerArr];
    this.deleteFromDB(customer);
    this.deleteFromHash(customer.getKey());
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

  deleteFromDB(customer) {
    fetch(`http://localhost:3001/customer/delete?ID=${customer.getID()}`)
    //.then(response => response.json())
    //.then(this.getCustomers)
    .catch(err => console.error(err))

    //console.log(`http://localhost:3001/customer/delete?Firstname=${customer.getFirstName()}&Lastname=${customer.getLastName()}&Description=${customer.getDescription()}&address_line_1=${customer.getAddressOne()}&address_line_2=${customer.getAddressTwo()}&City=${customer.getCity()}&State=${customer.getState()}&Zip=${customer.getZip()}&Business_type=${customer.getBusinessType()}`)
  }
//
  addToDB(customer) {
    //TODO ADD INTO DATA AND RETRIVE KEY AS WELL AND ADD IT TO THE CUSTOMER 
    
    fetch(`http://localhost:3001/customer/add?Firstname=${customer.getFirstName()}&Lastname=${customer.getLastName()}&Description=${customer.getDescription()}&address_line_1=${customer.getAddressOne()}&address_line_2=${customer.getAddressTwo()}&City=${customer.getCity()}&State=${customer.getState()}&Zip=${customer.getZip()}&Business_type=${customer.getBusinessType()}`)
    
  }

  addCustomerToHash(customer) {

  }



  //TODO add adding/removing into hash and db functionality
  placeArrIntoHashFromDB(customerHolder, maxSize) {
    maxSize += 100;
    this.customerArr= new Array(maxSize);

    while(customerHolder.length != 0) {
      var customer = customerHolder.pop();
      var key = this.getNewHashKey(customer, maxSize);

      console.log('length: ' + (customer.getID()));
      console.log('key: ' + key);
      
      customer.setKey(key);
      this.customerArr[key]=customer;
      console.log(this.customerArr[key].getFirstName());
      this.setState({customerArr : this.customerArr});
    }

  }

//finds an open free hash
//TODO fault with how set up check over later for scalability concerns, works for now
  getNewHashKey(customer, maxSize) {
    var sum =0;
    for(var i=0; i < customer.getID().length; i++) {
      var digit = customer.getID().charCodeAt(i);
      sum += digit;
    }

   var key = maxSize % sum;
   while(this.state.customerArr[key] != null) {
     key++;
     if(key > maxSize) return KEY_TOO_BIG;
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
      customer.setID(newResults[i+9])

      customerHolder.push(customer) //places them in array, later can implement a hashtable possibly
      maxSize++;
      //console.log(customer.getFirstName())
      i += numOfInputs;
    }
    this.placeArrIntoHashFromDB(customerHolder,maxSize);
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

    const numOfInputs = 9;
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
          ID# : {customer.getID()}<br/>
          <Button 
          onClick={() => this.onDelete(customer)}
  
          >
            Delete
          </Button>
      </details> 
      : null
    )




    var renderCreateCustomerButton =
      <Button
      onClick={() => this.createCustomerButton()}
      id='createCustomer'
      >
      Create Customer 
      </Button>




const CustomerFillIn = ({customer}) => 
  <div className='customerFillIn'>
    <form onSubmit={this.onSubmitCustomer}>
    <label
      for='fname'>
    First name:&nbsp; 
    </label> 
    <input
      type='text'
      id='fname'
      name='fname'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='lname'
    >
      Last name:&nbsp;
    </label>
    <input
      type='text'
      id='lname'
      name='lname'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='Description'
    >
      Description:&nbsp; 
    </label>
    <input
      type='text'
      id='description'
      name='description'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='Address_1'
    >
      Address Line 1:&nbsp;
    </label>
    <input
      type='text'
      id='Address_1'
      name='Address_1'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='Address_2'
    >
      Address Line 2:&nbsp;
    </label>
    <input
      type='text'
      id='Address_2'
      name='Address_2'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='City'
    >
      City:&nbsp;
    </label>
    <input
      type='text'
      id='City'
      name='City'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='State'
    >
      State:&nbsp;
    </label>
    <input
      type='text'
      id='State'
      name='State'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='Zip'
    >
      Zip:&nbsp;
    </label>
    <input
      type='text'
      id='Zip'
      name='Zip'
      onChange={this.changeHandler}
    />
    <br></br>

    <label
      for='BusinessType'
    >
      Business Type:&nbsp;
    </label>
    <input
      type='text'
      id='BusinessType'
      name='BusinessType'
      onChange={this.changeHandler}
    />
    <br></br>
    <input
      type='submit'
    />
    </form>
  </div>
 

    return (
      <div className="App">
        {renderCustomers}
        {renderCreateCustomerButton}
        {this.state.createCustomerSwitch ? <CustomerFillIn/> : null}
       
      </div>
    );
  }
}

const Button = ({onClick, className='defaultButton', children, id=''}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
    id={id}
    >
      {children}
    </button>



export default App;
