CREATE TABLE Pokemon (
	name	VARCHAR(255)	NOT NULL,
	height	REAL,
	sex		VARCHAR(255),
	HP		INT,
	PRIMARY KEY (name)
);

CREATE TABLE Type (
	name	VARCHAR(255)	NOT NULL,
	PRIMARY KEY (name)
);

CREATE TABLE Ability (
	name		VARCHAR(255)	NOT NULL,
	description	VARCHAR(1000),
	PRIMARY KEY (name)
);

CREATE TABLE HasType (
	pokemonName	VARCHAR(255)	NOT NULL,
	typeName	VARCHAR(255)	NOT NULL,
	CONSTRAINT HasType_PK PRIMARY KEY (pokemonName,typeName),
	CONSTRAINT HasType_FK1 FOREIGN KEY (pokemonName) REFERENCES Pokemon(name)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	CONSTRAINT HasType_FK2 FOREIGN KEY (typeName) REFERENCES Type(name)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE Strengths (
	typeName		VARCHAR(255)	NOT NULL,
	strongAgainst	VARCHAR(255)	NOT NULL,
	multiplier		REAL,
	CONSTRAINT Strengths_PK PRIMARY KEY (typeName, strongAgainst),
	CONSTRAINT Strengths_FK1 FOREIGN KEY (typeName) REFERENCES Type(name)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	CONSTRAINT Strenghts_FK2 FOREIGN KEY (strongAgainst) REFERENCES Type(name)
		ON DELETE CASCADE	ON UPDATE CASCADE
);

CREATE TABLE HasAbility (
	pokemonName	VARCHAR(255)	NOT NULL,
	abilityName	VARCHAR(255)	NOT NULL,
	CONSTRAINT HasAbility_PK PRIMARY KEY (pokemonName, abilityName),
	CONSTRAINT HasAbility_FK1 FOREIGN KEY (pokemonName) REFERENCES Pokemon(name)
		ON DELETE CASCADE	ON UPDATE CASCADE,
	CONSTRAINT HasAbility_FK2 FOREIGN KEY (abilityName) REFERENCES Ability(name)
		ON DELETE CASCADE	ON UPDATE CASCADE
);
