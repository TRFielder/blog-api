const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  techs: [
    {
      type: String,
      enum: [
        'react',
        'firebase',
        'git',
        'jest',
        'javascript',
        'typescript',
        'nextjs',
        'mongodb',
        'nodejs',
        'express',
        'pug',
      ],
    },
  ],
  description: { type: String, required: true },
  repository: { type: String, required: true },
  live_demo: { type: String, required: true },
  published: { type: Boolean, default: false },
});

module.exports = mongoose.model('Project', ProjectSchema);
