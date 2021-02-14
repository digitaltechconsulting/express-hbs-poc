var express = require('express');

var router = express.Router();

router.get('/',(req,res) => {
  res.render('login');
});

router.post('/',(req,res) =>{
  let userName = req.body.username;
  let password = req.body.password;

  if ( userName === 'Hemant' && password === 'password'){
    res.cookie('authUser',{userName: userName, loginTime: new Date()})
    res.send("ok");
  }else {
    res.send("NOt ok");
  }
})

module.exports = router;