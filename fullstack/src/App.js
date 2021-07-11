import "./App.css";
import React, { Component } from "react";

const KEY_TOO_BIG = -1;
const PATH_BASE = 'http://localhost:3001';
const PATH_CONTACTS = '/contacts';
const PATH_CUSTOMER = '/customer';
const PATH_DELETE = '/delete';
const PATH_ADD = '/add';
const PATH_CASCADE = '/cascade';
const PATH_FIND = '/find';

class CustomerContact {
  constructor() {
    this.firstname = "";
    this.lastname = "";
    this.phoneNum = "";
    this.emailAdd = "";
    this.customerID = "";
  }
  setFirstName(firstname) {
    this.firstname = firstname;
  }
  getFirstName() {
    return this.firstname;
  }

  setLastName(lastname) {
    this.lastname = lastname;
  }
  getLastName() {
    return this.lastname;
  }

  setPhoneNum(phoneNum) {
    this.phoneNum = phoneNum;
  }
  getPhoneNum() {
    return this.phoneNum;
  }

  setEmailAdd(emailAdd) {
    this.emailAdd = emailAdd;
  }
  getEmailAdd() {
    return this.emailAdd;
  }

  setCustomerID(customerID) {
    this.customerID = customerID;
  }
  getCustomerID() {
    return this.customerID;
  }
}

class Customer {
  constructor() {
    this.firstname = "";
    this.lastname = "";
    this.description = "";
    this.addressOne = "";
    this.addressTwo = "";
    this.city = "";
    this.state = "";
    this.businessType = "";
    this.key = null;
    this.id = -1;
  }

  setFirstName(firstname) {
    this.firstname = firstname;
  }
  getFirstName() {
    return this.firstname;
  }

  setLastName(lastname) {
    this.lastname = lastname;
  }
  getLastName() {
    return this.lastname;
  }

  setDescription(desc) {
    this.description = desc;
  }
  getDescription() {
    return this.description;
  }

  setAddressOne(addressOne) {
    this.addressOne = addressOne;
  }
  getAddressOne() {
    return this.addressOne;
  }

  setAddressTwo(addressTwo) {
    this.addressTwo = addressTwo;
  }
  getAddressTwo() {
    return this.addressTwo;
  }

  setCity(city) {
    this.city = city;
  }
  getCity() {
    return this.city;
  }

  setState(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }

  setZip(zip) {
    this.zip = zip;
  }
  getZip() {
    return this.zip;
  }

  setBusinessType(businessType) {
    this.businessType = businessType;
  }
  getBusinessType() {
    return this.businessType;
  }

  setID(id) {
    this.id = id;
  }
  getID() {
    return this.id;
  }

  setKey(key) {
    this.key = key;
  }
  getKey() {
    return this.key;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerArr: [],
      customerContactArr: [],
      createCustomerSwitch: false,
      createContactSwitch: false,

      firstname: "",
      lastname: "",
      description: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      state: "",
      zip: "",
      businessType: "",

      firstnameContact: "",
      lastnameContact: "",
      phoneNumContact: "",
      emailAddContact: "",
      customerID: "",

      check: "",
    };

