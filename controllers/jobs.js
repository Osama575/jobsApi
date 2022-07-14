const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
}

const getJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId},} = req;
    const job = await Job.findOne({_id: jobId, createdBy: userId,});
    if (!job) {
        throw new NotFoundError(`No job with id of ${jobId}`);
    }
    res.status(StatusCodes.OK).json({job});
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async (req, res) => {
   try { const {user: {userId}, params: {id: jobId},} = req;
    // if (!req.body.position || !req.body.company) {
    //     throw new BadRequestError('Please provide position and company');
    // }
    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId,}, req.body, {
        new: true,
        runValidators: true,
    });
    if (!job) {
        throw new NotFoundError(`No job with id of ${jobId}`);
    }
    res.status(StatusCodes.OK).json({job});
}
 catch (err) {
    throw new BadRequestError(err.message);
}
}

const deleteJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId},} = req;
    const job = await Job.findOneAndDelete({_id: jobId, createdBy: userId,});
    if (!job) {
        throw new NotFoundError(`No job with id of ${jobId}`);
    }
    res.status(StatusCodes.OK).json({job});
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}