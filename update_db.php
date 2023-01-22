<?php
include ("connect.inc.php"); // Include der Datenbankverbindung

$sql = "SELECT * FROM tasks";

$tasks = mysqli_query($con,$sql);

$sql = "SELECT * FROM tags";

$tags = mysqli_query($con,$sql);

/* numeric array */
$row = mysqli_fetch_array($tasks, MYSQL_NUM);

foreach ($row as $task) {
    echo $task;
}

?>
