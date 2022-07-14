const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide a company name'],
            maxlength: [50, 'Company name must be less than 50 characters'],
        },
        position: {
            type: String,
            required: [true, 'Please provide a position name'],
            maxlength: [50, 'Position name must be less than 50 characters'],
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'hired', 'pending'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a user'],
        },
    },{timeStamps: true});

    module.exports = mongoose.model('Job', JobSchema);
