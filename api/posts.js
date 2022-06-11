const express = require('express')
const postRouter = express.Router()
const Post = require('../models/Post')

postRouter.post('/newpost', (req, res) => {
	console.log('Post to add: ', req.body)
	
	const newPost = new Post({
		title: req.body.title,
		content: req.body.content,
		isCool: req.body.isCool
	})
	
	newPost.save((error, documents) => {
		if (error) {
			res.status(500).json({
				message: 'Nah man! Some kind of error occured while saving post.'
			})
		} else {
			res.status(201).json({
				message: 'Alright alright alright! Post was saved successfully.',
				post: documents
			})
		}
	})
})

postRouter.get('/getposts', (req, res) => {
	Post.find({}, (error, documents) => {
		if (error) {
			res.status(500).json({
				message: 'Oops! Error! Something went wrong while getting the posts.'
			})
		} else {
			res.status(200).json({ posts: documents })
		}
	})
})

postRouter.put('/updatepost/:id', (req, res) => {
	Post.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			content: req.body.content,
			isCool: req.body.isCool
		},
		(error, documents) => {
			if (error) {
				res.status(500).json({
					message: 'Oh no! An error happened while updating post.'
				})
			} else {
				res.status(200).json({
					message: 'Yes sir! Post was updated.',
					oldPost: documents,
					updatedPost: req.body
				})
			}
		}
	)
})

postRouter.delete('/deletepost/:id', (req, res) => {
	Post.findByIdAndDelete(req.params.id, (error, documents) => {
		if (error) {
			res.status(500).json({
				message: 'Dang it! Error while trying to delete post.'
			})
		} else {
			res.status(200).json({
				message: 'You did it! Post was deleted.',
				deletedPost: documents
			})
		}
	})
})

module.exports = postRouter