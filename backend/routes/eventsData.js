const express = require("express");
const router = express.Router();
require("dotenv").config();   
const organization_ID = process.env.Organization;
//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find( 
        { orgID: organization_ID },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find(
        { orgID: organization_ID,
        _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { orgID: organization_ID, eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            orgID: organization_ID,
            date: req.query["date"]
        }
    };
    eventdata.find( 
        dbQuery,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { orgID: organization_ID,
        attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    eventdata.create( 
        req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { orgID: organization_ID,
        _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { orgID: organization_ID, _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { orgID: organization_ID,
                        _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

// delete event by id
router.delete("/delete/:id", (req, res, next) => {
    eventdata.deleteOne( // finds the document based on the id given and deletes it from the database
        { orgID: organization_ID,
        _id: req.params.id },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});
// This will pull an element from the attendees array
router.put("/removeAttendee/:event/:id", (req, res, next) => {
    eventdata.updateOne( 
        { orgID: organization_ID,
        _id: req.params.event },
        { $pull: { attendees: req.params.id } },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//last 2 months, attendees count, events with attendees
//Find entries by last 2 months, count of attendees
//Assistance via: https://www.mongodb.com/docs/manual/reference/operator/aggregation/size/
//via: https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
const subtracteddate = new Date();
subtracteddate.setMonth(subtracteddate.getMonth() - 2);
router.get("/graphdata", (req, res, next) => { 
    eventdata.find( 
        { attendees: {$exists: true}, date: {$gte: subtracteddate }, orgID: organization_ID },
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).select(
        {
            eventName: 1,
            attendees: {$size: "$attendees"},
            _id: 0,
        });
  })

module.exports = router;