const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
       
    },
    description:{
        type: String,
        required: false,
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User',

    },

}, {timestamps:true});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;