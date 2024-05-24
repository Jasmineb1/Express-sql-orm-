// import { query } from "../../config/db";
const query=({
  sql: `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    pw VARCHAR(255) NOT NULL
  );`,
});

module.exports(query);