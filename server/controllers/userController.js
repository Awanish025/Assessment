const users = require("../models/userSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Register User
exports.userpost = async (req, res) => {
    const file = req.file ? req.file.filename : "";
    const { firstname, lastname, email, mobile, gender, location, status } = req.body;

    if (!firstname || !lastname || !email || !mobile || !gender || !location || !status || !file) {
        return res.status(400).json("All inputs are required");
    }

    try {
        const preuser = await users.findOne({ email: email });
       
        if (preuser) {
            return res.status(409).json("User already exists");
        } else {
            const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            const userData = new users({
                firstname, lastname, email, mobile, gender, location, status,
                profile: file,
                dateCreated
            });
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("catch block error", error);
    }
};

// Get all users
exports.userget = async (req, res) => {
    const search = req.query.search || "";
    const gender = req.query.gender || "";
    const status = req.query.status || "";
    const sort = req.query.sort || "";
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 5;

    const query = {
        firstname: { $regex: search, $options: "i" }
    };

    if (gender !== "All" && gender !== "") {
        query.gender = gender;
    }

    if (status !== "All" && status !== "") {
        query.status = status;
    }

    try {
        const count = await users.countDocuments(query);
        const usersdata = await users.find(query)
            .sort({ createdAt: -1 })
            .limit(ITEM_PER_PAGE)
            .skip((page - 1) * ITEM_PER_PAGE);

        const pageCount = Math.ceil(count / ITEM_PER_PAGE);

        res.status(200).json({
            Pagination: {
                count, pageCount
            },
            usersdata
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Single user get
exports.singleuserget = async (req, res) => {
    const { id } = req.params;
    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Edit user
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile;

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            firstname, lastname, email, mobile, gender, location, status,
            profile: file,
            dateUpdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteuser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update status
exports.userstatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const userupdate = await users.findByIdAndUpdate({ _id: id }, { status: status }, { new: true });
        res.status(200).json(userupdate);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Export to CSV
exports.userexport = async (req, res) => {
    try {
        const usersdata = await users.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("public/files/export")) {
            if (!fs.existsSync("public/files")) {
                if (!fs.existsSync("public")) {
                    fs.mkdirSync("public");
                }
                fs.mkdirSync("public/files");
            }
            fs.mkdirSync("public/files/export");
        }

        const writablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: `${BASE_URL}/files/export/users.csv`,
            });
        });

        if (usersdata.length > 0) {
            usersdata.map((user) => {
                const dateCreated = user.createdAt ? moment(user.createdAt).format("YYYY-MM-DD") : "-";
                csvStream.write({
                    FirstName: user.firstname ? user.firstname : "-",
                    LastName: user.lastname ? user.lastname : "-",
                    Email: user.email ? user.email : "-",
                    Phone: user.mobile ? user.mobile : "-",
                    Gender: user.gender ? user.gender : "-",
                    Status: user.status ? user.status : "-",
                    Profile: user.profile ? user.profile : "-",
                    Location: user.location ? user.location : "-",
                    DateCreated: dateCreated
                });
            });
        }
        csvStream.end();
        writablestream.end();
    } catch (error) {
        res.status(500).json(error);
    }
};
