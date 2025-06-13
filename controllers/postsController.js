const Post = require("../models/postsModel");
const { isValidObjectId } = require("mongoose");

//create new post
const createPost = async(req, res) =>{
    try{
        const {body} = req;
        if(!body.name || !body.authorId){
            return res.status(400).json({
                status: "Failure",
                message: "There is some missing data"
            })
        }


        const newPost = await Post.create({
                  name: body.name,
                  description: body.description,
                  authorId:body.authorId
        });
        res.status(201).json({
            status: "Success",
            message: "Post Created Succssesfully",
            data: newPost
        });
    }catch(err){
        res.status(500).json({
            status: "Failure",
            message:"Internal Server Error"
        });
    }
};


//Get all posts
const getAllPosts = async(req, res) => {
    try{
    const posts = await Post.find({},{name: 1, description: 1, _id: 0 });
    res.status(200).json({
        status:"success",
        message:"Posts fetched successfully",
        data: posts
    }) ;
}catch(err){
    res.status(500).json({
                    status: "Failure",
            message:"Internal Server Error",
            //error: err
    });
}
}


//Get a Post By ID
const getPost = async(req, res) => {
    try{
    const { id } = req.params;
 if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "Failure",
      message: "Invalid post id",
    });
  }
    const post = await Post.findOne({ _id: id }, { name: 1, description: 1 });
  if (!post) {
    return res.status(404).json({
      status: "Failure",
      message: "Post not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Post fetched successfully",
    data: post,
  });

    }catch(err){
        res.status(500).json({
            status: "Failure",
            message:"Internal Server Error",
                       // error: err

        });
    }
}


//Update a post
const updatePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {body} = req;
          if (!body.name) {
    return res.status(400).json({
      status: "Failure",
      message: "Name is Required",
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "Failure",
      message: "Invalid post id",
    });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
{
    name: body.name,
    description: body.description
},
{new:true});

  if (!updatePost) {
    return res.status(404).json({
      status: "Failure",
      message: "Post not found",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Post updated successfully",
    data: updatedPost
  });


    }catch(err){
               res.status(500).json({
            status: "Failure",
            message:"Internal Server Error"
        });

    }
}


//Delete Post
const deletePost = async(req,res)=>{
    try{
        const {id} = req.params;
          if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "Failure",
      message: "Invalid post id",
    });
  }

  const delPost = await Post.findOneAndDelete({_id:id});

    if (!delPost) {
    return res.status(404).json({
      status: "Failure",
      message: "Post not found",
    });
  }

res.status(204).send();
    }catch(err){
        res.status(500).json({
      status: "Failure",
      message: "Invalid post id",
    });
    }
}

module.exports = {createPost, getAllPosts,getPost,updatePost,deletePost};