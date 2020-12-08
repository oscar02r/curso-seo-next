const formidable = require("formidable");
const _ = require("lodash");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const fs = require("fs");
const Blog = require("../models/blog");
const User = require('../models/user')
const Category = require("../models/category");
const Tag = require("../models/tag");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { smartTrim } = require("../helpers/blog");
const stringStripHtml = require("string-strip-html");


exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).json({ error: "Image could not upload" });
      }
      const { title, body, categories, tags } = fields;

      if (!title || !title.length === 0) {
        return res.status(400).json({ error: "Title is requied." });
      }
      if (!body || body.length < 200) {
        return res.status(400).json({ error: "Content is to short." });
      }
      if (!categories || categories.length === 0) {
        return res
          .status(400)
          .json({ error: "At least one category is required." });
      }
      if (!tags || tags.length === 0) {
        return res.status(400).json({ error: "At least one tag is required." });
      }

      let blog = new Blog();
      blog.title = title;
      blog.body = body;
      blog.excerpt = smartTrim(body, 320, " ", "...");
      blog.slug = slugify(title).toLowerCase();
      blog.mtitle = `${title} | ${process.env.APP_NAME}`;
      blog.mdesc = stripHtml(body.substring(0, 160)).result;
      blog.postedBy = req.user._id;

      let arrayOfCategories = categories && categories.split(",");
      let arrayOfTags = tags && tags.split(",");
      if (files.photo) {
        if (files.photo.size > 1000000) {
          res.status(400).json({
            error: "Image should be les than 1mb in size",
          });
        }
        blog.photo.data = fs.readFileSync(files.photo.path);
        blog.contentType = files.photo.type;
      }
      const newBlog = await blog.save();
      await Blog.findByIdAndUpdate(
        newBlog._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      );

      const updateBlog2 = await Blog.findByIdAndUpdate(
        newBlog._id,
        { $push: { tags: arrayOfTags } },
        { new: true }
      );
      return res.status(201).json(updateBlog2);
    } catch (error) {
      return res.status(400).json({
        error: errorHandler(error) || error,
      });
    }
  });
};

// list, litsAllBlogsCategoiesTags, read, remove, update
exports.list = (req, res) => {
  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.litsAllBlogsCategoiesTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs;
  let categories;
  let tags;

  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username prifile")
    .sort({ createAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      blogs = data;
      // Get all categories
      Category.find({}).exec((err,c) => {
          if (err) {
            return res.json({
              error: errorHandler(err),
            });
          }
          categories = c; //All categories
          //ger all tags
          Tag.find({}).exec((err, t) => {
            if (err) {
              return res.json({
                error: errorHandler(err),
              });
            }
            tags = t; // All tags
            //return all blogs categries tags
            res.json({ blogs, categories, tags, size: blogs.length });
          });
        })
      
    });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error:'Error servidor' //errorHandler(err),
        });
      }
      res.json(data);
    });
};
exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Blog deleted successfuly. " });
  });
};

exports.update = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  let oldBlog = await Blog.findOne({ slug });

  if (!oldBlog) {
    return res.status(400).json({ error: 'Blog do not exits.' });
  }

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).json({ error: "Image could not upload" });
      }

      let slugBeforeMerge = oldBlog.slug;
      oldBlog = _.merge(oldBlog, fields);
      oldBlog.slug = slugBeforeMerge;
      const { body, desc, categories, tags } = fields;

      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, " ", " ...");
        oldBlog.des = stringStripHtml(body.substr(0, 160));
      }
      if (categories) {
        oldBlog.categories = categories.split(",");
      }
      if (tags) {
        oldBlog.tags = tags.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 1000000) {
          res
            .status(400)
            .json({ error: "Image should be les than 1mb in size" });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.contentType = files.photo.type;
      }
      const updateBlog = await oldBlog.save();

      return res.status(201).json(updateBlog);
    } catch (error) {
      return res.status(400).json({ error: errorHandler(error) || error });
    }
  });
};

exports.photo = async (req, res)=>{
  const slug = req.params.slug.toLowerCase();
  try {
   const blog = await Blog.findOne({slug}).select('photo')
 
     res.set('Content-Type', blog.photo.contentType)
     return res.send(blog.photo.data)
 
  } catch (err) {
    return res.status(400).json(errorHandler(err))
  }


}

exports.listRelated = (req, res)=>{
    let limit = req.body.limit ? parseInt(req.body.limit) : 3
    const { _id, categories } = req.body.blog

    Blog.find({_id:{ $ne:_id}, categories:{$in:categories}})
        .limit(limit)
        .populate('postedBy', '_id name username profile')
        .select('title slug excerpt postedBy createdAt updatedAt')
        .exec((err, blogs)=>{
            if (err) {
                return res.status(400).json({error: 'Blog not found.'})
            }
            res.json(blogs)
        })


}

exports.listSearch = async (req, res) =>{
     
     let {search} = req.query
     if (search) {
      try {
        const blogs =  await Blog.find({
          $or:[{title:{$regex:search, $options:'i'}}, {body:{$regex:search, $options:'i'}}]
        }).select('-photo -body')
       console.log(blogs)
      res.status(200).json(blogs)
        
       
       } catch (err) {
        res.status(400).json({error:errorHandler(err)})
       }
     }else{
       res.status(200).json([])
     }

}

exports.listByUser = async (req, res)=>{
    const {username} = req.params
   try {
     const user = await User.findOne({username})
     const userId = user._id

     const blogs = await Blog.find({postedBy:userId})
                             .populate('categories', '_id name slug') 
                             .populate('tags', '_id name slug')
                             .populate('postedBy', '_id name username')
                             .select('_id title slug postedBy createdAt updatedAt')
     res.status(200).json(blogs)
   } catch (err) {
     res.status(400).json({error:errorHandler(err)})
   }
}