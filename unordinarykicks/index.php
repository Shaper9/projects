<?php
    // otvaramo sesiju i proveravamo da li je korisnik ulogovan
    session_start();
    $loggedIn = false;
    if(isset($_SESSION['sessionUser'])){
        $loggedIn = true;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Homepage</title>
</head>

<!-- iz baze podataka pravimo upit koji izvlaci 9 patika -->
<?php
  require_once 'includes/database.php';
  $sql = "SELECT patike_id, ime_patike FROM patike ORDER BY patike_id DESC LIMIT 9"; 
  $result = mysqli_query($conn, $sql);
?>


<body>

<nav>
    <form action="includes/logout-back.php"></form>
    <ul>
        <li><img class="logo" src="images/logo.png"></li>
        <li id="filler"></li>
        <li class="dugme"><a href="about.html"> About </a></li>
        <li class="dugme"> <a href="contact.html"> Contact </a></li>
        <?php
          // proveravamo da li  je korisnik ulogovan tako sto smo na pocetku kod imali promenljivu $loggedIn  
          // ako je TRUE pojavljuje se dugme EDIT PAGE
          // preko koje Admin stranice moze da edituje patike, gradove, prodavnice
          // takodje pojavljuje se i LOGOUT dugme preko kog korisnik moze da izadje iz svog profila

          if($loggedIn === true){
            echo "<li class=\"dugme\"> <a href=\"indexAdmin.php\"> Edit page </a></li>";
          
            echo "<li class=\"dugme\"> <a href=\"logout.php\"> Logout </a></li>";
          }else {
            echo "<li class=\"dugme\"> <a href=\"login.php\"> Login </a></li>";
          }
          
          
          
        ?>
        
    </ul>

</nav>    




<div id="main_container">

    <?php
    // 
    if(mysqli_num_rows($result) > 0){   // mysql_num_rows dobijamo broj redova rezultata SQL upita
      while($row = mysqli_fetch_assoc($result)) { // nakon toga ,sve dok redova ima skladistimo posebno svaki red kao niz u promenljivu $row 
        ?>
        
  <!-- svaka patika koja je sada smestena u promenjivo $row, pravi slicicu za sebe -->
  <div class="shoe_card">
    <a href="model.php?patike_id=<?php echo $row["patike_id"] ?>">    
      <div class="image_container">
         <img src="includes/imageView.php?patike_id=<?php echo $row["patike_id"] ?>" />
      </div>
      <div class="shoe_name_container">
        <p> <b> <?php echo $row["ime_patike"] ?> </b></p>
      </div>
      </a>
    </div>

         
       <?php		
      }
    }
      mysqli_close($conn);
    ?>


</div>


    
</body>
</html>