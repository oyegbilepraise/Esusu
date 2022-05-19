const userController = require('../controllers/user')

const router = require('express').Router();

router.post('/create_user', userController.userSignUp);
router.post('/create_community', userController.createCommunity)
router.post('/search_community', userController.searchForCommunity)
router.get('/get_all_users', userController.getAllUsers)
router.post('/add_user_to_community', userController.addUserToCommunity)
router.post('/make_contributions', userController.makeContributions)
router.post('/get_user_by_agent', userController.getUserByAgent)
router.post('/send_invite', userController.sendInvite)
router.post('/generate_collection_by_admin', userController.generateTableForCollection)

module.exports = router;