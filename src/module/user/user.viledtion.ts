import { z} from "zod"

export const addUserSchema= {
  body: z.object({
    username: z.string({error:"name is ruquird"}).min(3,{error:"the min  length 3"}).max(20,{error:     "the max length 20"}),
    email: z.email({message:"emil not found"}),
    password: z.string().min(6).max(30),
    confirmpassword:z.string().min(6).max(30),
    phone:z.string().min(6).max(11),
    age:z.number().min(18).max(70)
  }).refine((data) => data.password === data.confirmpassword, {
  message: "password do not match",
  path: ["confirmpassword"]
})}