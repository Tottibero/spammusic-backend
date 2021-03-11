/*
 Ruta: /api/search
*/


const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validation-fields');
const {searchAll, searchCollection} = require('../controllers/search');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();

router
.get( '/:query' , validateJWT, searchAll)
.get( '/collection/:colname/:query' , validateJWT, searchCollection);



module.exports = router;