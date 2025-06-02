import vine from '@vinejs/vine'

export const clientIdValidator = vine.compile(
  vine.object({
    params: vine.object({
      clientId: vine.number(),
    }),
  })
)

export const storeClientProductFavoriteValidator = vine.compile(
  vine.object({
    productId: vine.number(),
    params: vine.object({
      clientId: vine.number(),
    }),
  })
)
