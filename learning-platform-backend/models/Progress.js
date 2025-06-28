const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [Number],
  quizScores: [{
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    completedAt: Date
  }],
  progressPercentage: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);