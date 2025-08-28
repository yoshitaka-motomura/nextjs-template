'use server'

// This code is a sample. Feel free to edit or delete it.

export async function createExample(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')

  console.log(name, email)
}
