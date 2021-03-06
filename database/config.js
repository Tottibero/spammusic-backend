const mongoose = require('mongoose');

//Conectar DB

// Para conectar la base de datos usar en el CMD para iniciar mongo:

// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"


const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_CNN,  {
                //Necesario para poder trabajar con indices.       
                useUnifiedTopology: true, 
                useNewUrlParser: true, 
                useCreateIndex: true,
                useFindAndModify: false
        });

        console.log('DB successfuly connected');


    } catch (error) {

        console.log(error);
        throw new Error ('Error trying to connect to DB');
        
    }



   
}

module.exports = {
    dbConnection
}



