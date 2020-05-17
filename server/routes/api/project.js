import { Router } from "express";
const router = Router();

import Project, { findOne } from '../../models/project';

// @route POST api/projects/create
// @desc Create project
// @access Public
router.post("/create", (req, res) => {
    //TODO
})

router.post("/apply", (req, res) => {

})


export default router;