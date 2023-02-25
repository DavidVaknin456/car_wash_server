const createPointsTableQuery = `CREATE TABLE IF NOT EXISTS points (
  worker_id INT NOT NULL,
  points INT NOT NULL,
  PRIMARY KEY (worker_id),
  FOREIGN KEY (worker_id) REFERENCES users(id)
);`;

module.exports = createPointsTableQuery;
