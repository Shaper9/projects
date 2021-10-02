<?php
// proveravamo da li smo dosli sa stranice Sveprodavnice.php
    if(!isset($_GET['prod'])){
        header("Location: sveProdavnice.php?error=artProdNotSelected");
        exit();
    }
    $prod_id = $_GET['prod'];
    
    require_once 'includes/database.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stanje Prodavnice</title>
    <style>
        span {
            display: inline-block;
            width: 150px;
        }
    </style>
</head>
<body>
    <?php
        
        $sql = "SELECT adresa_tekst, adresa_broj, gradovi.ime_grada
        FROM prodavnice
        JOIN gradovi
        ON prodavnice.grad_id = gradovi.gradovi_id
        WHERE prodavnice.prodavnice_id = ?";

        if($stmt = $conn->prepare($sql)){

        }else {
            $error = $conn->errno . ' ' . $conn->error;
            echo $error;
        };
        
        $stmt->bind_param("i", $prod_id);
        $stmt->execute();
        $result = $stmt->get_result(); // get the mysqli result
        $data = $result->fetch_assoc(); // fetch data 

        if(empty($data['ime_grada']) || empty($data['adresa_tekst']) || empty($data['adresa_broj'])){
            header("Location: novaProdavnica.php?error=dataNotFound");
            exit();
        }
        $ime_grada = $data['ime_grada'];
        $adresa_tekst = $data['adresa_tekst'];
        $adresa_broj = $data['adresa_broj'];
    ?>
    <h1><?php echo $ime_grada . " " . $adresa_tekst . " " . $adresa_broj?></h1>
    <?php
        
        $sql = "SELECT patika_id, velicina_40, velicina_42,
            velicina_44, velicina_46, velicina_48, velicina_50, patike.ime_patike
        FROM patika_prodavnica
        JOIN patike
        ON patika_prodavnica.patika_id = patike.patike_id
        WHERE patika_prodavnica.prodavnica_id = ?";

        
        if($stmt = $conn->prepare($sql)){

        }else {
            $error = $conn->errno . ' ' . $conn->error;
            echo $error;
        };
        
        $stmt->bind_param("i", $prod_id);
        $stmt->execute();
        $result = $stmt->get_result(); // get the mysqli result
        

        if ($result->num_rows > 0) {
            // prikaz rezultata za svaki red
            while($row = $result->fetch_assoc()) {
                echo "<div>";
                echo "<span>Patika ID: ". $row['patika_id'] . "</span>".
                    "<span>" . $row['ime_patike'] . "</span>".
                    "<span>" . "Stanje Velicine 40: ". $row['velicina_40'] . "</span>".
                    "<span>" . "Stanje Velicine 42: ". $row['velicina_42'] . "</span>".
                    "<span>" . "Stanje Velicine 44: ". $row['velicina_44'] . "</span>".
                    "<span>" . "Stanje Velicine 46: ". $row['velicina_46'] . "</span>".
                    "<span>" . "Stanje Velicine 48: ". $row['velicina_48'] . "</span>".
                    "<span>" . "Stanje Velicine 50: ". $row['velicina_50'] . "</span>";
                echo "</div>";
            }
            } else {
            echo "Nema rezultata";
            }
            $conn->close();
            
    ?>

</body>
</html>