import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(6, "Username must be of atleast 6 characters")
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/, 'Username must have alphanumeric characters!')

export const emailValidation = z
    .string()
    .regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please enter a valid email!')

export const signupSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: z.string(),
    cpassword: z.string()
});
