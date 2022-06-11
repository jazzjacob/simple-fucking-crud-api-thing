const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	isCool: {
		type: Boolean,
		required: true
	}
})

module.exports = mongoose.model('Post', PostSchema)