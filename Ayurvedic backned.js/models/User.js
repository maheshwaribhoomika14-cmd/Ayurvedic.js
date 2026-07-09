const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // Ek email se ek hi account banega
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // By default sab normal user honge, hum manually compass se admin bana sakte hain
    }
}, {
    timestamps: true // Isse createdAt aur updatedAt fields apne aap ban jayengi
});

module.exports = mongoose.model('User', userSchema);