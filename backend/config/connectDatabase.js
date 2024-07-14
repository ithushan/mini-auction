const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URl).then((con) => {
        console.log('Mongodb connect with mongoose to Host: '+con.connection.host);
    })
}
 
module.exports = connectDatabase;