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
-- Table structure for table `web_coordenada_geografica`
--

DROP TABLE IF EXISTS `web_coordenada_geografica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_coordenada_geografica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` decimal(10,10) NOT NULL,
  `longitude` decimal(10,10) NOT NULL,
  `fk_ruta_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `web_coordenada_geografica_fk_ruta_id_45af67c7_fk_web_ruta_id` (`fk_ruta_id`),
  CONSTRAINT `web_coordenada_geografica_fk_ruta_id_45af67c7_fk_web_ruta_id` FOREIGN KEY (`fk_ruta_id`) REFERENCES `web_ruta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_coordenada_geografica`
--

LOCK TABLES `web_coordenada_geografica` WRITE;
/*!40000 ALTER TABLE `web_coordenada_geografica` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_coordenada_geografica` ENABLE KEYS */;
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
