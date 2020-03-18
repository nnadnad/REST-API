const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { nameRE, idRE, invalidId, invalidName, notFound } = require('./regex');

/**
 * @module putUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */


router.put('/users/:id', (req, res) => {
    let oldId = req.params.id;
    let { Name, ID, Birthday } = req.body;
    console.log(req.body);

    // periksa kelengkapan data
    if ( oldId === undefined ) {
        res.status(400);
        res.json({"message": "no id specified"});
    } else if ( Name === undefined ) {
        res.status(400);
        res.json({"message": "no name specified"})
    } else if ( ID === undefined) {
        res.status(400);
        res.json({"message": "no id specified"})
    } else if ( Birthday === undefined ) {
        res.status(400);
        res.json({"message": "no birthday specified"})
    } else { // validasi nama dan id, birthday asumsi valid

        if ( Name.match(nameRE) === null ) {
            res.status(400);
            res.json(invalidName)
        } else if ( ID.match(idRE) === null || oldId.match(idRE) === null ) {
            res.status(400);
            res.json(invalidId)
        } else {
            User.query()
                .where({ // periksa instance dengan id yang sama dan belum 'dihapus'
                    ID: ID,
                    deletedAt: '0000-00-00 00:00:00'
                })
                .then(users => {
                    if ( users.length === 0 ) {

                        User.query()
                            .insert({
                                Name: Name,
                                ID: ID,
                                Birthday: Birthday
                            })
                            .then(() => {
                                console.log("user added");
                                res.json({"message": "user added successfully"})
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        User.query()
                            .update({
                                Name: Name,
                                ID: ID,
                                Birthday: Birthday,
                                updatedAt: knex.raw("CURRENT_TIMESTAMP")
                            })
                            .where({
                                ID: ID,
                                deletedAt: '0000-00-00 00:00:00'
                            })
                            .then(() => {
                                res.json({"message": "user updated successfully"})
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

});


module.exports = {
    router: router
};