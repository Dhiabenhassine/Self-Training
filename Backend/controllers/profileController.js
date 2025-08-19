const sequelize = require("../database");

const selectPrpfile= async (req, res) => {
    try{

    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
}

module.exports = {
}