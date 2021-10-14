const mongoose = require('mongoose');
//const { Review } = require('../_helpers/db');


const ReviewSchema = new mongoose.Schema({
    bookname: { type: String, unique: true, required: true },
       hash: { type: String, required: true },
    authorname: { type: String, required: true },
    review: { type: String, required: true },
     createdDate: { type: Date, default: Date.now }
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.hash;
//     }
// });

module.exports = mongoose.model('Reviews', ReviewSchema);
