const express = require("express");
const router = express.Router();

//Input validation
const validate = require('../../../server/validation/project');

// Load Project model
const Project = require('../../models/project');
// Load Buffer model
const Cache = require('../../models/cache');
// Load User modle
const userModule = require('../../models/user');

// @route POST api/projects/create
// @desc Create project
// @access Public
router.post("/create", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateCreateProjectInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newProject = new Project({
        name: req.body.name,
        productVersion: req.body.productVersion,
        specification: req.body.specification,
        outcomeObjectives: req.body.outcomeObjectives,
        minNumContributor: req.body.minNumContributor,
        ownerId: req.body.ownerId
    })
    // Save
    newProject.save().then(project => res.json(project)).catch(err => console.log(err));
});

// @route POST api/projects/apply
// @desc Apply to a project (to become a contributor)
// @access Public
router.post("/apply", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateApplyProjectInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Project.findById(req.body.projectId).then(project => {
        // Check if project exists
        if (!project) {
            return res.status(404).json({ projectNotFound: "Project not found!" });
        } else {
            const newCache = new Cache({
                projectId: req.body.projectId,
                ownerId: project.ownerId,
                contributorId: req.body.userId
            });
            //save
            newCache
                .save()
                .then(cache => res.json(cache))
                .catch(err => console.log(err));
        }
    });
});


// @route POST api/projects/listByOwner
// @desc List pending projects by ownerId
// @access Public
router.post("/listByOwner", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateListProjectInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Cache.find({ ownerId: req.body.ownerId }).then(docs => {
        // check if ownerId exists
        if (!docs) {
            return res.status(404).json({ projectWithOwnerNotFound: "Current user doesn't have any pending project"});
        } else {
            let promises = docs.map(doc => Project.findById(doc.projectId).then(p => {
                return p;
            }));
            Promise.all(promises).then(function(results) {
                return res.json(results)
            });
        }
    });
});

// @route POST api/projects/accept
// @desc Accept contributor's request by project leader
// @access Public
router.post("/accept", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateAcceptInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Cache.findOneAndDelete({ownerId: req.body.ownerId, 
        projectId: req.body.projectId, contributorId: req.body.contributorId}).then(doc => {
            if (!doc) {
                return res.status(404).json({ projectNotFound: "No such pending project."})
            } else {
                // Modify project doc (add contributor to the contributors)
                userModule.User.findById(doc.contributorId).then(user => {
                    if (!user) {
                        return res.status(404).json({ userNotFound: "No such applicant."});
                    } else {
                        Project.update({_id: doc.projectId}, {$push: {contributors: user } }).then(x => {
                            return res.json({
                                projectId: doc.projectId,
                                contributorId: doc.contributorId,
                                status: "Accepted"
                            })
                        });
                    }
                });
            }
        });
});

// @route POST api/projects/acceptById
// @desc Accept contributor's request by project leader with a specific id.
// @access Public
router.post("/acceptById", (req, res) => {
    // Form validation
    const {errors, isValid} = validate.validateAcceptByIdInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Cache.findByIdAndDelete(req.body.cacheId).then(doc => {
        if (!doc) {
            return res.status(404).json({ projectNotFound: "No such pending project with given id"});
        } else {
            userModule.User.findById(doc.contributorId).then(user => {
                if (!user) {
                    return res.status(404).json({ userNotFound: "No such applicant."});
                } else {
                    Project.update({_id: doc.projectId}, {$push: {contributors: user } }).then(x => {
                        return res.json({
                            projectId: doc.projectId,
                            contributorId: doc.contributorId,
                            status: "Accepted" 
                        })
                    });
                }
            });
        }
    });
});


module.exports = router;