<?php
// proveravamo da koja od opcija je izabrana i odatle nas kod vodi ka odgovarajucoj stranici
    if(isset($_GET['submit']) && isset($_GET['opcija']) && isset($_GET['prodavnice'])){
        if($_GET['opcija'] === "stanje"){
            header("Location: prodavnicaJedna.php?prod=".$_GET['prodavnice']);
            exit();
        }
        if($_GET['opcija'] === "novi_proizvod"){
            header("Location: prodavnicaArt.php?prod=".$_GET['prodavnice']);
            exit();
        }
    }

    require_once 'includes/database.php';

    $sql = "SELECT prodavnice_id,adresa_tekst,adresa_broj,gradovi.ime_grada
    FROM prodavnice
    JOIN gradovi
    ON prodavnice.grad_id = gradovi.gradovi_id
    ORDER BY gradovi.ime_grada ASC"; 
    $result = mysqli_query($conn, $sql);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/edit_page_style.css" >
    <title>Document</title>
</head>
<body>
    <div><a href="indexAdmin.php">admin Homepage</a></div>
    <form action="" method="GET">
        <select name="prodavnice" id="prodavnice">
        <?php
        // izlistavamo sve prodavnice
            if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)) {
                ?>
                <option value="<?php echo $row['prodavnice_id']?>"><?php echo  $row['ime_grada'] . " " . $row['adresa_tekst'] . " " . $row['adresa_broj'] ?></option>
            <?php		
            }
            }
            mysqli_close($conn);
        ?>
        </select>
        <br>
        <input type="radio" id="stanje" name="opcija" value="stanje" checked>
        <label for="stanje">Stanje</label><br>
        <input type="radio" id="novi_proizvod"  name="opcija" value="novi_proizvod">
        <label for="novi_proizvod">Novi Proizvod</label>
        <br>
        <button type="submit" name="submit">POTVRDI</button>
    </form>
</body>
</html>