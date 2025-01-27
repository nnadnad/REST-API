const express = require('express');
const knex = require('knex');
const router = express.Router();
const User = require('../../models/User');

const { nameRE, idRE, invalidId, invalidName, notFound } = require('./regex');

/**
 * @module delUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */

router.delete('/users/:id', (req, res) => {
    let ID = req.params.id;

    if ( ID.match(idRE) !== null ) {
        User.query()
        .where("ID", ID)
        .then(users => {
            if ( users.length === 0 ) {
                res.status(404);
                res.json({"message": "user does not exist"})
            } else {
                User.query()
                    .update({
                        deletedAt: knex.raw('CURRENT_TIMESTAMP')
                    })
                    .where('ID', ID)
                    .then(() => {
                        res.json({"message": "user deleted successfully"})
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        res.status(404);
        res.json(invalidId)
    }
});


module.exports = {
    router: router
};