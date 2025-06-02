import db from '@adonisjs/lucid/services/db'

export const rowExists = async (
  table: string,
  field: object,
  exlcudeFilds: object = {}
): Promise<boolean> => {
  const query = db.from(table).where(field)

  if (exlcudeFilds) {
    query.whereNot(exlcudeFilds)
  }
  const row = await query.first()

  return !!row
}
