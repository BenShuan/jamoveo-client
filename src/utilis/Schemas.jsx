import { z } from "zod";

export const userSchema = z.object({
  "username": z.string()
    .regex(/^[0-9A-Za-z]{6,16}$/, 'Please enter a valid useranme .'),
  "password": z.string()
    .regex(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,32}$/, 'Password must be at least 8 characters long\none uppercase letter \nOne lowercase letter.'),
  "role": z.string(),
  "instrument": z.string(),

})