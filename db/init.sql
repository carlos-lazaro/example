CREATE DATABASE IF NOT EXISTS db;

SELECT
    COUNT(*) INTO @userExists
FROM
    mysql.user
WHERE
    User = 'user';

IF @userExists = 0 THEN CREATE USER 'user' @'%' IDENTIFIED BY 'mypassword';

GRANT ALL PRIVILEGES ON mydatabase.* TO 'user' @'%';

FLUSH PRIVILEGES;

END IF;

GRANT ALL PRIVILEGES ON db.* TO 'root' @'%' IDENTIFIED BY 'password';