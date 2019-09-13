const express = require('express');

const router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/', jsonParser, async function (req, res) {

  data = {
    dlnum:req.body['dlNumber'],
    dob:req.body['dateOfBirth'],
    fname:req.body['firstName'],
    lname:req.body['lastName'],
    photo:req.body['photo'],
    pcode:req.body['postalCode']
  };

  //console.log(data.photo)

  // input validation
  if (typeof data.photo == "undefined") {
    res.status(401).json({error: 'Please provide an image'});
  }

  var re=/^[A-Za-z]+$/;
  if (!re.test(data.fname)) {
    return res.status(401).json({error: 'Invalid input: first name e.g. Quinte'});
  }
  if (!re.test(data.lname)) {
    return res.status(401).json({error: 'Invalid input: last name e.g. Quinte'});
  }

  re=/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  if (!re.test(data.dob)) {
    return res.status(401).json({error: 'Invalid input: date of birth e.g. 2000-01-01'});
  }

  re=/[A-z]\d{4}-\d{5}-\d{5}/;
  if (!re.test(data.dlnum)) {
    return res.status(401).json({error: 'Invalid input: drivers license number e.g. a1234-12345-12345'});
  }

  re=/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/;
  if (!re.test(data.pcode)) {
    return res.status(401).json({error: 'Invalid input: postal code e.g. A1A 1A1'});
  }

  const num=parseInt(data.dlnum.slice(-1), 10)
  return res.status(200).json({ result:(num%2==0) });
});

module.exports = router;
