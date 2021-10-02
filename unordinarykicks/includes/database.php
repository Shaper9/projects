<?php
 
// include fajl za laksu konekciju 
$dbHost = "localhost";
$dbUser = "root";
$dbPass = "";
$dbName = "projekat";

// konekcija za bazu
$conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);


if(!$conn){
    die("Database connection failed!");
}

?>