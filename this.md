This include `Backend` Folder but it will be different.
It is here just for convinience.

In backend folder: 
`npm init`
name: inotebook-backend
iNotebook - Your notebook on the cloud

--> 
`npm i express`
`npm i mongoose`

R43: Creating MongoDB Connection
- Express Boiler Plate
- make ES6 Modules and type: module in pk.json

R44: How to structure the Application

- Creating Mongoose models: With Capital Names
    For User go mongoose docs and create schemas
    UserSchema and NotesSchema
- Creating Folder for routes
    Auth.js and Notes.js

R45: Storing Data into Database
    req.body -->
    user import

R46: Validation on Data Types
- Using express validation and install
-- `npm install --save express-validator`
-- Adding express-validator / its docs
-- Then create.then.catch.res.json

R47: Create ThunderClient Collection to manage request
-- Created user proper error

-- Creating thunderclient collection
-> Create new folder
-> New Request User

R48: Understanding passWord hashing and salt and pepper:

-- Normal password are not store in database, they can be hacked from database.
-- We use hash / hashing which is just make it from normal to complex combination of characeters, symbols and numbers.
-- Hash is get Hashed it backend and not match the original one.

-- Normal and common password are present in table of hacker such as rainbow tables with 3 billion entries.
-- For this we use salt method to remove this limitation.
-- Adding string with password know as the salt.
-- Ex: Kirti may exist but not addition string.
-- Additional more pepper on it.

R49: Applying hashing in app for password
-- Using `npm install bcryptjs`
-- import the file then use the function
-- we return token while user login in account.
-- It is a way to verify the user.
-- Using `npm install jsonwebtoken`.

-- Create Key and then jwt sign method.

R50: Creating Login Endpoint and sending auth token
-- Creating new login `route` to return auth token


R51: Creating middleware to decode the user from JWT
-- Creating New route endpoint
-- IN this app if I want to make it scalable for future to add more things like blog, shop then I will add middleware. 


R52: Creating Route to Fetch all Notes and also add notes
-- This requires the login throught token(fetchUser) middleware.

R53: Create Update Function 

R54: Create Delete Function

R55: Writing React Frontend
-- Installing packages for Frontend React
-- npm i react-router-dom concurrently
-- To run multiple servers in terminal
-- At hosting we host backend and frontend differently
-- Config both command in package.json to `npm run both`.
