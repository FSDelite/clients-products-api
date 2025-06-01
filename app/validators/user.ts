import vine from '@vinejs/vine'

export const singInUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .exists(async (db, value) => {
        const user = await db.from('users').where({ username: value }).first()
        return user
      }),
    password: vine.string().trim(),
  })
)
