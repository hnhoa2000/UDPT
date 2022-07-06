create database UDPT;
use UDPT;

create table if not exists `TaiKhoan` (
`IdTaiKhoan` int primary key AUTO_INCREMENT,
`username` varchar(30) COLLATE utf8_unicode_ci,
`password` varchar(200),
`active` boolean default true,
`role` varchar(10) COLLATE utf8_unicode_ci,
`rfToken` varchar(200)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table if not exists `Store`(
`StoreID` int primary key,
`Storename` varchar(40),
`StoreAddress` varchar(50),
`StorePhone` varchar(15),
`StoreLogo` varchar(30),
`OpenTime` varchar(8),
`CreatedOn` timestamp
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table if not exists `Employee`(
`IdNhanVien` int primary key,
`TenNhanVien` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
`DienThoai` varchar(10),
`DiaChi` varchar(50),
`NhiemVu` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
`StoreID` int
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Employee` add constraint `FK_Employee_Store` foreign key(`StoreID`) references `Store`(`StoreID`);

create table if not exists `ProductType`(
`ProductTypeID` int primary key,
`ProductTypeName` varchar(40)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table if not exists `Product`(
`ProductID` int primary key,
`Price` numeric(10,3),
`ProductName` varchar(30),
`ProductImage` varchar(30),
`ProductTypeID` int,
`SoLuong` int
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table`Product` add constraint `FK_Product_ProductType` foreign key(`ProductTypeID`) references `ProductType`(`ProductTypeID`);

create table if not exists `Customer`(
`CustomerID` int primary key,
`CustomerName` varchar(50),
`CustomerAddress` varchar(50),
`CustomerPhone` varchar(15),
`CustomerEmail` varchar(25),
`EmployeeInCharge` int default null,
`AccountID` int
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Customer` add constraint `FK_Customer_Employee` foreign key(`EmployeeInCharge`) references `Employee`(`IdNhanVien`);
alter table `Customer` add constraint `FK_Customer_Account` foreign key(`AccountID`) references`TaiKhoan`(`IdTaiKhoan`);

create table if not exists `Order`(
`OrderID` int primary key,
`CreatedOn` timestamp,
`TotalPrice` numeric(10,3),
`Status` varchar(40),
`CustomerID` int not null,
`EmployeeID` int default null
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Order` add constraint `FK_Order_Customer` foreign key(`CustomerID`) references `Customer`(`CustomerID`);
alter table `Order` add constraint `FK_Order_Employee` foreign key(`EmployeeID`) references `Employee`(`IdNhanVien`);

create table if not exists `Store_ProductType`(
`StoreID` int,
`ProductTypeID` int,
primary key (`StoreID`, `ProductTypeID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Store_ProductType` add constraint `FK_Store_ProductType_Store` foreign key(`StoreID`) references `Store`(`StoreID`);
alter table `Store_ProductType` add constraint `FK_Store_ProductType_ProductType` foreign key(`ProductTypeID`) references `ProductType`(`ProductTypeID`);

create table if not exists `Customer_Order`(
`CustomerID` int,
`OrderID` int,
primary key(`CustomerID`, `OrderID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Customer_Order` add constraint `FK_Customer_Order_Customer` foreign key(`CustomerID`) references `Customer`(`CustomerID`);
alter table `Customer_Order` add constraint `FK_Customer_Order_Order` foreign key(`OrderID`) references `Order`(`OrderID`);

create table if not exists `Order_Product`(
`OrderID` int,
`ProductID` int,
`Soluong` int,
`DonGia` numeric(10,3),
primary key(`OrderID`,`ProductID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Order_Product` add constraint `FK_Order_Product_Order` foreign key(`OrderID`) references `Order`(`OrderID`);
alter table `Order_Product` add constraint `FK_Order_Product_Product` foreign key(`ProductID`) references `Product`(`ProductID`);

create table if not exists `Comment`(
`CustomerID` int,
`ProductID` int,
`Content` varchar(100),
primary key(`CustomerID`,`ProductID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

alter table `Comment` add constraint `FK_Comment_Customer` foreign key(`CustomerID`) references `Customer`(`CustomerID`);
alter table `Comment` add constraint `FK_Comment_Product` foreign key(`ProductID`) references `Product`(`ProductID`);
