const db = require('_helpers/db');
const Review = db.Review;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config.json');


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    delete: _delete
};

async function authenticate({ bookname }) {
    const review = await Review.findOne({ bookname });
    if (review && bcrypt.compareSync(authorname, review.hash)) {
        const token = jwt.sign({ sub: review.id }, config.secret, { expiresIn: '7d' });
        return {
            ...review.toJSON(),
            token
        };
    }
}

async function getAll() {
    
    return await Review.find();
    
   
}

async function getById(id) {
    return await Review.findById(id);
}

async function create(reviewParam) {
       
    const review = new Review(reviewParam);
    if (reviewParam.bookname) {
        review.hash = bcrypt.hashSync(reviewParam.bookname, 10);
    }
    await review.save();
    console.log('check');
}

async function _delete(id) {
    await Review.findByIdAndRemove(id);
}