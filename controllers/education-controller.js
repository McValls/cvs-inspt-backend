let EducationItem = require('../model/education_item.model');
let User = require('../model/user.model');

module.exports = {

    handleGetByType: (req, res) => {
        let type = req.params.type;
        console.log("Type: " + type);
        let userId = req.header("userId");
        console.log("userId: " + userId);

        EducationItem.find({user: userId}, (err, educationItems) => {
            if(err) {
                res.status(500).send("Internal error: " + err);
            } else {
                console.log(JSON.stringify(educationItems));
                let response = educationItems.filter(item => item.itemType === type);
                res.status(200).send(response);
            }
        });
    },

    handleUpdate: (req, res) => {
        let itemId = req.params.itemId;

        EducationItem.findByIdAndUpdate(itemId, req.body, (err, item) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(item);
            }
        })
    },

    handleCreate: (req, res) => {
        let item = new EducationItem(req.body);
        if(req.header("userId") == null) {
            throw new Error();
        }
        item.user = req.header("userId");

        EducationItem.create(item, (err, itemDb) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(itemDb._id);
            }
        })
    },

    handleDelete: (req, res) => {
        let itemId = req.params.itemId;

        EducationItem.findByIdAndDelete(itemId, (err) => {
            if(err) {
                res.status(500).send(err);
                console.log("BORRADO CON ERROR");
            } else {
                res.status(200).send("OK");
                console.log("BORRADO OK");
            }
        })
    }

}