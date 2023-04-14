-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 54.163.234.235    Database: health-alert
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Medicine`
--

DROP TABLE IF EXISTS `Medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medicine` (
  `medicine_id` int NOT NULL AUTO_INCREMENT,
  `medicine_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `treatment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number_of_times_per_day` int DEFAULT NULL,
  `amount_per_time` int DEFAULT NULL,
  `period` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medicine_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`medicine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medicine`
--

LOCK TABLES `Medicine` WRITE;
/*!40000 ALTER TABLE `Medicine` DISABLE KEYS */;
INSERT INTO `Medicine` VALUES (1,'ยาลดน้ำตาลในเลือด','ช่วยควบคุมระดับน้ำตาลในเลือดให้คงที่',1,2,'ก่อนอาหาร','https://images.ctfassets.net/4w8qvp17lo47/6vXaH4Y5Gw6AMEmASwGkc6/e6ff962a82811e4d160cc2d5c0d8b3cb/metformin-antidiabetic-tablets-science-photo-library.jpg'),(2,'ยาช่วยสร้างอินซูลิน','ที่ช่วยกระตุ้นหรือส่งเสริมการสร้างอินซูลิน เพื่อลดระดับน้ำตาลในเลือด',1,1,'ก่อนอาหาร','https://insulinnation.com/wp-content/uploads/2017/10/Insulin_Nation_sulfonylureas_620px.jpg'),(3,'ยาลดระดับน้ำตาลในเลือด','ช่วยลดระดับน้ำตาลในเลือด โดยทำการยับยั้งการย่อยสลายฮอร์โมนที่ชื่อ DPP-4 ที่ช่วยย่อยสลายฮอร์โมนอินซูลิน',1,1,'หลังอาหาร','https://www.yourlawyer.com/wp-content/uploads/2017/01/diabetes-drugs1.jpg'),(4,'ยาลดการเต้นของหัวใจ','ลดการเต้นของหัวใจ และช่วยควบคุมความดันโลหิต',1,1,'หลังอาหาร','https://media.discordapp.net/attachments/1090253725647523921/1093951369515368448/5850.png?width=893&height=670'),(5,'ยาลดความดันโลหิต','ช่วยลดความดันโลหิตและช่วยลดการเสียดสีของหัวใจ',1,1,'หลังอาหาร','https://media.discordapp.net/attachments/1090253725647523921/1093958357662040104/32309888-8656787-image-m-8_1598259898132.png?width=570&height=380');
/*!40000 ALTER TABLE `Medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patients`
--

DROP TABLE IF EXISTS `Patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patients` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `id_card` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `congenital_disease` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `history_of_drug_allergy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `patient_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  UNIQUE KEY `firstName` (`firstName`,`lastName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patients`
--

LOCK TABLES `Patients` WRITE;
/*!40000 ALTER TABLE `Patients` DISABLE KEYS */;
INSERT INTO `Patients` VALUES (1,'1101501079562','ชนกนันท์','นุ่มน้อย',NULL,NULL,NULL,NULL,NULL,NULL),(2,'1711000121111','อาภัสรา','โมรัษเฐียร',NULL,59,165,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reminder`
--

DROP TABLE IF EXISTS `Reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reminder` (
  `reminder_id` int NOT NULL AUTO_INCREMENT,
  `morning_time` time DEFAULT NULL,
  `noon_time` time DEFAULT NULL,
  `evening_time` time DEFAULT NULL,
  `night_time` time DEFAULT NULL,
  `medicine_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `number_of_medication` int DEFAULT NULL,
  PRIMARY KEY (`reminder_id`),
  KEY `medicine_id` (`medicine_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `Reminder_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `Medicine` (`medicine_id`),
  CONSTRAINT `Reminder_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `Patients` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reminder`
--

LOCK TABLES `Reminder` WRITE;
/*!40000 ALTER TABLE `Reminder` DISABLE KEYS */;
INSERT INTO `Reminder` VALUES (1,NULL,NULL,'00:15:00',NULL,1,2,NULL),(2,NULL,'11:30:00','16:30:00',NULL,1,1,NULL),(3,NULL,NULL,'16:30:00',NULL,2,1,NULL),(4,NULL,NULL,'17:30:00',NULL,3,1,NULL),(5,NULL,NULL,'17:30:00',NULL,4,1,NULL),(6,NULL,'15:35:00','15:28:00',NULL,5,1,NULL);
/*!40000 ALTER TABLE `Reminder` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-14 21:27:39
