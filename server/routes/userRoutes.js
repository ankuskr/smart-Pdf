const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { upload, uploadSignature } = require('../controllers/upload.controller');
router.post('/', upload.single('signature'), userController.createUser);
router.post('/', userController.createUser)
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/uploadSignature', upload.single('signature'), uploadSignature);

module.exports = router;
