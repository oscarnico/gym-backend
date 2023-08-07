const Admmins = require("../models/admin");
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const checkAdmin = async (req, res) => {
//   const { mail, password } = req.body;
//   console.log(req.body)
//   const checkperson = await Admmins.findOne({ mail, password });
//   if (checkperson) {
//     res.json({success: true});
//   } else {
//     res.json({success: false});
//   }
// };

// module.exports = { checkAdmin };

const loginAdmin = async (req, res) => {
    console.log('entra')
    const { email, password } = req.body;

    try {
        const adminUser = await Admmins.findOne({ email });
        if (!adminUser) {
            console.log(res);
            return res.status(401).json({ error: "El email no es correcto"});
        }
        // const hash2 = await bcrypt.hash(adminUser.password, 10);
        const passworVeryf = await bcrypt.compare(password , adminUser.password)
        if (!passworVeryf) {
            return res.status(401).json({ error: "Contraseña errónea"})
        }
        
        const token = jwt.sign({ admin: adminUser.email, id: adminUser._id }, secret, { expiresIn: 300000});
        return res.json({ Message: "Inicio de sesión correcto", token })
    } catch (error) {
        res.status(500).json({ error: "Inicio de sesión incorrecta" });
    };
};

module.exports = { loginAdmin };
