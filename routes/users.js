var express = require('express');
var router = express.Router();
const user_controllers= require('../controllers.js/usercontroller')
/* GET users listing. */
router.get('/',user_controllers.getloginform);
router.post('/',user_controllers.postloginCrendentials)
module.exports = router;
