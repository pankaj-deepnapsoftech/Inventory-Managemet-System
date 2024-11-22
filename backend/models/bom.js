const {Schema, model} = require('mongoose');

const bomSchema = new Schema({
    
});

const BOM = model('BOM', bomSchema);
module.exports = BOM;