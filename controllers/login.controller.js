let User = require('../model/user.model');
let crypto = require('crypto');

module.exports = {

    handleLogin: (req, res) => {
        let user = new User(req.body);
        let encodedPassword = crypto.createHash('sha256').update(user.get('password')).digest('hex');

        User.findOne({'username': user.get('username'),'password': encodedPassword},
                    "username name lastname idNumber",
                        (err, userDb) => {
                            if(err) {
                                console.log(err);
                            } else if(!userDb) {
                                res.status(401).send('Wrong username or password');
                            } else {
                                res.status(200).json(userDb);
                            }
                        });
    }

}