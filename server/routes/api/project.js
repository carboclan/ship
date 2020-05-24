const express = require("express");
const router = express.Router();

// Input Validators
const validate = require("../../../server/validation/project");

// Models
const Project = require("../../models/project");
const ContributorSlot = require("../../models/contributor-slot");
const Cache = require("../../models/cache");
const userModule = require('../../models/user');

// @route POST api/projects/create
// @desc Create a Project
// @access Public
router.post("/create", (req, res) => {
  // Validation
  const { errors, isValid } = validate.validateCreateProjectInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  // Save to DB
  const contributorSlots = req.body.contributorSlots;
  const project = req.body;
  project.contributorSlots = undefined;
  Project.create(project)
    .then((project) => {
      ContributorSlot.create(
        ...contributorSlots.map((slot) => ({ ...slot, projectId: project.id }))
      )
        .then(() => {
          res.status(200).json(project.id);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json("unexpected error");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json("unexpected error");
    });
});

// @route POST api/projects/apply
// @desc Apply to a project (to become a contributor)
// @access Public
router.post("/apply", (req, res) => {
  // Form validation
  const { errors, isValid } = validate.validateListProjectInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Project.findById(req.body.projectId).then((project) => {
    // Check if project exists
    if (!project) {
      return res.status(404).json({ projectNotFound: "Project not found!" });
    } else {
      const newBuffer = new Buffer({
        projectId: req.body.projectId,
        ownerId: project.ownerId,
        contributorId: req.body.userId,
      });
      //save
      newBuffer
        .save()
        .then((buffer) => res.json(buffer))
        .catch((err) => console.log(err));
    }
  });
});

// @route POST api/projects/list
// @desc List pending project by ownerId
// @access Public
router.post("/list", (req, res) => {
  // Form validation
  const { errors, isValid } = validate.validateListProjectInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Cache.find({ ownerId: req.body.ownerId }).then((docs) => {
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
  const { errors, isValid } = validate.validateAcceptInput(req.body);
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

router.post("/acceptById", (req, res) => {
  // Form validation
  const { erros, isValid } = validate.validateAcceptByIdInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Cache.findByIdAndDelete(req.body.cacheId).then((doc) => {
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