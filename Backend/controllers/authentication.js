const sequelize = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.JWT_EMAIL,
    pass: process.env.JWT_PASSWORD, 
  },
});

function generateToken(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let generate = "";

  for (let i = 0; i < length; i++) {
    const randomPwd = Math.floor(Math.random() * characters.length);
    generate += characters.charAt(randomPwd);
  }

  return generate;
}
const PasswordReinitialisationTokenCheck = async (req, res) => {
  try {
    const { Token } = req.body;

    if (Token) {
      const GetUserIDByToken = `
      SELECT UserId
      FROM ResetPassword
      WHERE Token = :Token 
      AND CreatedAt >= DATE_SUB(NOW(), INTERVAL 30 MINUTE);
      
      `;

      const ResGetUserIDByToken = await sequelize.query(GetUserIDByToken, {
        replacements: {
          Token: Token,
        },
        type: sequelize.QueryTypes.SELECT,
      });

      if (ResGetUserIDByToken && ResGetUserIDByToken.length > 0) {
        return res.status(200).send("Valid Token");
      } else {
        return res.status(404).send("Token not found or expired ! ");
      }
    } else {
      return res.status(400).send("Token is required");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
const UpdatePassword = async (req, res) => {
  try {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
  
    const { Token, Password } = req.body;

    if (Token) {
      const GetUserIDByToken = `
      SELECT UserId
      FROM ResetPassword
      WHERE Token = :Token 
      AND CreatedAt >= DATE_SUB(NOW(), INTERVAL 30 MINUTE);
      
      `;

      const ResGetUserIDByToken = await sequelize.query(GetUserIDByToken, {
        replacements: {
          Token: Token,
        },
        type: sequelize.QueryTypes.SELECT,
      });

      if (ResGetUserIDByToken && ResGetUserIDByToken.length > 0) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

       
        const updateRoleQuery = `
        UPDATE users
        SET Password = :Password 
        WHERE id_Users = :id_Users  
         `;

        const result = await sequelize.query(updateRoleQuery, {
          replacements: {
            Password: hashedPassword,
            id_Users  : ResGetUserIDByToken[0].UserId
          },
          type: sequelize.QueryTypes.UPDATE,
        });

        return res.status(200).send("Valid Token");
      } else {
        return res.status(404).send("Token not found or expired ! ");
      }
    } else {
      return res.status(400).send("Token is required");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
const PasswordReinitialisation = async (req, res) => {
  try {
    const { Email } = req.body;

    if (!Email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const query = "SELECT * FROM users WHERE Email = :Email";

    const results = await sequelize.query(query, {
      replacements: { Email: Email },
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length === 0) {
      return res.status(200).send("Done");
    } else {

      const ReinitialisationToken = generateToken(50);
      const queryregisteraccount = `INSERT INTO ResetPassword (UserId, Token )  VALUES (:UserId , :Token )`;

      const resregisteraccount = await sequelize.query(queryregisteraccount, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          UserId: results[0].id_Users ,
          Token: ReinitialisationToken
        },
      });
      const message = {
        from: 'dhiabenhssine123@gmail.com',
        to:  Email,
        subject: "Reset password",
        html: `<p>Click <a href="http://tahani.com/verify/${ReinitialisationToken}">here</a> to reset your password.</p>
            
            <p> Super Host</p>`,
      };
      transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(`Erreur lors de l'envoi de l'e-mail : ${error}`);
        } else {
            console.log("E-mail envoyé avec succès !");
        }
    });      return res.status(200).send("Email sent");


    }


  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const login=async(req,res)=>{
    try{
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }
        const [user] = await sequelize.query(
            "SELECT * FROM users WHERE Email = ?",
            {
                replacements: [Email],
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set");
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({ message: "Login successful", token,user });

    }catch(err){
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const register = async (req, res) => {
    try {
        const { Name, SurName, Email, Password, Phone } = req.body;

        if (!Name || !SurName || !Email || !Password || !Phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (typeof Password !== "string") {
            return res.status(400).json({ message: "Password must be a string" });
        }

        const [existingUser] = await sequelize.query(
            "SELECT * FROM Users WHERE Email = ? LIMIT 1",
            {
                replacements: [Email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const [result, metadata] = await sequelize.query(
            "INSERT INTO Users (Name, SurName, Email, Password, Phone, Role, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
            {
                replacements: [Name, SurName, Email, hashedPassword, Phone, "User", 0],
                type: sequelize.QueryTypes.INSERT
            }
        );

        const insertId = metadata && metadata.insertId ? metadata.insertId : result;

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set");
        }

        const token = jwt.sign({ id: insertId }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({ message: "User registered successfully", token });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    register,
    login,
    PasswordReinitialisation,
    PasswordReinitialisationTokenCheck,
    UpdatePassword
};