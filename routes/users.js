var express = require('express');
var router = express.Router();
const user_controllers= require('../controllers.js/usercontroller')
/* GET users listing. */
router.get('/',user_controllers.getloginform);
router.post('/',user_controllers.postloginCrendentials)
router.get('/refresh_token',user_controllers.refresh_Token)
module.exports = router;
