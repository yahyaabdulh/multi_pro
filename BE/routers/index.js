const express = require("express")
const router = express.Router()
const users = require('../controllers/users')
const job_lists = require('../controllers/job_lists')
router.post('/users/authenticate', users.authenticate);
router.post('/users/create', users.create);
router.get('/job_lists', job_lists.index);
router.get('/job_lists/:id', job_lists.get_by_id);

module.exports = router