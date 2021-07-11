# ACME Widget Co
This project was created by Austyn D. Washington  

## Instructions: How to get started

You will need: 
## Node.js 
## Microsoft SQL Server Management Studio 18 


### SQL server and tables setup
1. Installing and setting up an environment for Microsoft SQL Server Management Studio 18. 

2. TCP must be enabled through the SQL server network configurations. You can access this via Computer Management > Services and Applications > SQL Server Configuration Manager > SQL Server Network Configuration > Protocals for SQL Express. 

You must also access the `properties` tab to and scroll until you find `IPAII` (most likely at the very bottom) and type into the TCP port: 1433 then press okay.

3. Make an account with the username `sa` and password `sa` (Make sure to disable `user must change password at next login` check box). Go into the status tab and change login to `enabled`.Go into the  server properties and go into the security tab and change server authentication to `SQL Server and windows authentication`. Restart the server. 

4. Run `init.sql` through MS SQL, this will create the `Customer` database along with the 
table `tb_customer` for customers and table `tb_contacts` for contacts. 

### Running the backend server 
1. Go into the folder `server` and run `npm install` in the command line

2. Run `node ./server.js` in the command line

3. The console print should say `Server is running...` to indicate the server is running, this needs to be left running.

### Running the frontend web application
1. Go into the `fullstack` folder and run `npm install` in a new command line

2. Run script `npm start` in the command line 

3. This should open a webpage with the following link `localhost:3000`

## How to use ACME Widgets Rolodex 
1. Create a customer with the `create customer` button, you may fill in or leave boxes empty, once finished 
press the `submit` button to continue.

2. The customer should display on the right side of the web application page, there will have a drop down for the customer's information.

3. Within the customer dropdown the user can assign a contact to that specific customer with the `Add contact` button that will display a fill in boxes on the left side of the webpage to fill in. 

4. The user can also delete that customer with the `Delete Customer` button.

5. The user can delete a specific contact by going to the contact's drop down menu and selecting the `Delete contact` button.

6. In the `init.sql` the last two lines are able to display the `tb_customer` and `tb_contact` data reflected in the web application, you can run them in the MS SQL Management Studio and examine the tables within the database.



