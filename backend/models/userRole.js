const {Schema, model} = require("mongoose");

const userRoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "Role is a required field"],
        unique: true,
        minlength: [2, 'Role must be atleast 2 characters long'],
        maxlength: [20, 'Role cannot exceed 20 characters'],
    },
    permissions: {
        type: [String],
        enum: {
            values: ['product', 'store', 'approval', 'agent', 'bom'],
            message: "Permissions should be one of the following: product, store, approval, agent, bom"
        } // TODO -> ADD MORE RELATED ROLES
    },
    description: {
        type: String,
        maxlength: [100, 'Description cannot exceed 100 characters']
    }
}, {
    timestamps: true
});

const UserRole = model("User Role", userRoleSchema);
module.exports = UserRole;