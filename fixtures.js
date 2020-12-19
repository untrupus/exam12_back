const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Photo = require("./models/Photo");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");
        await db.dropCollection("photos");
    } catch (e) {
        console.log("Collection were not presented!");
    }

    const [user, user1] = await User.create({
        email: "asd@asd.asd",
        password: "123",
        token: nanoid(),
        displayName: "Vegard",
        avatarImage: "avatar.png"
    }, {
        email: "qwe@qwe.qwe",
        password: "123",
        token: nanoid(),
        displayName: "user1"
    });

    await Photo.create({
            title: "Nature",
            image: "1.jpg",
            user: user._id
        }, {
            title: "Landscape",
            image: "2.jpeg",
            user: user._id
        }, {
            title: "Nature",
            image: "3.jpg",
            user: user._id
        },
        {
            title: "Landscape",
            image: "4.jpeg",
            user: user._id
        }, {
            title: "Nature",
            image: "5.jpg",
            user: user1._id
        }, {
            title: "Landscape",
            image: "6.jpeg",
            user: user1._id
        }, {
            title: "Landscape",
            image: "7.jpg",
            user: user1._id
        }, {
            title: "Nature",
            image: "8.jpg",
            user: user1._id
        }, {
            title: "Landscape",
            image: "9.jpg",
            user: user._id
        });

    db.close();
});