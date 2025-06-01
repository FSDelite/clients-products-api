import vine from '@vinejs/vine'

export const singUpUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().maxLength(254),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where({ email: value }).first()
        return !user
      }),
    password: vine.string().trim().minLength(8),
  })
)
