CREATE DATABASE  IF NOT EXISTS `daw` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `daw`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: daw
-- ------------------------------------------------------
-- Server version	5.6.26-log

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
-- Table structure for table `web_ruta`
--

DROP TABLE IF EXISTS `web_ruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_ruta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origen` varchar(30) NOT NULL,
  `destino` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `fk_persona_ru_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `web_ruta_fk_persona_ru_id_6584f9b_fk_web_persona_id` (`fk_persona_ru_id`),
  CONSTRAINT `web_ruta_fk_persona_ru_id_6584f9b_fk_web_persona_id` FOREIGN KEY (`fk_persona_ru_id`) REFERENCES `web_persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_ruta`
--

LOCK TABLES `web_ruta` WRITE;
/*!40000 ALTER TABLE `web_ruta` DISABLE KEYS */;
INSERT INTO `web_ruta` VALUES (1,'ESPOL FIEC','SAMANES GUAYAQUIL','2015-08-17',1),(2,'ESPOL FIEC','GUAYAQUIL VILLAESPAÑA','2015-08-17',1),(3,'GUAYAQUIL RIOCENTRO CEIBOS','GUAYAQUIL HUANCAVILCA NORTE','2015-08-17',2),(4,'GUAYAQUIL SAUCES 8','GUAYAQUIL ALBORADA','2015-08-17',2),(5,'GUAYAQUIL MAPASINGUE  OESTE','GUAYAQUIL ALBORADA','2015-08-17',3),(6,'ESPOL FIEC','GUAYAQUIL MALL DEL SOL','2015-08-17',3),(7,'ESPOL FIEC','GUAYAQUIL PRADERA II','2015-08-17',4),(8,'ESPOL FIEC','GUAYAQUIL CITY MALL','2015-08-17',4);
/*!40000 ALTER TABLE `web_ruta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-06 18:31:44