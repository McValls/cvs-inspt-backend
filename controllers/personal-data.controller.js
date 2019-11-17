let PersonalData = require('../model/personal_data.model');
let User = require('../model/user.model');

module.exports = {

    handleGet: (req, res) => {
        let userId = req.header("userId");
        PersonalData.findOne({user: userId}, (err, pd) => {
            if(err) {
                console.log(err);
                res.status(404).send(err);
            } else {
                res.status(200).send(pd);
            }
        })
    },
    handleUpdatePersonalData: (req, res) => {
        console.log("Trying to update data: " + req.body);
        let userId = req.header("userId");

        User.findById(userId, (err, userDb) => {
            if(err) {
                res.status(404).send("No user founded!");
            } else {
                PersonalData.updateOne({user: userDb._id}, req.body, (err, pd) => {
                    if(err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        if(pd && pd.n > 0) {
                            console.log("Successfuly updated: " + JSON.stringify(pd));
                            res.status(200).send("Updated successfuly");
                        } else {
                            module.exports.createPersonalData(res, userId, req.body);
                        }
                        
                    }
                });
            }
        });
    },
    createPersonalData: (res, userId, personalData) => {
        let user = null;
        User.findById(userId, (err, userDb) => {
            if(err) {
                res.status(404).send("User not found!");
            } else {
                console.log(JSON.stringify(userDb));
                personalData.user = userDb._id;
                PersonalData.create(personalData, (err, pd) => {
                        if(err) {
                            console.log(err);
                            res.status(500).send(err);
                        } else {
                            console.log("Successfuly created: " + JSON.stringify(pd));
                            res.status(200).send("Updated successfuly");
                        }
                    });
            }
        });
    }

}