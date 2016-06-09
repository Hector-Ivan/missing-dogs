import path from 'path'
import db from 'mysql-chassis'

db.init({
  host: 'localhost',
  database: 'Rockit',
  user: 'root',
  password: '',
  sqlPath: path.resolve('sql')
});

export default db
