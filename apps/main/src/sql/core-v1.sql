IF OBJECT_ID('Settings', 'U') IS  NULL 
BEGIN
	CREATE TABLE Settings
	(
		id							bigint identity(1,1)					PRIMARY KEY,
		[key]						nvarchar(250)							NOT NULL,
		[value]						nvarchar(250)							NOT NULL,
		[type]						nvarchar(250)							NOT NULL,
		[createdAt]					datetimeoffset							NOT NULL,
		[updatedAt]					datetimeoffset							NOT NULL
	)


END

GO

IF OBJECT_ID('Migrations', 'U') IS  NULL 
BEGIN
	
	CREATE TABLE Migrations
	(
		id							bigint identity(1,1)					NOT NULL,
		[version]					nvarchar(200)							PRIMARY KEY,
		[description]				nvarchar(500)							NULL,
		[createdAt]					datetimeoffset							NOT NULL,
		[updatedAt]					datetimeoffset							NOT NULL
	)
END

GO

IF OBJECT_ID('WinstonLogs', 'U') IS  NULL 
BEGIN
	CREATE Table WinstonLogs
	(
		id							bigint identity(1,1)					PRIMARY KEY,
		[level]						nvarchar(250)							NULL,
		message						nvarchar(1024)							NULL,
		meta						nvarchar(max)							NULL,
		createdAt					datetimeoffset							NOT NULL,
		updatedAt					datetimeoffset							NOT NULL,
	);
END

GO


-- Core Tables

IF NOT EXISTS ((SELECT 1 FROM Migrations WHERE version = 'CORE-Settings-v2' 
					
			))
	AND EXISTS (
		SELECT 1 FROM Settings WHERE 1=1
		OR ([key] = 'SITE_NAME' AND [value] IN ('SITE_NAME'))
	)
BEGIN

	ALTER TABLE Settings
	ALTER COLUMN [value] nvarchar(max) NULL;

	INSERT INTO Migrations(version, createdAt, updatedAt)
	SELECT 'CORE-Settings-v2', GETDATE(), GETDATE()
END

GO

IF NOT EXISTS ((SELECT 1 FROM Migrations WHERE version = 'factorstatuses-v1' 
					
			))
	AND EXISTS (
		SELECT 1 FROM Settings WHERE ([key] = 'SITE_NAME' AND [value] IN ('neka'))
	)
BEGIN

	CREATE Table FactorStatuses
	(
		id							int										PRIMARY KEY,
		title						nvarchar(256)							NULL,
		createdAt					datetimeoffset							NOT NULL,
		updatedAt					datetimeoffset							NOT NULL,
	);

	INSERT INTO FactorStatuses(id, title, createdAt, updatedAt)
	VALUES (1, N'در انتظار پرداخت', getdatE(), getdate())
		,(2, N'پرداخت شده', getdatE(), getdate())

	INSERT INTO Migrations(version, createdAt, updatedAt)
	SELECT 'factorstatuses-v1', GETDATE(), GETDATE()
END

GO


IF NOT EXISTS ((SELECT 1 FROM Migrations WHERE version = 'factors-v1' 
					
			))
	AND EXISTS (
		SELECT 1 FROM Settings WHERE ([key] = 'SITE_NAME' AND [value] IN ('neka'))
	)
BEGIN

	CREATE Table Factors
	(
		id							bigint identity(1,1)					PRIMARY KEY,
		crmUserId					nvarchar(256)							NOT NULL,
		firstname					nvarchar(256)							NULL,
		lastname					nvarchar(256)							NULL,
		terminalSim					nvarchar(256)							NOT NULL,
		deltasibUserId				nvarchar(256)							NULL,
		price						bigint									NOT NULL,
		deltasibServiceId			nvarchar(256)							NOT NULL,
		deltasibServiceName			nvarchar(256)							NULL,
		deltasibServiceDescription	nvarchar(256)							NULL,
		factorStatusId				int										NOT NULL
			CONSTRAINT FK_Factors_FactorStatusId
				FOREIGN KEY REFERENCES FactorStatuses(id),
		createdAt					datetimeoffset							NOT NULL,
		updatedAt					datetimeoffset							NOT NULL,
	);

	INSERT INTO Migrations(version, createdAt, updatedAt)
	SELECT 'factors-v1', GETDATE(), GETDATE()
END

GO


IF NOT EXISTS ((SELECT 1 FROM Migrations WHERE version = 'paymentstatuses-v1' 
					
			))
	AND EXISTS (
		SELECT 1 FROM Settings WHERE ([key] = 'SITE_NAME' AND [value] IN ('neka'))
	)
BEGIN

	CREATE Table PaymentStatuses
	(
		id							int										PRIMARY KEY,
		title						nvarchar(256)							NULL,
		createdAt					datetimeoffset							NOT NULL,
		updatedAt					datetimeoffset							NOT NULL,
	);

	INSERT INTO PaymentStatuses(id, title, createdAt, updatedAt)
	VALUES (1, N'در انتظار پرداخت', getdatE(), getdate())
		,(2, N'پرداخت ناموفق', getdatE(), getdate())
		,(3, N'پرداخت موفق', getdatE(), getdate())
		,(4, N'وجه بازگشتی', getdatE(), getdate())

	INSERT INTO Migrations(version, createdAt, updatedAt)
	SELECT 'paymentstatuses-v1', GETDATE(), GETDATE()
END

GO


IF NOT EXISTS ((SELECT 1 FROM Migrations WHERE version = 'payments-v1' 
					
			))
	AND EXISTS (
		SELECT 1 FROM Settings WHERE ([key] = 'SITE_NAME' AND [value] IN ('neka'))
	)
BEGIN

	CREATE Table Payments
	(
		id							bigint identity(1,1)					PRIMARY KEY,
		crmUserId					nvarchar(256)							NOT NULL,
		firstname					nvarchar(256)							NULL,
		lastname					nvarchar(256)							NULL,
		price						bigint									NOT NULL,
		factorId					bigint									NOT NULL
			CONSTRAINT FK_Payments_FactorId
				FOREIGN KEY REFERENCES Factors(id),
		paymentStatusId				int										NOT NULL
			CONSTRAINT FK_Payments_PaymentStatusId
				FOREIGN KEY REFERENCES PaymentStatuses(id),
		paymentToken				nvarchar(256)							NULL,
		paymentResult				nvarchar(max)							NULL,
		paymentReciept				nvarchar(256)							NULL,
		createdAt					datetimeoffset							NOT NULL,
		updatedAt					datetimeoffset							NOT NULL,
	);

	INSERT INTO Migrations(version, createdAt, updatedAt)
	SELECT 'payments-v1', GETDATE(), GETDATE()
END

GO

