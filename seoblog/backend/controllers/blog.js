const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const Blog = require("../models/blog");
const Category = require("../models/category");
const Tag = require("../models/tag");
const { errorHandler   } = require("../helpers/dbErrorHandler");
const {smartTrim} = require('../helpers/blog')
exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req,  async(err, fields, files)  => {
    try {
    if (err) {
      return res.status(400).json({ error: "Image could not upload" });
    }
    const { title, body, categories, tags } = fields;

    if (!title || !title.length ===0) {
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
      return res
        .status(400)
        .json({ error: "At least one tag is required." });
    }

    
      let blog = new Blog();
      blog.title = title;
      blog.body = body; h  
      blog.excerpt = smartTrim(body, 320,' ','...')
      blog.slug = slugify(title).toLowerCase();
      blog.mtitle = `${title} | ${process.env.APP_NAME}`;
      blog.mdesc = stripHtml(body.substring(0, 160)).result;
      blog.postedBy = req.user._id;
    
      let arrayOfCategories = categories && categories.split(',')
      let arrayOfTags = tags && tags.split(',')
      if (files.photo) {
        if (files.photo.size > 1000000) { 
          res.status(400).json({
            error: "Image should be les than 1mb in size",
          });
        }
        blog.photo.data = fs.readFileSync(files.photo.path);
        blog.contentType = files.photo.type;
      }
      const newBlog = await blog.save()  
       await Blog.findByIdAndUpdate(newBlog._id, {$push:{categories:arrayOfCategories}},{new:true})

      const updateBlog2 = await Blog.findByIdAndUpdate(newBlog._id, {$push:{tags:arrayOfTags}},{new:true})
      return res.status(201).json(updateBlog2)
    } catch (error) {
      return res.status(400).json({
        error: errorHandler(error) || error,
      });
    }
    
    

    
    
    
    
    
    
    
    
  });
};
