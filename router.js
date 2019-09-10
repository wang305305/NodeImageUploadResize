const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/', upload.single('image'), urlencodedParser, async function (req, res) {
  response = {
    dlnum:req.body.DLNum,
    dob:req.body.DOB,
    fname:req.body.fname,
    lname:req.body.lname,
    pcode:req.body.pcode
  };
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);


  // input validation
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  var re=/^[A-Za-z]+$/;
  if (!re.test(response.fname)) {
    return res.status(401).json({error: 'Invalid input: first name e.g. e.g. Quinte'});
  }
  if (!re.test(response.lname)) {
    return res.status(401).json({error: 'Invalid input: last name e.g. Quinte'});
  }

  re=/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  if (!re.test(response.dob)) {
    return res.status(401).json({error: 'Invalid input: date of birth e.g. 2000-01-01'});
  }

  re=/[A-z]\d{4}-\d{5}-\d{5}/;
  if (!re.test(response.dlnum)) {
    return res.status(401).json({error: 'Invalid input: drivers license number e.g. a1234-12345-12345'});
  }

  re=/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/;
  if (!re.test(response.pcode)) {
    return res.status(401).json({error: 'Invalid input: postal code e.g. A1A 1A1'});
  }


  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename, response: response, result:(response.dlnum=='a1234-12345-12345')});
});

module.exports = router;

//first last name, dob, postal code, dl num.