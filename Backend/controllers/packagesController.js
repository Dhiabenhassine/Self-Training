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
const selectPackageById= async(req,res)=>{
  try{
const {package_id }=req.body
const selectQueryId= 'SELECT * FROM Packages WHERE package_id =package_id '
const resultSelect = await sequelize.query(selectQueryId,{
  replacements:{
    package_id :package_id 
  },
  type: QueryTypes.SELECT
})
res.status(200).json(resultSelect)
  }catch(err){
            res.status(500).json('error select packages')
  }
}
const updatePackage = async (req, res) => {
  try {
    const { package_id, package_name, description, price, duration_in_days } = req.body;

    const selectPack = 'SELECT * FROM Packages WHERE package_id = :package_id';
    const resultSelectPack = await sequelize.query(selectPack, {
      replacements: { package_id },
      type: QueryTypes.SELECT,
    });

    if (resultSelectPack.length === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    const updateQuery = `
      UPDATE Packages 
      SET package_name = :package_name, 
          description = :description, 
          price = :price, 
          duration_in_days = :duration_in_days
      WHERE package_id = :package_id
    `;

    await sequelize.query(updateQuery, {
      replacements: { package_id, package_name, description, price, duration_in_days },
      type: QueryTypes.UPDATE,
    });

    res.status(200).json({ message: "Package updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating package" });
  }
};
module.exports = {
  insertPackage,
  selectPackages,
  selectPackageById,
  updatePackage
};
