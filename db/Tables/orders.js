const createOrderTableQuery = `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    worker_id INT,
    status VARCHAR(255) NOT NULL,
    fix_type VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (worker_id) REFERENCES users(id)
);`;

module.exports = createOrderTableQuery;
