const db = require('./db');
const bcrypt = require('bcrypt');
const password = 'password';

const addUsers = async function() {
  try {
    const hashedPassword = await bcrypt.hash(password, 1);
    const hashedPassword1 = await bcrypt.hash(password, 1);
    const user = await db.query(`
    INSERT INTO users 
    (username, password, first_name, last_name, email, is_admin)
    VALUES 
    ('mangomassacre', $1, 'silas', 'burger', 'silas@gmail.com', True),
    ('ok', $2, 'ok', 'ok', 'ok@gmail.com', False);
    `, [hashedPassword, hashedPassword]
    );
  } catch (e) {
    console.log('something went wrong')
    console.log(e)
    process.exit(1);
  }
}

addUsers().then(()=> {
  console.log("Successful seed!");
  process.exit();
});