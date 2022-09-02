CREATE DATABASE  IF NOT EXISTS `uxxxxxxxx_untouchables` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `uxxxxxxxx_untouchables`;
-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for Win64 (AMD64)
-- Remember to change uxxxxxxxx to your student number!
-- Host: wheatley.cs.up.ac.za    Database: u21434159_untouchables
-- ------------------------------------------------------
-- Server version	10.3.31-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `100m sprint`
--

DROP TABLE IF EXISTS `100m sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `100m sprint` (
  `Event_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Event_Name` varchar(45) NOT NULL,
  `Event_Type` varchar(45) NOT NULL,
  `Venue` int(11) NOT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `Venue_idx` (`Venue`),
  CONSTRAINT `Venue` FOREIGN KEY (`Venue`) REFERENCES `venues` (`Venue_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `100m sprint`
--

LOCK TABLES `100m sprint` WRITE;
/*!40000 ALTER TABLE `100m sprint` DISABLE KEYS */;
INSERT INTO `100m sprint` VALUES
(1,'27th Olympic Games','Women Final',1),
(2,'27th Olympic Games','Men Final',1),
(3,'The XXX Olympic Games','Women Final',2),
(4,'The XXX Olympic Games','Men Final',2),
(5,'The XXXI Olympic Games','Women Final',3),
(6,'The XXXI Olympic Games','Men Final',3),
(7,'The XXXII Olympic Games','Women Final',4),
(8,'The XXXII Olympic Games','Men Final',4);
/*!40000 ALTER TABLE `100m sprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athlete`
--

DROP TABLE IF EXISTS `athlete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `athlete` (
  `Athlete_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DOB` date NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Sex` char(1) NOT NULL,
  `PB_Time` time(2) NOT NULL DEFAULT '00:00:00.00',
  `ID_Team` int(25) NOT NULL,
  PRIMARY KEY (`Athlete_ID`),
  KEY `Event_ID_idx` (`ID_Team`),
  CONSTRAINT `Team_ID` FOREIGN KEY (`ID_Team`) REFERENCES `team` (`Team_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete`
--

LOCK TABLES `athlete` WRITE;
/*!40000 ALTER TABLE `athlete` DISABLE KEYS */;
INSERT INTO `athlete` VALUES
(1,'1975-02-01','Katerina Thanou','F','00:00:11.12',1),
(2,'1975-09-17','Tanya Lawrence','F','00:00:11.18',2),
(3,'1960-05-10','Marlene Ottey','F','00:00:11.19',2),
(4,'1972-06-06','Zhanna Block','F','00:00:11.20',3),
(5,'1971-09-12','Chandra Sturrup','F','00:00:11.21',4),
(6,'1974-10-17','Savatheda Fynes','F','00:00:11.22',4),
(7,'1976-01-16','Debbie Ferguson-Mckenzie','F','00:00:11.29',4),
(8,'1975-10-12','Marion Jones','F','00:00:11.30',5),
(9,'1974-07-23','Maurice Greene','M','00:00:09.87',5),
(10,'1973-12-30','Ato Boldon','M','00:00:09.99',8),
(11,'1976-03-30','Obadele Thompson','M','00:00:10.04',9),
(12,'1978-04-05','Dwain Chambers','M','00:00:10.08',6),
(13,'1968-09-09','Jon Drummond','M','00:00:10.09',5),
(14,'1973-09-12','Darren Campbell','M','00:00:10.13',6),
(15,'1976-04-05','Kim Collins','M','00:00:10.17',10),
(16,'1976-09-02','Aziz Zakari','M','00:00:10.20',7),
(17,'1986-12-27','Shelly-Ann Fraser-Pryce','F','00:00:10.74',2),
(18,'1979-11-24','Carmelita Jeter','F','00:00:10.78',5),
(19,'1982-05-15','Veronica Campbell-Brown','F','00:00:10.81',2),
(20,'1985-08-30','Tianna Baroletta','F','00:00:10.85',5),
(21,'1985-11-18','Allyson Felix','F','00:00:10.89',5),
(22,'1986-10-14','Kelly-Ann Baptiste','F','00:00:10.94',20),
(23,'1987-08-23','Murielle Ahoure','F','00:00:11.00',11),
(24,'1988-10-09','Blessing Okagbare','F','00:00:11.01',12),
(25,'1986-09-21','Usain Bolt','M','00:00:09.63',2),
(26,'1989-12-26','Yohan Blake','M','00:00:09.75',2),
(27,'1982-02-10','Justin Gatlin','M','00:00:09.79',5),
(28,'1989-04-13','Ryan Bailey','M','00:00:09.88',5),
(29,'1984-06-03','Churandy Martina','M','00:00:09.94',13),
(30,'1985-07-07','Richard Thompson','M','00:00:09.89',20),
(31,'1982-11-23','Asafa Powell','M','00:00:11.99',2),
(32,'1982-09-09','Tyson Gay','M','00:00:12.00',5),
(33,'1992-06-28','Elaine Thompson','F','00:00:10.61',2),
(34,'1990-09-27','Tori Bowie','F','00:00:10.83',5),
(35,'1986-12-27','Marie-Josee Ta Lou','F','00:00:10.86',11),
(36,'1988-11-18','Dafne Schippers','F','00:00:10.90',13),
(37,'1992-04-10','Michelle-Lee Ahye','F','00:00:10.92',20),
(38,'1992-04-22','English Gardner','F','00:00:10.94',5),
(39,'1994-10-17','Christania Williams','F','00:00:11.80',2),
(40,'1994-11-10','Andre de Grasse','M','00:00:09.89',14),
(41,'1993-09-21','Akani Simbine','M','00:00:09.93',15),
(42,'1986-11-11','Ben Youssef Meite','M','00:00:09.96',11),
(43,'1992-02-27','Jimmy Vicaut','M','00:00:10.04',16),
(44,'1995-07-10','Trayvon Bromell','M','00:00:10.06',5),
(45,'1994-07-16','Shericka Jackson','F','00:00:10.76',2),
(46,'1996-07-15','Ajla del Ponte','F','00:00:10.97',17),
(47,'1992-07-17','Mujinga Kambundji','F','00:00:10.99',17),
(48,'1997-03-25','Teahna Daniels','F','00:00:11.02',5),
(49,'1996-08-29','Daryll Neita','F','00:00:11.12',6),
(50,'1994-09-26','Lamont Marcell Jacobs','M','00:00:09.80',18),
(51,'1995-05-07','Fred Kerley','M','00:00:09.84',5),
(52,'1993-10-15','Ronnie Baker','M','00:00:09.95',5),
(53,'1989-08-29','Bingtian Su','M','00:00:09.98',19),
(54,'2000-03-08','Enoch Adegoke','M','00:00:10.02',12),
(55,'1995-07-13','Zharnel Hughes','M','00:00:10.11',6);
/*!40000 ALTER TABLE `athlete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duration_of_event`
--

DROP TABLE IF EXISTS `duration_of_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `duration_of_event` (
  `ID_Event` int(11) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  PRIMARY KEY (`ID_Event`,`Start_Date`,`End_Date`),
  KEY `Events_idx` (`ID_Event`),
  CONSTRAINT `Events` FOREIGN KEY (`ID_Event`) REFERENCES `100m sprint` (`Event_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duration_of_event`
--

LOCK TABLES `duration_of_event` WRITE;
/*!40000 ALTER TABLE `duration_of_event` DISABLE KEYS */;
INSERT INTO `duration_of_event` VALUES
(1,'2000-09-22','2000-10-01'),
(2,'2000-09-22','2000-10-01'),
(3,'2012-06-27','2012-08-12'),
(4,'2012-06-27','2012-08-12'),
(5,'2016-08-05','2016-08-21'),
(6,'2016-08-05','2016-08-21'),
(7,'2021-07-30','2021-08-08'),
(8,'2021-07-30','2021-08-08');
/*!40000 ALTER TABLE `duration_of_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `Result_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Position` int(2) NOT NULL,
  `Time` time(2) NOT NULL,
  `Match_event` int(11) NOT NULL,
  `ID_Athlete` int(11) NOT NULL,
  PRIMARY KEY (`Result_ID`),
  KEY `Event ID_idx` (`Match_event`),
  KEY `athlete_idx` (`ID_Athlete`),
  CONSTRAINT `Event` FOREIGN KEY (`Match_event`) REFERENCES `100m sprint` (`Event_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `athlete` FOREIGN KEY (`ID_Athlete`) REFERENCES `athlete` (`Athlete_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`u21434159`@`%`*/ /*!50003 TRIGGER `u21434159_untouchables`.`UpdateAthletePB` AFTER INSERT ON `results` FOR EACH ROW
BEGIN
UPDATE `u21434159_untouchables`.athlete as a SET
a.PB_Time = NEW.Time 
WHERE a.Athlete_ID = NEW.ID_Athlete AND (a.PB_Time = "00:00:00.00" OR a.PB_Time > NEW.Time);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES
(1,1,'00:00:11.12',1,1),
(2,2,'00:00:11.18',1,2),
(3,3,'00:00:11.19',1,3),
(4,4,'00:00:11.20',1,4),
(5,5,'00:00:11.21',1,5),
(6,6,'00:00:11.22',1,6),
(7,7,'00:00:11.29',1,7),
(8,8,'00:00:11.30',1,8),
(9,1,'00:00:09.87',2,9),
(10,2,'00:00:09.99',2,10),
(11,3,'00:00:10.04',2,11),
(12,4,'00:00:10.08',2,12),
(13,5,'00:00:10.09',2,13),
(14,6,'00:00:10.13',2,14),
(15,7,'00:00:10.17',2,15),
(16,8,'00:00:10.20',2,16),
(17,1,'00:00:10.75',3,17),
(18,2,'00:00:10.78',3,18),
(19,3,'00:00:10.81',3,19),
(20,4,'00:00:10.85',3,20),
(21,5,'00:00:10.89',3,21),
(22,6,'00:00:10.94',3,22),
(23,7,'00:00:11.00',3,23),
(24,8,'00:00:11.01',3,24),
(25,1,'00:00:09.63',4,25),
(26,2,'00:00:09.75',4,26),
(27,3,'00:00:09.79',4,27),
(28,4,'00:00:09.88',4,28),
(29,5,'00:00:09.94',4,29),
(30,6,'00:00:09.89',4,30),
(31,7,'00:00:11.99',4,31),
(32,8,'00:00:12.00',4,32),
(33,1,'00:00:10.71',5,33),
(34,2,'00:00:10.83',5,34),
(35,3,'00:00:10.86',5,17),
(36,4,'00:00:10.86',5,35),
(37,5,'00:00:10.90',5,36),
(38,6,'00:00:10.92',5,37),
(39,7,'00:00:10.94',5,38),
(40,8,'00:00:11.80',5,39),
(41,1,'00:00:09.81',6,25),
(42,2,'00:00:09.89',6,27),
(43,3,'00:00:09.91',6,40),
(44,4,'00:00:09.93',6,26),
(45,5,'00:00:09.94',6,41),
(46,6,'00:00:09.96',6,42),
(47,7,'00:00:10.04',6,43),
(48,8,'00:00:10.06',6,44),
(49,1,'00:00:10.61',7,33),
(50,2,'00:00:10.74',7,17),
(51,3,'00:00:10.76',7,45),
(52,4,'00:00:10.91',7,35),
(53,5,'00:00:10.97',7,46),
(54,6,'00:00:10.99',7,47),
(55,7,'00:00:11.02',7,48),
(56,8,'00:00:11.12',7,49),
(57,1,'00:00:09.80',8,50),
(58,2,'00:00:09.84',8,51),
(59,3,'00:00:09.89',8,40),
(60,4,'00:00:09.93',8,41),
(61,5,'00:00:09.95',8,52),
(62,6,'00:00:09.98',8,53),
(63,7,'00:00:10.02',8,54),
(64,8,'00:00:10.11',8,55);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `Team_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Team_Name` varchar(45) NOT NULL,
  `Country` varchar(45) NOT NULL,
  `Ranking` int(2) NOT NULL,
  PRIMARY KEY (`Team_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES
(1,'Greek national team','Greece',0),
(2,'Jamaican national team','Jamaica',0),
(3,'Ukrainian national team','Ukraine',0),
(4,'Bahaman national team','Bahamas',0),
(5,'USA national team','United States of America',0),
(6,'British national team','Great Britian',0),
(7,'Ghanan national team','Ghana',0),
(8,'Tunisian national team','Tunisia',0),
(9,'Barbadon national team','Barbados',0),
(10,'Saint Kitts and Nevis national team','Saint Kitts and Nevis',0),
(11,'Cote d\'Ivoire national team','Cote d\'Ivoire',0),
(12,'Nigerian national team','Nigeria',0),
(13,'Netherlands national team','Netherlands',0),
(14,'Canadian national team','Canada',0),
(15,'South African national team','South Africa',0),
(16,'French national team','France',0),
(17,'Swiss national team','Switzerland',0),
(18,'Italian national team','Italy',0),
(19,'Chinese national team','China',0),
(20,'Trinidad and Tobago national team','Trinidad and Tobago',0);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venues`
--

DROP TABLE IF EXISTS `venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venues` (
  `Venue_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Venue_Name` varchar(45) NOT NULL,
  `Venue_Type` varchar(45) NOT NULL,
  `Location` varchar(45) NOT NULL,
  PRIMARY KEY (`Venue_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venues`
--

LOCK TABLES `venues` WRITE;
/*!40000 ALTER TABLE `venues` DISABLE KEYS */;
INSERT INTO `venues` VALUES
(1,'Sydney Olympic Stadium','Track & Field','Australia'),
(2,'London Olympic Stadium','Track & Field','Great Britian'),
(3,'Rio de Janeiro Estadio Olimpico','Track & Field','Brazil'),
(4,'Tokyo Olympic Stadium','Track & Field','Japan');
/*!40000 ALTER TABLE `venues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-03 16:08:05
