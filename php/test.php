<?php
if (isset($_POST["isvalid"]) && $_POST["isvalid"] === "valid"){
include 'myprojectv1.0/contact.php';
exit;
} else {
header("Location:portfolio.html");
exit;
}
?>