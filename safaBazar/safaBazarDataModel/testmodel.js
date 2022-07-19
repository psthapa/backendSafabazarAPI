const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const testSchema = new mongoose.Schema({
         firstName: {
            type: String,
        },
        lastName: {
            type: String,
        }

    
})
module.exports = mongoose.model('test', testSchema);