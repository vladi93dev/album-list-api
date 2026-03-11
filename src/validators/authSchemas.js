import z from 'zod';

const loginSchema = z.object({
    email: z.email().min(1, "Email is requried"),
    password: z.string().min(6,"Password must be at least 6 chars. long")
});

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is requried"),
    password: z.string().min(6,"Password must be at least 6 chars. long")
});


export { loginSchema, registerSchema };

