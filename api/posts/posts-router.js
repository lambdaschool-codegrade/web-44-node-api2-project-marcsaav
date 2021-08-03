// implement your posts router here

const express = require('express')
const server = require('../server')

const postsRouter = express.Router()

const Posts = require('./posts-model')

// [GET] All Posts

server.get('/', async (req, res) => {
    try{
        const posts = await Posts.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})

// [GET] Post with specified ID
// [POST] New Post
// [PUT] Update Post with specified ID
// [DELETE] Post with specified ID
// [GET] Comments of Post with specified ID

module.exports = postsRouter
