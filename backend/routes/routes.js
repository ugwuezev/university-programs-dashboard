const express = require('express');
const router = express.Router();

const { loginUser, registerUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')
const { getTweets} = require('../controllers/tweetController');
const { getUniversities, addUniversity, updateUniversity, deleteUniversity } = require('../controllers/universityController');
const { getKeywords, addKeyword, updateKeyword, deleteKeyword } = require('../controllers/keywordController');
const { getTests } = require('../controllers/testController');

// Tests
router.get('/tests', getTests);

router.get('/', (req, res) => {
    res.status(200).json({ message: "This is the default page" });
    });

router.get('/test', (req, res) => {
    res.status(200).json({ message: "Testing the routes" });
    });

router.get('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getMe)

router.get('/tweets', getTweets);

// university routes
router.get('/universities', getUniversities);
router.post('/universities', addUniversity);
router.put('/universities:id', updateUniversity);
router.delete('/universities:id', deleteUniversity);

//keyword routes
router.get('/keywords', getKeywords);
router.post('/keywords', addKeyword);
router.put('/keyword:id', updateKeyword);
router.delete('/keyword:id', deleteKeyword);


// will match any other path
router.use('/', (req, res) => {
    res.status(404).json({ error: "page not found" });
});


module.exports = router;