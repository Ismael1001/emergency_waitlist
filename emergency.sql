CREATE DATABASE emergency;

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL    
);

CREATE TABLE PatientInfo (
    PatientID SERIAL PRIMARY KEY,
    UserID INT,
    Name VARCHAR(100),
    DateOfBirth DATE,
    Age INT,
    Gender VARCHAR(10),
    PatientCondition VARCHAR(100),
    Severity INT,
    EntryTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    WaitTime INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Users (Username, Password) VALUES 
('ismael', '123456');