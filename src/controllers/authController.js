import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/generateToken.js';


const register = async(req, res) => {
    const { name, email, password } = req.validated;

    try {
        const userFound = await prisma.user.findUnique({ where: { email: email }});
        
        if(userFound) {
            return res.status(409).json({message: "User already exists"});
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
        
        generateToken(newUser.id, res)

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: email,
        });
    } catch(error) {
        res.status(400).json({message: `Error registering: ${error}` })
    }
}

const login = async(req, res) => {
    try{
        const { email, password } = req.validated;

        const userExists = await prisma.user.findUnique({ where: { email: email }});
    
        if(!userExists) {
            return res.status(400).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: "password is not valid"});
        }
        
        return res.status(200).json({
            status: "success",
            user: {
                id: userExists.id,
                name: userExists.name,
                email: userExists.email
            },
            token: generateToken(userExists.id, res)
        });
    } catch(error) {
        console.log(error.message);
        res.json({message: `Error: ${error}`});
    }   
};


const me = async(req, res) => {
    try {
         const user = await prisma.user.findUnique({where: {
            id: req.user.userId
        }});

        if(!user) {
            return res.status(400).json({message: 'Not Authorized'});
        }

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch(error) {
        res.status(400).json({error});
    }
}

const logout = async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    }),
    res.status(200).json({
        status: "Success",
        message: "Logged out successfully"
    });
};


export { login, logout, register, me };