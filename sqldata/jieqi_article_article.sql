-- MySQL dump 10.13  Distrib 5.5.17, for Win32 (x86)
--
-- Host: localhost    Database: snovel
-- ------------------------------------------------------
-- Server version	5.5.17

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
-- Table structure for table `jieqi_article_article`
--

DROP TABLE IF EXISTS `jieqi_article_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jieqi_article_article` (
  `articleid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `siteid` smallint(6) unsigned NOT NULL DEFAULT '0',
  `postdate` int(11) unsigned NOT NULL DEFAULT '0',
  `lastupdate` int(11) unsigned NOT NULL DEFAULT '0',
  `articlename` varchar(50) CHARACTER SET gbk COLLATE gbk_bin NOT NULL DEFAULT '',
  `keywords` varchar(50) NOT NULL DEFAULT '',
  `initial` char(1) NOT NULL DEFAULT '',
  `authorid` int(11) unsigned NOT NULL DEFAULT '0',
  `author` varchar(30) CHARACTER SET gbk COLLATE gbk_bin NOT NULL DEFAULT '',
  `posterid` int(11) unsigned NOT NULL DEFAULT '0',
  `poster` varchar(30) CHARACTER SET gbk COLLATE gbk_bin NOT NULL DEFAULT '',
  `agentid` int(11) unsigned NOT NULL DEFAULT '0',
  `agent` varchar(30) CHARACTER SET gbk COLLATE gbk_bin NOT NULL DEFAULT '',
  `sortid` smallint(3) unsigned NOT NULL DEFAULT '0',
  `typeid` smallint(3) unsigned NOT NULL DEFAULT '0',
  `intro` text NOT NULL,
  `notice` text NOT NULL,
  `setting` text NOT NULL,
  `lastvolumeid` int(11) unsigned NOT NULL DEFAULT '0',
  `lastvolume` varchar(100) NOT NULL DEFAULT '',
  `lastchapterid` int(11) unsigned NOT NULL DEFAULT '0',
  `lastchapter` varchar(100) NOT NULL DEFAULT '',
  `chapters` smallint(6) unsigned NOT NULL DEFAULT '0',
  `size` int(11) unsigned NOT NULL DEFAULT '0',
  `lastvisit` int(11) unsigned NOT NULL DEFAULT '0',
  `dayvisit` int(11) unsigned NOT NULL DEFAULT '0',
  `weekvisit` int(11) unsigned NOT NULL DEFAULT '0',
  `monthvisit` int(11) unsigned NOT NULL DEFAULT '0',
  `allvisit` int(11) unsigned NOT NULL DEFAULT '0',
  `lastvote` int(11) unsigned NOT NULL DEFAULT '0',
  `dayvote` int(11) unsigned NOT NULL DEFAULT '0',
  `weekvote` int(11) unsigned NOT NULL DEFAULT '0',
  `monthvote` int(11) unsigned NOT NULL DEFAULT '0',
  `allvote` int(11) unsigned NOT NULL DEFAULT '0',
  `vipvotetime` int(11) NOT NULL DEFAULT '0',
  `vipvotenow` int(11) NOT NULL DEFAULT '0',
  `vipvotepreview` int(11) NOT NULL DEFAULT '0',
  `goodnum` int(11) unsigned NOT NULL DEFAULT '0',
  `badnum` int(11) unsigned NOT NULL DEFAULT '0',
  `toptime` int(11) unsigned NOT NULL DEFAULT '0',
  `saleprice` int(11) unsigned NOT NULL DEFAULT '0',
  `salenum` int(11) unsigned NOT NULL DEFAULT '0',
  `totalcost` int(11) unsigned NOT NULL DEFAULT '0',
  `articletype` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `permission` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `firstflag` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `fullflag` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `imgflag` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `power` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `display` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`articleid`),
  KEY `articlename` (`articlename`),
  KEY `posterid` (`posterid`),
  KEY `authorid` (`authorid`),
  KEY `agentid` (`agentid`),
  KEY `initial` (`initial`),
  KEY `sortid` (`sortid`,`typeid`),
  KEY `display` (`display`),
  KEY `size` (`size`),
  KEY `lastupdate` (`lastupdate`),
  KEY `author` (`author`)
) ENGINE=MyISAM AUTO_INCREMENT=4349 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-18 16:51:05
