var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express..........',
  condition: true,
  cities: ['Sydney','Melbourne',"Brisbane"]
 });
});

router.get('/test/:id',(req,res,next) =>{
  res.render('test',{
    output: req.params.id
  });
});

module.exports = router;
