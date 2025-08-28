import { z } from 'zod'

export const exampleSchema = z.object({
  name: z.string().min(1, 'required').min(2, 'min_length'),
  email: z
    .string()
    .min(1, 'required')
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      'invalid',
    ),
})

export type ExampleFormData = z.infer<typeof exampleSchema>
