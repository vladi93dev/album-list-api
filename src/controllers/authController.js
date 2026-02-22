import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';


const register = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const userFound = await prisma.user.findUnique({ where: { email: email }});
        
        if(userFound) {
            return res.json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            status: "Created",
            data: {
                id: newUser.id,
                name: newUser.name,
                email: email,
            }
        });
    } catch(error) {
        res.status(400).json({message: `Error registering: ${error}` })
    }
}
const login = async() => {
    const userExists = prisma.user.findUnique({ where: { email: email }});
    
    if(!userExists) {
        res.status(400).json({message: "User not found"});
    }

    


};








export { login, register };