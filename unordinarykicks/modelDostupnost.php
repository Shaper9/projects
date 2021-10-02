<?php
    if(!isset($_GET['id'])){
        header("Location: index.php?error=idNotProvided");
    }
    require_once "includes/database.php";
    $id = intval($_GET['id']); // intval vraca uneti parametar kao INT
    $sql = "SELECT patike.ime_patike FROM patike WHERE patike.patike_id = ?";
    // pravimo statement
    // $conn-> prepare priprema statement za izvrsavanje i vraca objekat kog skladistimo u $stmt
    if($stmt = $conn->prepare($sql)){
    }else {
            header("location: index.php?error=sql_error");
    };
        
    $stmt->bind_param("i", $id); // bind_param vezuje promenljive za nepoznate promenljive u SQL statemantu
    $stmt->execute(); // izvrsvamo upit
    $result = $stmt->get_result();
    if(!(mysqli_num_rows($result) > 0)){
        header("Location: index.php?error=invalidPatikaId");
    }
    $row = mysqli_fetch_assoc($result);
    $ime_patike = $row['ime_patike'];
    
   // pravimo SQL upit sa svim informacijama za jednu patiku

    $sql = "SELECT velicina_40, velicina_42,velicina_44, velicina_46, velicina_48, velicina_50,
        prodavnice.adresa_tekst, prodavnice.adresa_broj, gradovi.ime_grada
        FROM patika_prodavnica
        JOIN prodavnice
        ON patika_prodavnica.prodavnica_id = prodavnice.prodavnice_id
        JOIN gradovi
        ON prodavnice.grad_id = gradovi.gradovi_id
        WHERE patika_prodavnica.patika_id = ?";
    // i onda preko statementa menjamo promenljivu ? u IDpatike
        if($stmt = $conn->prepare($sql)){

        }else {
            header("location: index.php?error=sql_error");
        };
        
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();// get_result uzima rezultate SQL upita, red po red 

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/dostupnost.css">
    
    <title>Document</title>
</head>
<body>

    <div class="main_container">
    <?php
        if ($result->num_rows > 0) {
            // prikaz rezultata za svaki red
            while($row = $result->fetch_assoc()) {
                echo "<div class=kartica>";
                echo "<span>Grad: ". $row['ime_grada'] . "</span>"."<br>".
                "<span>Ulica: " . $row['adresa_tekst'] . "</span>"."<br>".
                "<span>Broj: " . $row['adresa_broj'] . "</span>"."<br>".
                    "<span>" . "Stanje Velicine 40: ". $row['velicina_40'] ."| " . "</span>".
                    "<span>" . "Stanje Velicine 42: ". $row['velicina_42'] ."| ". "</span>".
                    "<span>" . "Stanje Velicine 44: ". $row['velicina_44'] ."| ". "</span>".
                    "<span>" . "Stanje Velicine 46: ". $row['velicina_46'] ."| ". "</span>".
                    "<span>" . "Stanje Velicine 48: ". $row['velicina_48'] ."| ". "</span>".
                    "<span>" . "Stanje Velicine 50: ". $row['velicina_50'] ."| ". "</span>"."<br>"."<br>";
                echo "</div>";
            }
            } else {
            echo "Nema na stanju";
            }
            $conn->close();
    ?>
    </div>


</body>
</html>