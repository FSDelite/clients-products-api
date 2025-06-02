import vine from '@vinejs/vine'

export const singInUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().trim(),
  })
)