    this.sqlParser = this.sqlParser.bind(this);
    this.createCustomers = this.createCustomers.bind(this);
    this.placeArrIntoHashFromDB = this.placeArrIntoHashFromDB.bind(this);
    this.getNewHashKey = this.getNewHashKey.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.createCustomerButton = this.createCustomerButton.bind(this);
    this.onSubmitCustomer = this.onSubmitCustomer.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.findCustomerInDB = this.addCustomerToArr.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.addCustomerContact = this.addCustomerContact.bind(this);
    this.deleteAssociatedContacts = this.deleteAssociatedContacts.bind(this);
    this.addCustomerToHash = this.addCustomerToHash.bind(this);
  }

  deleteContactInDb(contact) {
    fetch(
      `${PATH_BASE}${PATH_CUSTOMER}${PATH_CONTACTS}${PATH_DELETE}?Firstname=${contact.getFirstName()}&Lastname=${contact.getLastName()}&Phone_number=${contact.getPhoneNum()}&Email_address=${contact.getEmailAdd()}&customerID=${contact.getCustomerID()}`
    );
  }

  deleteThisContactFromArr(contact) {
    this.setState({
      customerContactArr: [
        ...this.state.customerContactArr.filter(
          (con) =>
            con.getFirstName() !== contact.getFirstName() ||
            con.getLastName() !== contact.getLastName() ||
            con.getPhoneNum() !== contact.getPhoneNum() ||
            con.getCustomerID() !== contact.getCustomerID()
        ),
      ],
    });
  }

  onDeleteContact(contact) {
    this.deleteThisContactFromArr(contact);
    this.deleteContactInDb(contact);
  }

  addCustomerContactToDB(customerContact) {
    fetch(
      `${PATH_BASE}${PATH_CUSTOMER}${PATH_CONTACTS}${PATH_ADD}?Firstname=${customerContact.getFirstName()}&Lastname=${customerContact.getLastName()}&Phone_number=${customerContact.getPhoneNum()}&Email_address=${customerContact.getEmailAdd()}&customerID=${customerContact.getCustomerID()}`
    );
  }

  addCustomerContact(contact) {
    this.addCustomerContactToArr(contact);
    this.addCustomerContactToDB(contact);
  }

  addCustomerContactToArr(contact) {
    this.setState({
      customerContactArr: [...this.state.customerContactArr, contact]
    });
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitContact = (event) => {
    var contact = new CustomerContact();
    contact.setFirstName(this.state.firstnameContact);
    contact.setLastName(this.state.lastnameContact);
    contact.setPhoneNum(this.state.phoneNumContact);
    contact.setEmailAdd(this.state.emailAddContact);
    contact.setCustomerID(this.state.customerID);

    this.addCustomerContact(contact);

    var button = document.getElementById("createContact");
    button.style.display = "inline";

    this.setState({ createContactSwitch: false });
    this.setState({
      firstnameContact: "",
      lastnameContact: "",
      phoneNumContact: "",
      emailAddContact: "",
      customerID: "",
    });

    event.preventDefault();
  };

  onSubmitCustomer = (event) => {
    var customer = new Customer();
    customer.setFirstName(this.state.firstname);
    customer.setLastName(this.state.lastname);
    customer.setDescription(this.state.description);
    customer.setAddressOne(this.state.addressLineOne);
    customer.setAddressTwo(this.state.addressLineTwo);
    customer.setCity(this.state.city);
    customer.setState(this.state.state);
    customer.setZip(this.state.zip);
    customer.setBusinessType(this.state.businessType);

    this.addCustomer(customer);

    var button = document.getElementById("createCustomerBtn");
    button.style.display = "inline";
    
    //clear contents
    this.setState({ createCustomerSwitch: false });
    this.setState({
      firstname: "",
      lastname: "",
      description: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      state: "",
      zip: "",
      businessType: "",
    });
    event.preventDefault();
  };

  createCustomerButton() {
    this.setState({ createCustomerSwitch: true });

    var button = document.getElementById("createCustomerBtn");
    button.style.display = "none";
  }

  createContactSwitch(customerID) {
    this.setState({ createContactSwitch: true });
    this.setState({ customerID: customerID });

    var button = document.getElementById("createContact");
    button.style.display = "none";
  }

  addCustomerToHash(customer) {
    var holder = [...this.state.customerArr];
    var key = this.getNewHashKey(
      customer.getID(),
      this.state.customerArr.length
    );

    customer.setKey(key);
    holder[key] = customer;
    this.setState({ customerArr: holder });
  }

  addCustomer(customer) {
    this.addCustomerToDB(customer);
    this.addCustomerToArr(customer);
  }

  deleteCascadeContactsArr(customer) {
    this.setState({
      customerContactArr: [
        ...this.state.customerContactArr.filter(
          (con) => con.getCustomerID() !== customer.getID()
        ),
      ],
    });
  }

  deleteCascadeContactsDB(customer) {
    fetch(
      `${PATH_BASE}${PATH_CUSTOMER}${PATH_CONTACTS}${PATH_CASCADE}${PATH_DELETE}?customerID=${customer.getID()}`
    );
  }

  deleteAssociatedContacts(customer) {
    //Delete from array
    this.deleteCascadeContactsArr(customer);
    this.deleteCascadeContactsDB(customer);
  }

  onDelete(customer) {
    this.deleteAssociatedContacts(customer);
    this.deleteFromDB(customer);
    this.deleteFromHash(customer.getKey());
  }

  deleteFromHash(key) {
    var holder = [...this.state.customerArr]; //needs to be copied over because data is immutable when dealing w/ react
    holder[key] = null;
    this.setState({ customerArr: holder });
  }

  deleteFromDB(customer) {
    fetch(`${PATH_BASE}${PATH_CUSTOMER}${PATH_DELETE}?ID=${customer.getID()}`).catch(
      (err) => console.error(err)
    );
  }

 async addCustomerToDB(customer) {
    fetch(
      `${PATH_BASE}${PATH_CUSTOMER}${PATH_ADD}?Firstname=${customer.getFirstName()}&Lastname=${customer.getLastName()}&Description=${customer.getDescription()}&address_line_1=${customer.getAddressOne()}&address_line_2=${customer.getAddressTwo()}&City=${customer.getCity()}&State=${customer.getState()}&Zip=${customer.getZip()}&Business_type=${customer.getBusinessType()}`
    ).catch((err) => console.error(err));
    
    //Need time to place data in DB 
    await new Promise((resolve, reject) => setTimeout(resolve, 300));
  }
  //find the customer ID made first then adds into the hash
  async addCustomerToArr(customer) {
    let response = await fetch(
      `${PATH_BASE}${PATH_CUSTOMER}${PATH_FIND}?Firstname=${customer.getFirstName()}&Lastname=${customer.getLastName()}&Description=${customer.getDescription()}&address_line_1=${customer.getAddressOne()}&address_line_2=${customer.getAddressTwo()}&City=${customer.getCity()}&State=${customer.getState()}&Zip=${customer.getZip()}&Business_type=${customer.getBusinessType()}`
    );
    let result = await response.json();
    
    var id = null;
    var attempts = 0
    
    while(id == null) {
      await new Promise((resolve, reject) => setTimeout(resolve, 500));
      
      attempts++;
      
      let respondAgain = await fetch(
        `${PATH_BASE}${PATH_CUSTOMER}${PATH_FIND}?Firstname=${customer.getFirstName()}&Lastname=${customer.getLastName()}&Description=${customer.getDescription()}&address_line_1=${customer.getAddressOne()}&address_line_2=${customer.getAddressTwo()}&City=${customer.getCity()}&State=${customer.getState()}&Zip=${customer.getZip()}&Business_type=${customer.getBusinessType()}`
      );

      id  = this.sqlParser(result)[0];
      result = await respondAgain.json();
      
      if (attempts >= 3) break; 
    }
   
    this.setState({ check: id });
    if(this.state.check == null) {
      this.state.check = 'default';
    }
    
    customer.setID(this.state.check);
    this.addCustomerToHash(customer);
  }

  placeArrIntoHashFromDB(customerHolder, maxSize) {
    maxSize += 9000;
    this.customerArr = new Array(maxSize);
    this.setState({ customerArr: this.customerArr });

    while (customerHolder.length !== 0) {
      var customer = customerHolder.pop();
      var key = this.getNewHashKey(customer.getID(), maxSize);

      customer.setKey(key);
      this.customerArr[key] = customer;
    }

    this.setState({ customerArr: this.customerArr });
  }

  //finds an open free hash
  getNewHashKey(customerID, maxSize) {
    var key = this.hashKey(customerID);

    while (this.state.customerArr[key] != null) {
      key++;
      if (key > maxSize) return KEY_TOO_BIG;
    }
    return key;
  }

  hashKey(customerID) {
    var sum = 0;

    for (var i = 0; i < customerID.length; i++) {
      var digit = customerID.charCodeAt(i);
      sum += digit;
    }

    var key = sum % this.state.customerArr.length;
    return key;
  }

  //finds the hash in an O(1) search
  createCustomers(newResults) {
    var maxSize = 0;
    var customerHolder = [];

    while (newResults.length > 0) {
      var customer = new Customer();

      customer.setFirstName(newResults.shift());
      customer.setLastName(newResults.shift());
      customer.setDescription(newResults.shift());
      customer.setAddressOne(newResults.shift());
      customer.setAddressTwo(newResults.shift());
      customer.setCity(newResults.shift());
      customer.setState(newResults.shift());
      customer.setZip(newResults.shift());
      customer.setBusinessType(newResults.shift());
      customer.setID(newResults.shift());

      customerHolder.push(customer);
      maxSize++;
    }

    this.placeArrIntoHashFromDB(customerHolder, maxSize);
  }

  //parses recordsets data incoming from DB
  sqlParser(data) {
    var newResults = [];
    for (let key in data) {
      if (key === "recordsets") {
        data[key].forEach((arr) => {
          arr.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
              newResults.push(obj[key]);
            });
          });
        });
      }
    }
    return newResults;
  }

  componentDidMount() {
    this.getCustomers();
    this.getContacts();
  }

  getCustomers = (_) => {
    return fetch(`${PATH_BASE}`) 
      .then((result) => result.json())
      .then((data) => {
        this.createCustomers(this.sqlParser(data));
      });
  };

  getContacts = (_) => {
    return fetch(`${PATH_BASE}${PATH_CONTACTS}`)
      .then((result) => result.json())
      .then((data) => {
        this.initContactsParser(this.sqlParser(data));
      });
  };

  initContactsParser(data) {
    while (data.length > 0) {
      var contact = new CustomerContact();

      contact.setFirstName(data.shift());
      contact.setLastName(data.shift());
      contact.setPhoneNum(data.shift());
      contact.setEmailAdd(data.shift());
      contact.setCustomerID(data.shift());
      this.setState({
        customerContactArr: [...this.state.customerContactArr, contact],
      });
    }
  }

  findHashKey(customerID) {
    var key = this.hashKey(customerID);

    if (this.state.customerArr[key] != null) {
      while (this.customerArr[key].getID() !== customerID) {
        key++;

        if (key > this.customerArr.length) {
          return KEY_TOO_BIG;
        }
      }
      return key;
    } else return KEY_TOO_BIG;
  }

  render() {
    var renderCreateCustomerButton = (
      <Button onClick={() => this.createCustomerButton()} id="createCustomerBtn" className="createCustomerBtn">
        Create Customer 
      </Button>
    );

    var renderCustomers = this.state.customerArr.map((customer) =>
      customer ? (
        <div className= 'renderCustomers'>
          <details key={customer.getID()}>
            <summary>
              {customer.getFirstName()} {customer.getLastName()}
            </summary>
            Name: {customer.getFirstName()}&nbsp;{customer.getLastName()}
            <br />
            Description: {customer.getDescription()}
            <br />
            Address Line 1: {customer.getAddressOne()}
            <br />
            Address Line 2: {customer.getAddressTwo()}
            <br />
            City: {customer.getCity()}
            <br />
            State: {customer.getState()}
            <br />
            Zip: {customer.getZip()}
            <br />
            Business Type: {customer.getBusinessType()}
            <br />
            ID#: {customer.getID()}
            <br />
            <br />
            {customer.getFirstName()}'s Contacts: <br />
            {this.state.customerContactArr.map((contact) =>
              contact.getCustomerID() === customer.getID() ? (
                <div>
                  <details>
                    <summary>
                      {contact.getFirstName()}&nbsp;{contact.getLastName()}
                      <br />
                    </summary>
                    Phone Number: {contact.getPhoneNum()}
                    <br />
                    Email Address: {contact.getEmailAdd()}
                    <br />
                    <Button onClick={() => this.onDeleteContact(contact)}>
                      Delete Contact
                    </Button>
                  </details>
                </div>
              ) : null
            )}
            <Button
              onClick={() => this.createContactSwitch(customer.getID())}
              id="createContact"
            >
              Add Contact
            </Button>
            <Button onClick={() => this.onDelete(customer)}>
              Delete Customer
            </Button>
          </details>
        </div>
      ) : null
    );

    var header =
     <div className='header'>
       <h1>ACME Widgets Rolodex</h1>
     </div>
                

    return (
      <div className="App">
        {header}
        {renderCreateCustomerButton}
        {this.state.createCustomerSwitch ? (
          <div className="customerFillIn">
            <form onSubmit={this.onSubmitCustomer}>
              <label htmlFor="fname">First name:&nbsp;</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                value={this.state.firstname}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>Last name:&nbsp;</label>
              <input
                type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>Description:&nbsp;</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>Address Line 1:&nbsp;</label>
              <input
                type="text"
                name="addressLineOne"
                value={this.state.addressLineOne}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>Address Line 2:&nbsp;</label>
              <input
                type="text"
                name="addressLineTwo"
                value={this.state.addressLineTwo}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>City:&nbsp;</label>
              <input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>State:&nbsp;</label>
              <input
                type="text"
                name="state"
                value={this.state.state}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>Zip:&nbsp;</label>
              <input
                type="text"
                name="zip"
                value={this.state.zip}
                onChange={this.changeHandler}
              />
              <br></br>

              <label>Business Type:&nbsp;</label>
              <input
                type="text"
                name="businessType"
                value={this.state.businessType}
                onChange={this.changeHandler}
              />
              <br></br>
              <input type="submit" />
            </form>
          </div>
        ) : null}
        {this.state.createContactSwitch ? (
          <div className="contactFillin">
            <form onSubmit={this.onSubmitContact}>
              <label htmlFor="fnameContact">First name:&nbsp;</label>
              <input
                type="text"
                id="fnameContact"
                name="firstnameContact"
                value={this.state.firstnameContact}
                onChange={this.changeHandler}
              />
              <br />

              <label htmlFor="lastnameContact">Last name:&nbsp;</label>
              <input
                type="text"
                name="lastnameContact"
                value={this.state.lastnameContact}
                onChange={this.changeHandler}
              />
              <br />

              <label htmlFor="phoneNumContact">Phone Number:&nbsp;</label>
              <input
                type="text"
                name="phoneNumContact"
                value={this.state.phoneNumContact}
                onChange={this.changeHandler}
              />
              <br />

              <label htmlFor="emailAddContact">Email Address:&nbsp;</label>
              <input
                type="text"
                name="emailAddContact"
                value={this.state.emailAddContact}
                onChange={this.changeHandler}
              />
              <br />

              <input type="submit" />
            </form>
          </div>
        ) : null}
        {renderCustomers}
      </div>
    );
  }
}

const Button = ({
  onClick,
  className = "btn from-top",
  children,
  id = "",
}) => (
  <button onClick={onClick} className={className} type="button" id={id}>
    {children}
  </button>
);

export default App;
