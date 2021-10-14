const express = require('express');
const reviewModel = require('./review.model');
const router = express.Router();
const reviewService = require('./review.service');

//routes
router.post('/authenticate', authenticate);
router.post('/add', add);
router.get('/', getAll);
// router.get('/current', getCurrent);
// router.get('/:id', getById);
// router.delete('/:id', _delete);
// if( !mongoose.Types.ObjectId.isValid(id) ) return false;

module.exports = router;

function authenticate(req, res, next) {
    reviewService.authenticate(req.body)
        .then(review => review ? res.json(review) : res.status(400).json({ message: 'Data incorrect' }))
        .catch(err => next(err));
        console.log('check');
}

function add(req, res, next) {
    console.log(req.body);
       reviewService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
        console.log('add');
}


// function add(req, res){
//     reviewService.create(res.body);
//     }

function getAll(req, res, next) {
    console.log('check');
    reviewService.getAll()
        .then(review => res.json(review))
        .catch(err => next(err));
         console.log('get worked');
}

//function getCurrent(req, res, next) {
//    reviewService.getById(req.review.sub)
//        .then(review => review ? res.json(review) : res.sendStatus(404))
//        .catch(err => next(err));
//}

//function getById(req, res, next) {
//    
//    reviewService.getById(req.params.id)
//    
//        .then(review => review ? res.json(review) : res.sendStatus(404))
//        .catch(err => next(err));
//}
//
//
//function _delete(req, res, next) {
//    console.log(res.params);
//    reviewService.delete(req.params.id)
//        .then(() => res.json({}))
//        .catch(err => next(err));
//        console.log('delete');
//}