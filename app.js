const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit Eaquej debitis natus, veniam ad vitae iste exercitationem numquam doloremmodi possimus consectetur saepe accusantium quisquam quidem, hicullam aliquid. Vel, itaque.";
const aboutContent =
  " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,debitis natus, veniam ad vitae iste exercitationem numquam doloremmodi possimus consectetur saepe accusantium quisquam quidem, hicsullam aliquid. Vel, itaque.";
const contactContent =
  " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,debitis natus, veniam ad vitae iste exercitationem numquam doloremmodi possimus consectetur saepe accusantium quisquam quidem, hicullam aliquid. Vel, itaque.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let posts = [];

// app.get("/", function (req, res) {
//   res.render("home", { startingPoint: homeStartingContent, posts: posts });
// });

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

// app.get("/compose", function (req, res) {
//   res.render("compose");
// });

// app.post("/compose", function (req, res) {
//   const post = {
//     title: req.body.postTitle,
//     content: req.body.postBody,
//   };

//   posts.push(post);
//   res.redirect("/");
// });

// app.get("/posts/:postName", function (req, res) {
//   const requestedTitle = _.lowerCase(req.params.postName);

//   posts.forEach(function (post) {
//     const storedTitle = _.lowerCase(post.title);

//     if (storedTitle === requestedTitle) {
//       res.render("post", {
//         title: post.title,
//         content: post.content,
//       });
//     }
//   });
// });

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutPage: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactPage: contactContent });
});

app.listen(3000, function (req, res) {
  console.log("server started at port 3000...");
});
