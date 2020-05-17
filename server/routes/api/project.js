import { Router } from "express";
const router = Router();

//Input validation
import validateApplicationInput from '../../../server/validation/application'

// Load Project model
import Project, { findOne } from '../../models/project';
// Load Buffer model
import Buffer, {findOne} from '../../models/buffer';

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
    const {errors, isValid} = validateApplicationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    findOne({ projectId: req.body.projectId }).then(project => {
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
// @desc List project by ownerId
// @access Public
router.post("/list", (req, res) => {
    //TODO
})

// @route POST api/projects/accept
// @desc Accept contributor's request by project leader
// @access Public
router.post("/accept", (req, res) => {
    //TODO
})


export default router;