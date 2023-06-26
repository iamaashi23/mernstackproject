const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: 'Please enter your email',
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model('order', OrderSchema)