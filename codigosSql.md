CREATE TABLE carritos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
)

FOREIGN KEY (<columna de esta tabla que será FK>) REFERENCES <nombre de la tabla a refenciar>(<nombre de la columna de la tabla a relacionar>)

CREATE TABLE carritos_productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    carritos_id INT NOT NULL,
    productos_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (carritos_id) REFERENCES carritos(id),
    FOREIGN KEY (productos_id) REFERENCES productos(id)
)