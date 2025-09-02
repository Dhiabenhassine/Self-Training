const { QueryTypes } = require("sequelize");
const sequelize = require("../database");

const insertPackage = async (req, res) => {
  try {
    const { package_name, description, price, duration_in_days } = req.body;

    if (!package_name || !description || !price || !duration_in_days) {
      return res
        .status(400)
        .json({ error: "package_name, description, price, duration_in_days are required" });
    }

    const reqInsertPackage =
      "INSERT INTO Packages (package_name, description, price, duration_in_days) VALUES (?,?,?,?)";

    const resultReq = await sequelize.query(reqInsertPackage, {
      replacements: [package_name, description, price, duration_in_days],
      type: QueryTypes.INSERT,
    });

    return res
      .status(201)
      .json({ message: "Package inserted successfully", result: resultReq });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
const selectPackages= async (req,res)=>{
    try{
const selectQuery = 'SELECT * FROM Packages'
const resultQuery= await sequelize.query(selectQuery,{
    type : QueryTypes.SELECT
})
res.status(200).json(resultQuery)
    }catch(err){
        res.status(500).json('error select packages')
    }
}

module.exports = {
  insertPackage,
  selectPackages
};
