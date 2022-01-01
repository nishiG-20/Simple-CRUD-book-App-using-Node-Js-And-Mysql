const mysql = require("mysql");

//Database Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

exports.showBooks = (req, res) => {
    let newArrival = req.query.newarrival;
    let language = req.query.language;
    let bestseller = req.query.bestseller;
    let sort=req.query.sort
    let genre = req.params.genre;
    let options = "";
    let optionArr = [];

    if (language) {
        let languageArr = language.split(",");
        options = "WHERE language IN (?)";
        optionArr.push(languageArr);
    }

    if (newArrival) {
        options = options ? `${options} AND newArrival=?` : "  WHERE newArrival=?";
        optionArr.push(newArrival);
    }

    if (bestseller) {
        options = options ?
            `${options} AND  bestseller=?` :
            "  WHERE  bestseller=?";
        optionArr.push(bestseller);
    }

    if (genre) {
        options = options ? `${options} AND  genre=?` : " WHERE genre=?";
        optionArr.push(genre);
    }

    if(sort){
        options=options?` ${options} AND ORDER BY ? ASC`:' WHERE ORDER BY ? ASC'
        optionArr.push(sort)
    }

    let sql = `SELECT * FROM books_data ${options}`;

    connection.query(sql, optionArr, (err, result) => {
        if (err) {
            return res.status(401).send("Error in Fetching Data...");
        } else {
            return res.send(result);
        }
    });
};

exports.addNewBook = (req, res) => {
    let body = req.body;
    let sql1 = "SELECT * from books_data where name=?";
    connection.query(sql1, body.name, (err, result) => {
        if (err) {
            return res.status(401).send(err);
        } else {
            if (result.length > 0) {
                return res.status(404).send(`${body.name}: Book Name Already Exit`);
            } else {
                //Find Maximum Id
                let sql2 =
                    "SELECT bookid FROM books_data WHERE bookid >= (SELECT max(bookid) from books_data)";
                connection.query(sql2, (err, result) => {
                    if (err) {
                        return res.status(401).send("Error in finding Data...");
                    } else {
                        let newBookId = result[0].bookid + 1;
                        //Insert in to Table
                        let sql3 =
                            "INSERT INTO books_data(name,author,year,genre,newarrival,bestseller,language,publisher,price,blurb,description,avgrating,review,bookid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                        connection.query(
                            sql3, [
                                body.name,
                                body.author,
                                body.year,
                                body.genre,
                                body.newarrival,
                                body.bestseller,
                                body.language,
                                body.publisher,
                                body.price,
                                body.blurb,
                                body.description,
                                body.avgrating,
                                body.review,
                                newBookId,
                            ],
                            (err, result) => {
                                if (err) {
                                    return res.status(401).send("Error While  Adding Book..");
                                } else {
                                    return res.send(result)
                                }
                            }
                        );
                    }
                });
            }
        }
    });
};

exports.editBook = (req, res) => {
    let _id = req.params.id;
    let body = req.body;
    //Check Range of ID
    let sql1 = "SELECT max(bookid) as bookid from books_data";
    connection.query(sql1, (err, result) => {
        if (err) {
            return res.status(401).send(err);
        } else {
            let maxBookId = result[0].bookid;
            if (_id >= 1 && _id <= maxBookId) {
                let sql2 =
                    "UPDATE books_data SET name=?,author=?,year=?,genre=?,newarrival=?,bestseller=?,language=?,publisher=?,price=?,blurb=?,description=?,avgrating=?,review=? WHERE bookid=?";
                connection.query(
                    sql2, [
                        body.name,
                        body.author,
                        body.year,
                        body.genre,
                        body.newarrival,
                        body.bestseller,
                        body.language,
                        body.publisher,
                        body.price,
                        body.blurb,
                        body.description,
                        body.avgrating,
                        body.review,
                        _id,
                    ],
                    (err, result) => {
                        if (err) {
                            return res.status(401).send("Error While Updating Data..");
                        } else {
                            res.send("SuccessFully Updated..");
                        }
                    }
                );
            } else {
                return res.status(404).send("Invalid Id....");
            }
        }
    });
};

exports.deleteBook = (req, res) => {
    let _id = req.params.id;
    //Check Range of ID
    let sql1 = "SELECT max(bookid) as bookid from books_data";
    connection.query(sql1, (err, result) => {
        if (err) {
            return res.status(401).send(err);
        } else {
            let maxBookId = result[0].bookid;
            if (_id >= 1 && _id <= maxBookId) {
                let sql2 = "DELETE FROM books_data WHERE bookid=?";
                connection.query(sql2, _id, (err, result) => {
                    if (err) {
                        return res.status(401).send(err);
                    } else {
                        return res.send("Deleted Successfully...");
                    }
                });
            } else {
                return res.status(404).send("Invalid Id....");
            }
        }
    });
};

exports.showBookById = (req, res) => {
    let _id = req.params.id;
    let sql = "SELECT * from books_data WHERE bookid=?";
    connection.query(sql, _id, (err, result) => {
        if (err) {
            return res.status(401).send(err);
        } else {
            return res.send(result);
        }
    });
};