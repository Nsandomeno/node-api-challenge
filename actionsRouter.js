
// // imports 
// const express = require('express')
// // data
// const Projects = require('./data/helpers/projectModel.js');
// const Actions = require('./data/helpers/actionModel.js')
// // import middleware

// // create router
// const router = express.Router()
// // route handlers 

// // (1) - post an action
// router.post("/", validateId, validateAction, (req, res) => {
//     const { id } = req.params
//     const newAction = {...req.body, project_id: id}

//     Actions.insert(newAction).then((action) => {
//         res.status(200).json(action)
//     }).catch((error) => {
//         res.status(500).json({message:"action could not be created."})
//     })
// })








// // export router
// module.exports = router;
// // middleware
// function validateProject(req, res, next) {
//     const newProject = req.body

//     if (!newProject) {
//         res.status(400).json({message:"Please create a project."})
//     } else if (!newProject.name || !newProject.description) {
//         res.status(400).json({message:"Please provide a name and a description."})
//     } else {
//         next()
//     }  
// }

// function validateId(req, res, next) {
//     const { id } = req.params

//     Projects.get(id).then((proj) => {
//         if (proj === null) {
//             res.status(404).json({message:"A project with this id could not be found."})
//         } else {
//             next()
//         }
//     }).catch((error) => {
//         res.status(500).json({message:"The request could not be complete."})
//     })
// }

// function validateAction(req, res, next) {
//     const newAction = req.body

//     if (!newAction) {
//         res.status(404).json({message:"Please provide a new action"})
//     } else if (!newAction.description || !newAction.notes) {
//         res.status(404).json({message:"Please provide a description and notes"})
//     } else if (newAction.description.length > 128){
//         res.status(409).json({message:"Your description is above 128 characters."})
//     } else {
//         next()
//     }
// }