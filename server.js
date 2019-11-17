const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = 4000;

let UserController = require('./controllers/user.controller');
let LoginController = require('./controllers/login.controller');
let PersonalDataController = require('./controllers/personal-data.controller');
let EducationController = require('./controllers/education-controller');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

routes.route('/users').get(UserController.handleGetAll);
routes.route('/users').post(UserController.handlePost);
routes.route('/login').post(LoginController.handleLogin);
routes.route('/personal-data').get(PersonalDataController.handleGet);
routes.route('/personal-data').post(PersonalDataController.handleUpdatePersonalData);
routes.route('/education/type/:type').get(EducationController.handleGetByType);
routes.route('/education').post(EducationController.handleCreate);
routes.route('/education/item/:itemId').delete(EducationController.handleDelete);
routes.route('/education/item/:itemId').put(EducationController.handleUpdate);

app.use('/cvs-inspt', routes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});