CREATE DATABASE  IF NOT EXISTS `comparking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `comparking`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: comparking
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `aparcamiento`
--

DROP TABLE IF EXISTS `aparcamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aparcamiento` (
  `ancho` float DEFAULT NULL,
  `largo` float DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `precio_dia` float DEFAULT NULL,
  `precio_hora` float DEFAULT NULL,
  `precio_ms` float DEFAULT NULL,
  `techado` bit(1) DEFAULT NULL,
  `id_aparcamiento` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `localidad` varchar(45) NOT NULL,
  `provincia` varchar(45) NOT NULL,
  `detalles` varchar(300) DEFAULT NULL,
  `direccion` varchar(300) NOT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  `video` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_aparcamiento`),
  KEY `FKjxurncm3a68r7far83o91d0wv` (`user_id`),
  CONSTRAINT `FKjxurncm3a68r7far83o91d0wv` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_review`
--

DROP TABLE IF EXISTS `app_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_review` (
  `puntuacion` int NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `id_app_review` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_app_review`),
  KEY `FKls9ge9tgtusmad2stt2kl0yp6` (`user_id`),
  CONSTRAINT `FKls9ge9tgtusmad2stt2kl0yp6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`),
  CONSTRAINT `app_review_chk_1` CHECK (((`puntuacion` <= 5) and (`puntuacion` >= 1)))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `denuncia`
--

DROP TABLE IF EXISTS `denuncia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `denuncia` (
  `aparcamiento_id` bigint NOT NULL,
  `denunciado_id` bigint NOT NULL,
  `denunciante_id` bigint NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `id_denuncia` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) NOT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  `descripcion` varchar(500) NOT NULL,
  PRIMARY KEY (`id_denuncia`),
  KEY `FK9e7d9919trsv5edq5hhop28x6` (`aparcamiento_id`),
  KEY `FKr4xde8va6lldkv7ok25obxilu` (`denunciado_id`),
  KEY `FKg7a5x6tpfqpyh398duacdgc36` (`denunciante_id`),
  CONSTRAINT `FK9e7d9919trsv5edq5hhop28x6` FOREIGN KEY (`aparcamiento_id`) REFERENCES `aparcamiento` (`id_aparcamiento`),
  CONSTRAINT `FKg7a5x6tpfqpyh398duacdgc36` FOREIGN KEY (`denunciante_id`) REFERENCES `user` (`id_user`),
  CONSTRAINT `FKr4xde8va6lldkv7ok25obxilu` FOREIGN KEY (`denunciado_id`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensaje` (
  `emisor_id` bigint NOT NULL,
  `fecha_envio` datetime(6) NOT NULL,
  `id_mensaje` bigint NOT NULL AUTO_INCREMENT,
  `receptor_id` bigint NOT NULL,
  `contenido` varchar(1000) NOT NULL,
  PRIMARY KEY (`id_mensaje`),
  KEY `FK9tsyf83jla7827pgd6a65tqrp` (`emisor_id`),
  KEY `FK95yonou1kepx0875ecivd4nf9` (`receptor_id`),
  CONSTRAINT `FK95yonou1kepx0875ecivd4nf9` FOREIGN KEY (`receptor_id`) REFERENCES `user` (`id_user`),
  CONSTRAINT `FK9tsyf83jla7827pgd6a65tqrp` FOREIGN KEY (`emisor_id`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `pago_confirmado` bit(1) DEFAULT NULL,
  `precio_total` float DEFAULT NULL,
  `aparcamiento_id` bigint NOT NULL,
  `fecha_fin` datetime(6) NOT NULL,
  `fecha_inicio` datetime(6) NOT NULL,
  `fecha_pago` datetime(6) DEFAULT NULL,
  `id_reserva` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `tipo_pago` varchar(45) NOT NULL,
  `tipo_pago_ms` varchar(45) DEFAULT NULL,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `FK5woxj5lj3bq7j6jqujjc4fqwn` (`aparcamiento_id`),
  KEY `FKtc6j743xmwfnwmh4ppgmt1x8a` (`user_id`),
  CONSTRAINT `FK5woxj5lj3bq7j6jqujjc4fqwn` FOREIGN KEY (`aparcamiento_id`) REFERENCES `aparcamiento` (`id_aparcamiento`),
  CONSTRAINT `FKtc6j743xmwfnwmh4ppgmt1x8a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trueque`
--

DROP TABLE IF EXISTS `trueque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trueque` (
  `fecha_fin` datetime(6) NOT NULL,
  `fecha_inicio` datetime(6) NOT NULL,
  `id_trueque` bigint NOT NULL AUTO_INCREMENT,
  `park_ofrecido_id` bigint NOT NULL,
  `park_solicitado_id` bigint NOT NULL,
  `reserva_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`id_trueque`),
  KEY `FKp386wu3kvj9bfldenwom5e90e` (`park_ofrecido_id`),
  KEY `FKnbnk1nct9ewe20wkulu64qy23` (`park_solicitado_id`),
  KEY `FKf8ib5hd22cwm6o1swwt93wru9` (`reserva_id`),
  KEY `FKmv5djqgabjrejlvcqaumamfsu` (`user_id`),
  CONSTRAINT `FKf8ib5hd22cwm6o1swwt93wru9` FOREIGN KEY (`reserva_id`) REFERENCES `reserva` (`id_reserva`),
  CONSTRAINT `FKmv5djqgabjrejlvcqaumamfsu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`),
  CONSTRAINT `FKnbnk1nct9ewe20wkulu64qy23` FOREIGN KEY (`park_solicitado_id`) REFERENCES `aparcamiento` (`id_aparcamiento`),
  CONSTRAINT `FKp386wu3kvj9bfldenwom5e90e` FOREIGN KEY (`park_ofrecido_id`) REFERENCES `aparcamiento` (`id_aparcamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `depositos` float DEFAULT NULL,
  `saldo` float DEFAULT NULL,
  `id_user` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `iban` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_review`
--

DROP TABLE IF EXISTS `user_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_review` (
  `puntuacion` int NOT NULL,
  `aparcamiento_id` bigint NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `id_user_review` bigint NOT NULL AUTO_INCREMENT,
  `reviewed_id` bigint NOT NULL,
  `reviewer_id` bigint NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_user_review`),
  KEY `FKb6ckvc3dgfpoe3vpew7juvglk` (`aparcamiento_id`),
  KEY `FKbapdji9430sqalcxvit1ue58v` (`reviewed_id`),
  KEY `FKkysqcqfumpg7bg7l7wba26a4n` (`reviewer_id`),
  CONSTRAINT `FKb6ckvc3dgfpoe3vpew7juvglk` FOREIGN KEY (`aparcamiento_id`) REFERENCES `aparcamiento` (`id_aparcamiento`),
  CONSTRAINT `FKbapdji9430sqalcxvit1ue58v` FOREIGN KEY (`reviewed_id`) REFERENCES `user` (`id_user`),
  CONSTRAINT `FKkysqcqfumpg7bg7l7wba26a4n` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`id_user`),
  CONSTRAINT `user_review_chk_1` CHECK (((`puntuacion` <= 5) and (`puntuacion` >= 1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15  9:54:28
