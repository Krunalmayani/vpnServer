var express = require('express');
const cors = require('cors');
var multer = require('multer');
var router = express.Router();
const bodyParser = require('body-parser');
const { getAllServer, manageServerStatus, deleteAppServer, } = require('../controllers/serverController')

var forms = multer();

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(forms.array());

router.get('/', function (req, res) {
    res.send('Hello World! 123123');
});
router.get('/getAllServer', getAllServer);
router.put('/manageServer', manageServerStatus);
router.put('/deleteAppServer', deleteAppServer);

module.exports = router;