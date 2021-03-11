const path = require('path')

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const {uploadImage} = require('../helpers/upload-image');
const fs = require('fs');


const fileUpload = async(req, res = response) =>{

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['users', 'artists', 'discs'];

    //Validar que nos llega un archivo
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'Type of collection is not allowed'
        });
    }

    //Validar que tiene un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No file upload'
        });
    }
    
    //Procesar la imagen

    const file = req.files.img;

    const splitName = file.name.split('.');
    const extFile = splitName[splitName.length -1];

    //Validar extensión
    const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];

    if(!validExtensions.includes(extFile)){
        return res.status(400).json({
            ok: false,
            msg: 'Type of file is not allowed'
        });
    }



    //Generar el nombre del archivo
    const fileName = `${ uuidv4()}.${extFile}`;

    //Path para guardar la imagen
    const path = `./uploads/${type}/${fileName}`;

    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Image upload failed when moving the image'
            });
        }


        //Actualizar la base de datos
        uploadImage(type, id, fileName);  
    
        res.json({
            ok:true,
            msg: 'Image upload success',
            fileName
        });
    });

      
};

const fileGet = async(req, res = response) =>{

 const type = req.params.type;
 const img = req.params.img;


 const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);

 //Imagen por defecto
 if (fs.existsSync(pathImg)){
    res.sendFile(pathImg);
 } else {
    const noImg = path.join(__dirname, `../uploads/no-img.png`);
    res.sendFile(noImg);

 }

      
};



module.exports = {
    fileUpload,
    fileGet
};