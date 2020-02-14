
// imports
const express = require('express');
const cors = require('cors')
// data
const Projects = require('./data/helpers/projectModel.js');
const Actions = require('./data/helpers/actionModel.js');

// const actionRouter = require('./actionsRouter.js');

// create server
const server = express()
// global middleware
server.use(express.json())
server.use(cors())
// server.use("/api/projects/:id/actions", actionRouter)

// route handlers
server.get("/", (req, res) => {
    res.send("Root of the server.")
})
// Projects

// (1) - Post Project 
server.post("/api/projects", validateProject, (req, res) => {
    const newProject = req.body
    Projects.insert(newProject).then((project) => {
        res.status(200).json(project)
    }).catch((error) => {
        res.status(500).json({message:"Could not be added."})
    })
})
// (1a) - post action
server.post("/api/projects/:id/actions", validateId, validateAction, (req, res) => {
    const { id } = req.params
    const newAction = {...req.body, project_id: id}

    Actions.insert(newAction).then((action) => {
        res.status(200).json(action)
    }).catch((error) => {
        res.status(500).json({message:"action could not be created."})
    })
})

// (2) - Get all Projects
server.get("/api/projects", (req, res) => {
    Projects.get().then((projects) => {
        res.status(200).json(projects)
    }).catch((error) => {
        res.status(500).json({message:"Could not be retrieved."})
    })
})
// (2a) - Get all actions 
server.get("/api/actions", (req, res) => {
    Actions.get().then((actions) => {
        res.status(200).json(actions)
    }).catch((error) => {
        res.status(500).json({message:"could not be retrieved."})
    })
})
// (3) - Get a project (by id)
server.get("/api/projects/:id", validateId, (req, res) => {
    const { id } = req.params

    Projects.get(id).then((project) => {
        res.status(200).json(project)
    }).catch((error) => {
        res.status(500).json({message:"could not be completed."})
    })
})
// (3a) - Get a action (by action id?)
server.get("/api/actions/:id", validateActionId, (req, res) => {
    const { id } = req.params

    Actions.get(id).then((action) => {
        res.status(200).json(action)
    }).catch((error) => {
        res.status(500).json({message:"Could not be retrieved."})
    })
})
// (4) - update a project
server.put("/api/projects/:id", validateId, validateProject, (req, res) => {
    const { id } = req.params
    const updatedProject = req.body

    Projects.update(id, updatedProject).then((update) => {
        res.status(200).json(update)
    }).catch((error) => {
        res.status(500).json({message:"The request could not be completed."})
    })
})
// (4a) - update an action
server.put("/api/actions/:id", validateActionId, validateAction, (req, res) => {
    const { id } = req.params
    const updatedAction = req.body

    Actions.update(id, updatedAction).then((update) => {
        res.status(200).json(update)
    }).catch((error) => {
        res.status(500).json({message:"could not update the action."})
    })
})
// (5) - delete a project
server.delete("/api/projects/:id", validateId, (req, res) => {
    const { id } = req.params

    Projects.remove(id).then((num) => {
        if (num === 1) {
            res.status(200).json(num)
        } else {
            res.status(404).json({message:"A project with this id could not be found."})
        }
    }).catch((error) => {
        res.status(500).json({message:"The request could not be completed."})
    })
})
// (5a) - delete an action
server.delete("/api/actions/:id", validateActionId, (req, res) => {
    const { id } = req.params

    Actions.remove(id).then((num) => {
        res.status(200).json(num)
    }).catch((error) => {
        res.status(500).json({message:"This action could not be deleted."})
    })
})
// (6) - get all projects for an action
server.get("/api/projects/:id/actions", validateId, (req, res) => {
    const { id } = req.params

    Projects.getProjectActions(id).then((actions) => {
        if (actions.length === 0) {
            res.status(299).json({message:"This project has no actions."})
        } else {
            res.status(200).json(actions)
        }
    }).catch((error) => {
        res.status(500).json({message:"request could not be complete."})
    })
})
// initiate server
const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server listening on ${port}`))
// local middleware

// validate post 
function validateProject(req, res, next) {
    const newProject = req.body

    if (!newProject) {
        res.status(400).json({message:"Please create a project."})
    } else if (!newProject.name || !newProject.description) {
        res.status(400).json({message:"Please provide a name and a description."})
    } else {
        next()
    }  
}

function validateId(req, res, next) {
    const { id } = req.params

    Projects.get(id).then((proj) => {
        if (proj === null) {
            res.status(404).json({message:"A project with this id could not be found."})
        } else {
            next()
        }
    }).catch((error) => {
        res.status(500).json({message:"The request could not be complete."})
    })
}

function validateAction(req, res, next) {
    const newAction = req.body

    if (!newAction) {
        res.status(404).json({message:"Please provide a new action"})
    } else if (!newAction.description || !newAction.notes) {
        res.status(404).json({message:"Please provide a description and notes"})
    } else if (newAction.description.length > 128){
        res.status(409).json({message:"Your description is above 128 characters."})
    } else {
        next()
    }
}

function validateActionId(req, res, next) {
    const { id } = req.params

    Actions.get(id).then((action) => {
        if (action === null) {
            res.status(404).json({message:"An action with this id could not be found."})
        } else {
            next()
        }
    }).catch((error) => {
        res.status(500).json({message:"The request could not be complete."})
    })
}

// module.exports = {
//     validateProject,
//     validateId
// }