const express = require("express");
const router = express.Router();

//Input validation
const validate = require('../../../server/validation/project')

// Load Project model
const Project = require('../../models/project');
// Load Buffer model
const Cache = require('../../models/cache');

// @route POST api/projects/create
// @desc Create project
// @access Public
router.post("/create", (req, res) => {
    //TODO
})

// @route POST api/projects/apply
// @desc Apply to a project (to become a contributor)
// @access Public
router.post("/apply", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateListProjectInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Project.findOne({ projectId: req.body.projectId }).then(project => {
        // Check if project exists
        if (!project) {
            return res.status(404).json({ projectNotFound: "Project not found!" })
        } else {
            const newBuffer = new Buffer({
                projectId: req.body.projectId,
                ownerId: project.ownerId,
                contributorId: req.body.userId
            });
            //save
            newBuffer
                .save()
                .then(buffer => res.json(buffer))
                .catch(err => console.log(err));
        }
    });
});


// @route POST api/projects/list
// @desc List pending project by ownerId
// @access Public
router.post("/list", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateListProjectInput(req.body);
    // Cehck validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Cache.find({ ownerId: req.body.ownerId }).then(cache => {
        // check if ownerId exists
        if (!cache) {
            return res.status(404).json({ projectWithOwnerNotFound: "Current user doesn't have any pending project"})
        } else {
            // fetch project and return a list of projects
            // TODO
        }
    })
})

// @route POST api/projects/accept
// @desc Accept contributor's request by project leader
// @access Public
router.post("/accept", (req, res) => {
    //TODO
})


module.exports = router;