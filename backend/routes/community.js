const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');
const { getChannelDb } = require('../utils/channelDb');

// Get all channels
router.get('/channels', async (req, res) => {
  const channels = await Channel.find();
  res.json(channels);
});

// Get posts for a channel (per-channel DB)
router.get('/channels/:channelId/posts', async (req, res) => {
  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  const { Post } = getChannelDb(channel.name);
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Create a post in a channel (per-channel DB)
router.post('/channels/:channelId/posts', async (req, res) => {
  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  const { Post } = getChannelDb(channel.name);
  const { author, title, content } = req.body;
  const post = new Post({ author, title, content });
  await post.save();
  res.status(201).json(post);
});

// Upvote a post (per-channel DB)
router.post('/channels/:channelId/posts/:postId/upvote', async (req, res) => {
  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  const { Post } = getChannelDb(channel.name);
  const post = await Post.findByIdAndUpdate(req.params.postId, { $inc: { upvotes: 1 } }, { new: true });
  res.json(post);
});

// Get comments for a post (per-channel DB, supports nested tree)
router.get('/channels/:channelId/posts/:postId/comments', async (req, res) => {
  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  const { Comment } = getChannelDb(channel.name);
  // Fetch all comments for the post
  const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 });
  // Build a tree structure
  const commentMap = {};
  comments.forEach(c => commentMap[c._id] = { ...c.toObject(), children: [] });
  const tree = [];
  comments.forEach(c => {
    if (c.parentId) {
      commentMap[c.parentId]?.children.push(commentMap[c._id]);
    } else {
      tree.push(commentMap[c._id]);
    }
  });
  res.json(tree);
});

// Add a comment to a post (per-channel DB, supports nested comments)
router.post('/channels/:channelId/posts/:postId/comments', async (req, res) => {
  const channel = await Channel.findById(req.params.channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  const { Comment } = getChannelDb(channel.name);
  const { author, content, parentId } = req.body; // parentId is optional for nested comments
  const comment = new Comment({ post: req.params.postId, author, content, parentId: parentId || null });
  await comment.save();
  res.status(201).json(comment);
});

module.exports = router;
