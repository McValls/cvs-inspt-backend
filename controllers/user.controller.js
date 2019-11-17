let User = require('../model/user.model');
let crypto = require('crypto');

module.exports = {
    handleGetAll: (req, res) => {
        User.find(null, "username name lastname idNumber", (err, users) => {
            if(err) {
                console.log(err);
            } else {
                res.json(users);
            }
        });
    },
    handlePost: (req, res) => {
        let user = new User(req.body);
        user.set('password', crypto.createHash('sha256').update(user.get('password')).digest('hex'));
        user.save()
            .then(user => res.status(200).json({'status': 'OK!'}))
            .catch(err => {
                console.log(err);
                res.status(400).send("No user created " + err);
            })
    }
}

