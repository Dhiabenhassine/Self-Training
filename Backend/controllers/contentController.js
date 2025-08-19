const sequelize = require("../database");

const insertContent = async(req,res)=>{
    try{
const {NameContent,Content,Description}=req.body;
        if(!NameContent || !Content || !Description){
            return res.status(400).send("All fields are required");
        }
        const queryContent= `INSERT INTO posts (NameContent, Content, Description) VALUES (:NameContent, :Content, :Description)`;  
        const resultQuery = await sequelize.query(queryContent, {
            replacements: { 
                NameContent: NameContent,
                Content: Content,
                Description: Description
            },
            type: sequelize.QueryTypes.INSERT,
        });
        const userId = resultQuery[0].id_Users;
        return res.status(201).json({ message: "Content inserted successfully", userId });
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
}

const selectAllContent = async(req,res)=>{
    try{
        const selectQuery=`SELECT * FROM posts`
        const resultSelect= await sequelize.query(selectQuery, {
            type: sequelize.QueryTypes.SELECT,
        });
        return res.status(200).json(resultSelect);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
}
const selectContentById = async(req, res) => {
    const {id_Posts}=req.body;
    try{
const querySelectById = `SELECT * FROM posts WHERE id_Posts = :id_Posts`;
const results = await sequelize.query(querySelectById, {
    replacements: { id_Posts: id_Posts },
    type: sequelize.QueryTypes.SELECT,
});
if (results.length > 0) {   
    return res.status(200).json(results[0]);
}
return res.status(404).json({ message: "Content not found" });
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
}
module.exports = {
    insertContent,
    selectAllContent,
    selectContentById
    };