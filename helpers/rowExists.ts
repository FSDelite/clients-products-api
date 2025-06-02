export const rowExists = async (
  model: any,
  field: object,
  exlcudeFilds: object = {}
): Promise<any> => {
  const query = model.query().where(field)

  if (exlcudeFilds) {
    query.whereNot(exlcudeFilds)
  }
  const row = await query.first()

  return row
}
