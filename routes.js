const express = require('express');
const router = express();
router.use(express.json())
const signUp = require('./sign-up.controller.js')
const users = require('./user.controller.js')


router.post('/signup', signUp.userRegistration);
router.post('/login', signUp.login);
router.get('/userList', users.userList);
router.get('/userList/:city', users.findBycity);
router.post('/createUser', users.createUser);








router.listen(3000, () => {
  console.log('server up and running')
})
