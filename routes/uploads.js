/*
 Ruta: /api/uploads/
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields');
const { validateJWT } = require('../middlewares/validation-jwt');
const {fileUpload, fileGet} = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');


const router = Router();
router.use(expressFileUpload());

router
.get('/:type/:img', validateJWT, fileGet)
.put( '/:type/:id' , validateJWT, fileUpload);



module.exports = router;