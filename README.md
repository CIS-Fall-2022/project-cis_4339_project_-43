# Project 43 Data Manipulation Project

# Members for this project are:

## Deandre Harrell
## Jonathan Euceda
## Luke Tran

# Public Postman documentation of the API can be found below.
https://documenter.getpostman.com/view/17246747/2s83zfS6CP

# Important
For this project to work, there must be an .ENV file in both the backend and the frontend. The .ENV file of the backend requires two fields: MONGO_URL and ORGANIZATION.
For ORGANIZATION, you place a number that matches with the organization ID of an organization in the backend. (Use Postman to add an organization with an OrgID of 1.) MONGO_URL is the connection string for your local mongoDB. (This will likely be mongodb://127.0.0.1:27017/CIS4339).

# Overview
This project involves being able to manipulate data involving events, clients, and organizations. This involves being able to add data,
update data, fetch data, and delete data through the project. 

# Clients
These are the people of the organization. Data include is names, addresses, and contact information. They can be assigned events that they will be attending.
They are all assigned a unique identifier called _id.

# Events
These are events. Name of the event, location of the event, and type of event is provided. Attendees of the event must match with entries that are 
found in the client data. Events are all assigned a unique identifier called _id.

# Organizations
These are the organizations that are viewing the database. Organization data is gathered, and each organization is given an ID.
Through this ID, those viewing the frontend through that organization will only be able to see clients and events that have an
OrgID that matches with the ID of the organization. 