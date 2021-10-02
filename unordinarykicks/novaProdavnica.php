
<?php
    // mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    require_once 'includes/database.php';
    if(isset($_POST['submit'])
        && isset($_POST['adresa_tekst'])
        && isset($_POST['adresa_broj'])
        && isset($_POST['gradovi'])
        ){
            
            $adresaTekst = $_POST['adresa_tekst'];
            $adresniBroj = $_POST['adresa_broj'];
            $grad = $_POST['gradovi'];

            $sql = "SELECT gradovi_id FROM gradovi WHERE ime_grada = ?"; 

            $stmt = $conn->prepare($sql); 
            $stmt->bind_param("s", $grad);
            $stmt->execute();
            $result = $stmt->get_result(); // get the mysqli result
            $data = $result->fetch_assoc(); // fetch data 

            if(empty($data['gradovi_id'])){
                header("Location: novaProdavnica.php?error=gradNotFound");
                exit();
            }
            
            $grad_id = $data['gradovi_id'];
                
            $sql = "INSERT INTO prodavnice(adresa_tekst, adresa_broj, grad_id) VALUES (?, ?, ?)";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("Location: novaProdavnica.php?error=sqlerror");
                  exit();
            } else {
                if(mysqli_stmt_bind_param($stmt, "ssi", $adresaTekst, $adresniBroj, $grad_id) === false){
                    die('bind_param() failed: ' . htmlspecialchars(mysqli_error($conn)));
                }
                if(mysqli_stmt_execute($stmt) === false){
                    die('execute() failed: ' . htmlspecialchars(mysqli_error($conn)));
                }
                header("Location: novaProdavnica.php?success=true");
                exit();
            }


        } 
        
        

    
            // trebalo je  pored imena grada uzeti i grad_id kojeg bi koristili u formi kao VALUE u option tagu

    $sql = "SELECT ime_grada FROM gradovi ORDER BY ime_grada ASC"; 
    $result = mysqli_query($conn, $sql);


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prodavnica-Upload</title>
    <style>
        input,textarea{
            display:block;
        }
        div{
            margin-bottom:10px;
        }
    </style>
    <link rel="stylesheet" href="css/edit_page_style.css" >
</head>
<body>
    <div><a href="indexAdmin.php">admin Homepage</a></div>
    <form action="" method="POST" enctype="multipart/form-data">
        <div>
            <label for="adresa_tekst">Ulica prodavnice:</label>
            <input required type="text" placeholder="Ulica" name="adresa_tekst">
        </div>
        <div>
            <label for="adresa_broj">Adresni broj:</label>
            <input required type="text" placeholder="Broj " name="adresa_broj">
        </div>
        <select name="gradovi" id="gradovi">
        <?php
        
    if(mysqli_num_rows($result) > 0){
      while($row = mysqli_fetch_assoc($result)) {
        ?>
        <option value="<?php echo $row['ime_grada']?>"><?php echo $row['ime_grada']?></option>
       <?php		
      }
    }
      mysqli_close($conn);
    ?>
        </select>
        <div>
            <button type="submit" name ="submit">KREIRAJ PRODAVNICU</button>
        </div>
    </form>

</body>
</html>