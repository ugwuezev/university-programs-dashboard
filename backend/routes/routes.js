const express = require('express');
const router = express.Router();

const { loginUser, registerUser, getMe } = require('../controllers/userController');
const { searchKeyword, searchUniversity } = require('../controllers/search');
const { protect } = require('../middleware/authMiddleware')
const { getTweets} = require('../controllers/tweetController');
const { getUniversities} = require('../controllers/universityController');
const { getKeywords} = require('../controllers/keywordController');
const { getTests } = require('../controllers/testController');


// Tests
router.get('/tests', getTests);
router.get('/tweets', getTweets);
router.get('/uni', getUniversities);
router.get('/key', getKeywords);


router.get('/', (req, res) => {
    res.status(200).json({ message: "This would be modified to contain tweets" });
    });

router.get('/test', (req, res) => {
    res.status(200).json({ message: "Testing the routes" });
    });

router.get('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getMe)

router.get('/keywords', searchKeyword);

router.get('/universities', searchUniversity);



// router.get('/tweets', searchUniversity);



// will match any other path
router.use('/', (req, res) => {
    res.status(404).json({ error: "page not found" });
});


module.exports = router;