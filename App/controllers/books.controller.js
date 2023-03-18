const path = require('path');
const booksModel = require(path.join(__dirname, '../model/books.model'));

exports.create = (req, res) => {

    if (!req.body.title || req.body.title == " ") {
        res.status(400).json({ message: "Title cannot be empty" })
    }

    const { title, author, published, price } = req.body;

    const book = new booksModel({ title, author, published: published ? published : false, price })

    book.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating book" })
        })

}

exports.fetchAll = (req, res) => {
    booksModel.find()
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

exports.fetchOne = (req, res) => {

    var _id = req.params.id;
    booksModel.findById(_id, {})
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })

}

exports.update = (req, res) => {

    var _id = req.params.id;

    // console.log("Requesttt", req);

    const userRole = req.user.role;

    if (userRole != 'admin') {
        res.status(403).send({ message: "Only admin users are allowed to do this operation" })
    }

    booksModel.findByIdAndUpdate(_id, req.body, {})
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

exports.deleteOne = (req, res) => {

    var _id = req.params.id;

    booksModel.findByIdAndRemove(_id, {})
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })

}

exports.deleteAll = (req, res) => {
    booksModel.deleteMany({})
        .then(data => {
            res.send({ message: "Books deleted successfully" })
        })
}





