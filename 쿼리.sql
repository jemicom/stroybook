CREATE DATABASE storybook;
SHOW DATABASES;
USE storybook;
 
CREATE USER storybook@localhost IDENTIFIED BY '12345';
GRANT all PRIVILEGES ON *.* TO storybook@localhost IDENTIFIED BY '12345';

CREATE TABLE user_info(
	ui_num INT NOT NULL PRIMARY KEY AUTO_INCREMENT,	
	ui_id  VARCHAR(30) NOT NULL UNIQUE,
	ui_pwd VARCHAR(30) ,
	ui_email VARCHAR(30),
	ui_name VARCHAR(30)
);

SHOW TABLES; 
 

SELECT * FROM user_info;
SELECT * from user_info  WHERE  ui_name = '박길동';
SELECT * from user_info  WHERE  ui_name LIKE '%은%';
SELECT * from user_info  WHERE  ui_email = 'test5@test.com';
SELECT count(1) AS cnt from user_info  WHERE  ui_name = '박길동';

INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
VALUES('test1', '1111', 'test1@test.com', '홍길동');
INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
VALUES('test2', '2222', 'test2@test.com', '김길동');
INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
VALUES('test3', '3333', 'test3@test.com', '박길동');
INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
VALUES('test4', '4444', 'test4@test.com', '오길동');
INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
VALUES('test5', '5555', 'test5@test.com', '은길동');
INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
VALUES('test6', '5555', 'test5@test.com', '은박세');

SELECT * FROM user_info;
 
UPDATE user_info SET ui_name = "놀부" WHERE ui_id = "test3";
UPDATE user_info SET ui_name = "고길동" , ui_email = "naver@naver" wHERE ui_id = "test3";
 
DELETE FROM user_info; 
DELETE FROM user_info WHERE  ui_name = '박길동';
DELETE FROM user_info WHERE  ui_name LIKE '%은%';
DELETE FROM user_info WHERE  ui_email = 'test5@test.com';

DROP DATABASE storybook; 
DROP TABLE  user_info; 