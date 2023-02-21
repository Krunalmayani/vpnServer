var express = require('express');
const cors = require('cors');
var multer = require('multer');
var router = express.Router();
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const { getAllAppList, getAppServer } = require('../controllers/appController');

var forms = multer();

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(forms.array());

router.get('/', function (req, res) {
    res.send('Hello World! App Router');
});

router.get('/getAllApp', getAllAppList);
router.get('/getAppServer', getAppServer);


module.exports = router;