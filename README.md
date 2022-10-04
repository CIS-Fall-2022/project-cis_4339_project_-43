# Project 43 Data Project

# Members for this project are:

Deandre Harrell
Jonathan Euceda
Luke Tran

# Public Postman documentation of the API can be found below.
https://documenter.getpostman.com/view/17246747/2s83zcTmvb

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