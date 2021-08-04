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
// [DELETE] Post with specified ID
// [GET] Comments of Post with specified ID

module.exports = postsRouter
