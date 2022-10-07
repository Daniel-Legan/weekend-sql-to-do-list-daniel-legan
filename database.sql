DROP TABLE IF EXISTS "todo";

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"complete" BOOLEAN DEFAULT FALSE,
	"comment" VARCHAR (255) NOT NULL
);

INSERT INTO "todo" 
	("complete", "comment")
VALUES 
	(FALSE, 'take our the trash'),
	(FALSE, 'unload groceries'),
	(FALSE, 'wash the dished'),
	(FALSE, 'return fishing pole'),
	(FALSE, 'go to the doctor'),
	(FALSE, 'meet brother at swimming pool'),
	(FALSE, 'take a bath'),
	(FALSE, 'take grandma to hospital');