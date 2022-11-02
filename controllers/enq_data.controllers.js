const db = require("../db/models");
const Enq_data = db.enq_data;

// Create request for estimate price
exports.create = (req, res) => {
// Validate request
    if (!req.body.ras){
        if (!req.body.num_enq && !req.body.date_pds ) {
            res.status(400).send({message: "Numero enqueteur ou date de point ne peuvent pas etre vide!"});
            return;
        }
    }

    // Create a request
    const enqData = new Enq_data({
        num_enq: req.body.num_enq,
        sct: req.body.sct,
        date_pds: req.body.date_pds,
        ras: req.body.ras
    });
    console.log(enqData);
    console.log(enqData.id);

    // Save request in mongodb
    enqData
        .save(enqData)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the request."
            });
        });
};

// Modify request for estimate price
exports.update = (req, res) => {
// Validate request
    if (!req.sct) {
        res.status(400).send({message: "Secteur can not be empty!"});
        return;
    }
    // Recover request with ID
    const id = req.params.id;
    // Modify a request
    Enq_data.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update request with id=${id}. Maybe request was not found!`
                });
            } else res.send({message: "Request was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating request with id=" + id
            });
        });
};

// Delete request for estimate price
exports.delete = (req, res) => {
    // Recover request with id
    const id = req.params.id;
    // Delete request
    Enq_data.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete request with id=${id}. Maybe request was not found!`
                });
            } else {
                res.send({
                    message: "Request was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete request with id=" + id
            });
        });
};

// Delete All request
exports.deleteAll = (req, res) => {
    Enq_data.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} request were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all request."
            });
        });
};

exports.deleteWithDatePdsAndNumEnq = (req, res) => {
    const date = req.params.date;
    const enq = req.params.enq;

    // Delete request
    Enq_data.deleteMany({ date_pds: date, num_enq: enq })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete request with investigator number=${enq} and pds date=${date} . Maybe request was not found!`
                });
            } else {
                res.send({
                    message: `${data.deletedCount} request were deleted successfully!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete request with investigator number=" + enq + " and pds date=" + date });
        });
};

// Retrieve a single request
exports.findOne = (req, res) => {
    // Recover request with id
    const id = req.params.id;

    Enq_data
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found request with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving request with id=" + id});
        });
};

// Retrieve all request with condition
exports.findAll = (req, res) => {
    // Recover request with name
    const num_enq = req.query.num_enq;
    var condition = num_enq ? {num_enq: {$regex: new RegExp(num_enq), $options: "i"}} : {};

    Enq_data
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving request."
            });
        });
};

// Retrieve Array value with Val Func id
exports.findWithDatePdsAndNumEnq = (req, res) => {
    // Recover request with id
    const date = req.params.date
    const enq = req.params.enq

    console.log(date, enq);

    Enq_data.find({ date_pds: date, num_enq: enq })
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found request with date " + date + " and investigator number " + enq});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving request with date=" + date + " and investigator number " + enq});
        });
};