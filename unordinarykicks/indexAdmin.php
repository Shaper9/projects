<?php
  session_start();
  // kod za proveravanje da li smo ulogovani
  // ako nismo necemo moci da pristupimu IndexAdmin.php
  if(!isset($_SESSION['sessionUser'])){
      header("Location: index.php?error=unauthorizedAccess");
  };
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/indexadminstyle.css" >
    <title>Admin-Upload</title>
    <style>
        input,textarea{
            display:block;
        }
        div{
            margin-bottom:10px;
        }
    </style>
</head>
<body>

  <div class="main_container">      
    <div class="dugme"><a href="uploadModel.php">UBACI NOVU PATIKU</a></div>
    <div class="dugme"><a href="sveProdavnice.php">LISTA PRODAVNICA</a></div>
    <div class="dugme"><a href="novaProdavnica.php">DODAJ PRODAVNICU</a></div>
    <div class="dugme"><a href="gradovi.php">DODAJ GRAD</a></div>
</div>


</body>
</html>