# ACME Widget Co
This project was created by Austyn D. Washington  

## Instructions: How to get started

You will need: 
## Node.js 
## Microsoft SQL Server Management Studio 18 


### SQL server and tables setup
1. Installing and setting up an environment for Microsoft SQL Server Management Studio 18. 

2. TCP must be enabled through the SQL server management settings.

3. An account with the username `sa` and password `sa`.

4. Run `init.sql` through MS SQL, this will create the `Customer` database along with the 
table `tb_customer` for customers and table `tb_contacts` for contacts. 

### Running the backend server 
1. Go into the folder `server` and run `npm install` in the command line

2. Run `node ./server.js` in the command line

3. The console print should say `Server is running...` to indicate the server is running

### Running the frontend web application
1. Go into the `fullstack` folder and run `npm install` in the command line

2. Run script `npm start` in the command line 

3. This should open a webpage with the following link `localhost:3001`

## How to use ACME Widgets Rolodex 
1. Create a customer with the `create customer` button, you may fill in or leave boxes empty, once finished 
press the `submit` button to continue.

2. The customer should display on the right side of the web application page, there will have a drop down for the customer's information.

3. Within the customer dropdown the user can assign a contact to that specific customer with the `Add contact` button that will display a fill in boxes on the left side of the webpage to fill in. 

4. The user can also delete that customer with the `Delete Customer` button.

5. The user can delete a specific contact by going to the contact's drop down menu and selecting the `Delete contact` button.

6. In the `init.sql` the last two lines are able to display the `tb_customer` and `tb_contact` data reflected in the web application, you can run them in the MS SQL Management Studio and examine the tables within the database.



