const {Schema, model} = require('mongoose');

const BOMRawMaterialSchema = new Schema({
    item_id: {
        type: String,
        required: [true, 'Item id is a required field']
    },
    item_name: {
        type: String,
        required: [true, 'Item name is a required field']
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        default: 0
    },
    // uom -> unit of measurement
    uom: {
        type: String,
        required: [true, 'UOM is a required field']
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    // status
    assembly_phase: {
        type: String
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    supporting_doc: {
        type: String
    },
    comments: {
        type: String
    },
    unit_cost: {
        type: Number
    },
    total_part_cost: {
        type: Number
    }
}, {
    timestamps: true
});

const BOMRawMaterial = model('BOM-Raw-Material', BOMRawMaterialSchema);
module.exports = BOMRawMaterial;