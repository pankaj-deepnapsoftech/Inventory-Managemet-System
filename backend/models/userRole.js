const {Schema, model} = require("mongoose");

const userRoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "Role is a required field"],
        minlength: [2, 'Role must be atleast 2 characters long'],
        maxlength: [20, 'Role cannot exceed 20 characters'],
    },
    permissions: {
        type: [String],
        enum: {
            values: ['dashboard', 'product', 'inventory'],
            message: "Permissions should be one of the following: dashboard, product, inventory"
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