const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config();   
const organization_ID = process.env.Organization;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgID: { type: String, default: organization_ID},
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgID: { type: String, default: organization_ID},
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }]
}, {
    collection: 'eventData'
});

//collection for OrganizationData

let orgDataSchema = new Schema ({
    id: { type: String, default: uuid.v1,
        require: true,
        unique: true 
    },
    orgName: {
        type: String,
        require: true,
        unique: true
    },
    orgAddress:
        {
            line1: {
                type: String
            },
            line2: {
                type: String,
            },
            city: {
                type: String,
            },
            county: {
                type: String,
            },
            zip: {
                type: String,
            }
        },
    orgContact:
        {
    primaryPhone: { type: String, require: true },
    email: { type: String },
        }

}, {
    collection: 'organizationData',
}
);


// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const orgdata = mongoose.model('organizationData', orgDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, orgdata }
