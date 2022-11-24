const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/TeleZa", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected To Database"))
    .catch((err) => console.log(err));
