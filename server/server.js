var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());

var sql = require("mssql");
const port = 3001;


//settings to connecting to DB
var config = {
  user: "sa",
  password: "sa",
  server: "localhost",
  database: "Customer",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

var server = app.listen(port, function () {
  console.log("Server is running..");
});

app.get("/", function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    var request = new sql.Request();

    request.query("select * from tb_customer", function (err, recordset) {
      if (err) console.log(err);
      res.send(recordset);
    });
  });
});

app.get("/contacts", function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    var request = new sql.Request();

    request.query("select * from tb_contacts", function (err, recordset) {
      if (err) console.log(err);
      res.send(recordset);
    });
  });
});

app.get("/customer/add", function (req, res) {
  sql.connect(config, function (err) {
    const {
      Firstname,
      Lastname,
      Description,
      address_line_1,
      address_line_2,
      City,
      State,
      Zip,
      Business_type,
    } = req.query;
    console.log(
      Firstname,
      Lastname,
      Description,
      address_line_1,
      address_line_2,
      City,
      State,
      Zip,
      Business_type
    );
    res.send("adding customer...");
    const INSERT_CUSTOMER_QUERY = `INSERT INTO tb_customer VALUES('${Firstname}','${Lastname}','${Description}','${address_line_1}', '${address_line_2}', '${City}','${State}', '${Zip}','${Business_type}', default)`;

    var request = new sql.Request();
    request.query(INSERT_CUSTOMER_QUERY, function (err, recordset) {
      console.log('adding customer...')
      if (err) console.log(err);
    });
  });
});


app.get("/customer/delete", function (req, res) {
  sql.connect(config, function (err) {
    const { ID } = req.query;
    console.log('Deleting customer ID#: '+ ID);
    res.send("deleting customer");

    const DELETE_CUSTOMER_QUERY = `DELETE FROM tb_customer WHERE ID='${ID}'`;
    var request = new sql.Request();
    request.query(DELETE_CUSTOMER_QUERY, function (err, recordset) {
      if (err) console.log(err);
    });
  });
});


app.get("/customer/find", function (req, res) {
  sql.connect(config, function(err) {
    console.log('finding...');
    const {
      Firstname,
      Lastname,
      Description,
      address_line_1,
      address_line_2,
      City,
      State,
      Zip,
      Business_type,
    } = req.query;
    

    const FIND_CUSTOMER_QUERY = `SELECT ID FROM tb_customer WHERE Firstname='${Firstname}' AND Lastname='${Lastname}' AND Description='${Description}' AND address_line_1='${address_line_1}' AND address_line_2='${address_line_2}' AND City='${City}' AND State='${State}' AND Zip='${Zip}' AND Business_type='${Business_type}'`;
    var request = new sql.Request();
    request.query(FIND_CUSTOMER_QUERY, function (err, recordset) {
      if (err) console.log(err);
      console.log('found')
      res.send(recordset);
    });
  })
})

app.get('/customer/contacts/add', function (req, res) {
  sql.connect(config, function(err) {
    console.log('adding a customer contact');
    const {
      Firstname,
      Lastname,
      Phone_number,
      Email_address,
      customerID,
    } = req.query;

    const INSERT_CUSTOMER_CONTACT = `INSERT INTO tb_contacts VALUES('${Firstname}' , '${Lastname}' , '${Phone_number}' , '${Email_address}' , '${customerID}')`;

    var request = new sql.Request();
    request.query(INSERT_CUSTOMER_CONTACT, function(err, recordsset) {
      console.log('contact added...');
      res.send(recordsset);
    })
  })
}) 

app.get('/customer/contacts/delete', function(req, res) {
  sql.connect(config, function(err) {
    console.log('deleting a customer contact');
    const {
      Firstname,
      Lastname,
      Phone_number,
      Email_address,
      customerID,
    } = req.query;

    const DELETE_CUSTOMER_CONTACT = `DELETE FROM tb_contacts WHERE Firstname='${Firstname}' AND Lastname='${Lastname}' AND Phone_number='${Phone_number}' AND Email_address='${Email_address}' AND customerID='${customerID}'`;
    
    var request = new sql.Request();
    request.query(DELETE_CUSTOMER_CONTACT, function(err, recordset) {
      console.log('contact deleted...');
      console.log(recordset)
      res.send(recordset)
    })
  })
})

app.get("/customer/contacts/cascade/delete", function (req, res) {
  sql.connect(config, function (err) {
    
    const { customerID } = req.query;
    console.log(customerID);
    res.send("deleting customer along with contacts...");

    const DELETE_CUSTOMER_CONTACT_QUERY = `DELETE FROM tb_contacts WHERE customerID='${customerID}'`;
    console.log('del')
    var request = new sql.Request();
    request.query(DELETE_CUSTOMER_CONTACT_QUERY, function (err, recordset) {
      if (err) console.log(err);
      console.log(customerID)
    });
  });
});