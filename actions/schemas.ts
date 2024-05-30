import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
