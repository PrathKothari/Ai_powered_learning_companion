const mongoose = require('mongoose');
const PostSchema = require('../models/Post').schema;
const CommentSchema = require('../models/Comment').schema;

const connections = {};

function getChannelDb(channelName) {
  if (!connections[channelName]) {
    // Each channel gets its own DB, e.g., userDB_channel1
    const dbName = `userDB_${channelName}`;
    const conn = mongoose.createConnection(`mongodb://localhost:27017/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connections[channelName] = {
      conn,
      Post: conn.model('Post', PostSchema),
      Comment: conn.model('Comment', CommentSchema),
    };
  }
  return connections[channelName];
}

module.exports = { getChannelDb };
