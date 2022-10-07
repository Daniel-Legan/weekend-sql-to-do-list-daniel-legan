DROP TABLE IF EXISTS "todo";

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"complete" BOOLEAN DEFAULT FALSE,
	"comment" VARCHAR (255) NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW()
);

INSERT INTO "todo" 
	("comment")
VALUES 
	('take our the trash'),
	('unload groceries'),
	('wash the dished'),
	('return fishing pole'),
	('go to the doctor'),
	('meet brother at swimming pool'),
	('take a bath'),
	('take grandma to hospital');