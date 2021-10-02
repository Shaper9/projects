<?php
    require_once "includes/database.php";
    // proveravamo da li je postavljen ID patike u GET requestu
    if(isset($_GET['patike_id'])) {
        $sql = "SELECT ime_patike,opis_patike,cena_patike,imageData_default,imageData_djon,imageData_ledja,imageData_sidebyside FROM patike WHERE patike_id=" . $_GET['patike_id'];
		$result = mysqli_query($conn, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn)); // mysqli_error vraca string opisa errora
		if(!mysqli_num_rows($result) > 0){
      header("Location: index.php?error=noShoeFound");
      exit();
    }
    
    $row = mysqli_fetch_array($result);
        
	}
  else{
    header("location: index.php?error=Id_not_found");
  }
	mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/patika.css">
    <style>p{margin-top:15px;}</style>
    <style>p{background-color:rgb(0,213	,75);
             border-radius:10px;}
           a{text-decoration: none;
             color:white;}</style>
    <title><?php echo $row['ime_patike']?></title>
</head>
<body>
  <img src="images/logo.png" id=logo_gore>

  <div class="main_container">
        <div class="slikice_patika_container">
            <div class="slikica_patika_card">
            <img src="includes/imageView.php?patike_id=<?php echo $_GET['patike_id']?>&angle=0">
            </div>
            <div class="slikica_patika_card">
              <img src="includes/imageView.php?patike_id=<?php echo $_GET['patike_id']?>&angle=1">
            </div>
            <div class="slikica_patika_card">
            <img src="includes/imageView.php?patike_id=<?php echo $_GET['patike_id']?>&angle=2">
            </div>
            <div class="slikica_patika_card">
              <img src="includes/imageView.php?patike_id=<?php echo $_GET['patike_id']?>&angle=3">
            </div>
        </div>
        <div class="description">
          <div>
            <?php echo $row["opis_patike"]?>
            <a href="modelDostupnost.php?id=<?php echo $_GET['patike_id']?>" class="dugme"><p>
              PROVERI STANJE
            </p></a>
          </div>
        </div>
  </div>



</body>
</html>