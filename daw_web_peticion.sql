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
-- Table structure for table `web_peticion`
--

DROP TABLE IF EXISTS `web_peticion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_peticion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(30) NOT NULL,
  `fecha_pe` date NOT NULL,
  `fk_persona_ruta_id` int(11) NOT NULL,
  `fk_coordenada_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `web_peticion_fk_persona_ruta_id_4acf0456_fk_web_persona_id` (`fk_persona_ruta_id`),
  KEY `web_pet_fk_coordenada_id_31716b5_fk_web_coordenada_geografica_id` (`fk_coordenada_id`),
  CONSTRAINT `web_pet_fk_coordenada_id_31716b5_fk_web_coordenada_geografica_id` FOREIGN KEY (`fk_coordenada_id`) REFERENCES `web_coordenada_geografica` (`id`),
  CONSTRAINT `web_peticion_fk_persona_ruta_id_4acf0456_fk_web_persona_id` FOREIGN KEY (`fk_persona_ruta_id`) REFERENCES `web_persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_peticion`
--

LOCK TABLES `web_peticion` WRITE;
/*!40000 ALTER TABLE `web_peticion` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_peticion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-06 18:31:43
