var express = require('express');
var router = express.Router();
const user_controllers= require('../controllers.js/usercontroller')
/* GET users listing. */
router.get('/',user_controllers.getloginform);
router.post('/',user_controllers.postloginCrendentials)
router.get('/refresh_token',user_controllers.refresh_Token)
router.get('/orders',user_controllers.getUserOrderDetails)
router.get('/wishlist',user_controllers.getUserWhishlistDetails)
router.get('order/:status')
router.post('/orders',user_controllers.postOrder)
router.post('/whishlist',)
module.exports = router;
