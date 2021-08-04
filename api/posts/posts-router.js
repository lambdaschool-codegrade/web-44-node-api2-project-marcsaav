// implement your posts router here

const express = require('express')

const postsRouter = express.Router()

const Posts = require('./posts-model')

// [GET] All Posts

postsRouter.get('/', async (req, res) => {
    try{
        const posts = await Posts.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})

// [GET] Post with specified ID

postsRouter.get('/:id', async (req, res) => {
    try {
        let { id } = req.params
        const post = await Posts.findById(id)
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
})

// [POST] New Post

postsRouter.post('/', async (req, res) => {
    try {
        let { title, contents } = req.body
        if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            const post = await Posts.insert(req.body)
            res.status(201).json({...req.body, ...post})
        }
    } catch(err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})

// [PUT] Update Post with specified ID


postsRouter.put('/:id', async (req, res) => {
    try {
        let { id } = req.params
        let { title, contents } = req.body
        let postToUpdate = await Posts.findById(id)
        if(!postToUpdate) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else if(!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            await Posts.update(id, req.body)
            res.status(200).json({id: Number(id), ...req.body})
        }
    } catch (err) {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

// [DELETE] Post with specified ID

postsRouter.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params
        let postToDelete = await Posts.findById(id)
        if(!postToDelete) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            await Posts.remove(id)
            res.status(200).json(postToDelete)
        }
    } catch(err) {
        res.status(500).json({ message: "The post could not be removed" })
    }
})


// [GET] Comments of Post with specified ID

module.exports = postsRouter
