DELIMITER $$
CREATE PROCEDURE concatenate_with_date(IN str VARCHAR(255), OUT result VARCHAR(255))
BEGIN
  SET result = CONCAT(str, ' - ', DATE_FORMAT(NOW(), '%Y-%m-%d'));
END $$
DELIMITER ;