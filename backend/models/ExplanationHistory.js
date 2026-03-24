const mongoose = require('mongoose');

const ExplanationHistorySchema = new mongoose.Schema({
    codeSnippet: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    explanation: {
        type: Object, // Will contain lineByLine, complexity, edgeCases, eli5
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ExplanationHistory', ExplanationHistorySchema);
