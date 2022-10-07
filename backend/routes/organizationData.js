const express = require("express");
const router = express.Router();

//importing data model schemas
let { orgdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    orgdata.find( 
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
    orgdata.find({ id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


//POST
router.post("/", (req, res, next) => { 
    orgdata.create( 
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
    orgdata.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send("Data succesfully changed!");
            }
        }
    );
});

//DELETE
router.delete("/delete/:id", (req, res, next) => {
    orgdata.deleteOne( // finds the document based on the id given and deletes it from the database
        { id: req.params.id },
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

module.exports = router;
