import {z} from 'zod';

const zodSchema = z.object({
    name: z.string().trim().min(1, {
       message: "Invalid Name"
    }),
    email: z.string().email({
        message: 'Invalid mail'
    }).regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,{message: "only gmail accounts are allowed"}),
    password: z.string().min(8, {
        message: "At least 8 digits required"
    }),
    role: z.string().min(1,{message: "Enter Role details"})
})

export default zodSchema;