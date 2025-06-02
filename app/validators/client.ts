import vine from '@vinejs/vine'

export const storeClientValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    name: vine.string().trim(),
  })
)

export const updateClientValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    name: vine.string().trim(),
    params: vine.object({
      id: vine.number(),
    }),
  })
)

export const idClientValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)

