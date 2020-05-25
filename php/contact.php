<?php

use PHPMailer\PHPMailer\PHPMailer; //namespace dec.
$servername = "localhost";
$username = "root";
$password = "";


// establishing connection

$conn = mysqli_connect($servername, $username, $password,"portfolio") OR die(mysqli_error(($conn)));


//fetching values
$name =  ($_POST['name']);
$phone = ($_POST['phone']);
$email = ($_POST['email']);
$subject = ($_POST['subject']);
$msg = ($_POST['message']);

if(isset($_POST['submit']) ) {
//inserting stuff
if((!(empty($name)) && !(empty($phone))  && !(empty($email)) )) {
	//if the mandatory fields are set,insert in table
$sql= "INSERT INTO contact (name, email, number, subject, message)
   VALUES ('$name', '$email' , '$phone', '$subject')";

if (!mysqli_query($conn,$sql))
  {
  die(mysqli_error(($conn)));
  }
require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

$mail = new PHPMailer();
date_default_timezone_set('Etc/UTC');
//SMTP settings
$mail->isSMTP();
$mail->Host = gethostbyname('ssl://smtp.gmail.com');
$mail->SMTPAuth = true;
$mail->Username = "yash.bhanushali@sakec.ac.in";
$mail->Password = "madarauchiha123";//password from where to be sent.
$mail->Port = 465; //587ssl
$mail->SMTPSecure = "ssl"; //can be tls as well.


//Email Setting
$mail->setFrom($email,$name); //from person and his name.
$mail->addAddress($email);//where are we sending it.
$mail->Subject = $subject;//setting subject.
$mail->Body = $msg;

//testing if sent
if($mail->send()) {
  echo '<script type="text/javascript">alert("mail sent successfully!");</script>';

}
else {
  echo '<script type="text/javascript">alert("the error :'.$mail->ErrorInfo.'");</script>';
}

header("Refresh:0; url=contact.html");

}
else {
//display empty field names in alert 
echo '<script type="text/javascript">alert(" feild(s) cannot be empty");</script>';
//refresh the page 
header("Refresh:0; url=contact.html"); 
}
mysqli_close($conn);

}


?>
   