<?php
    require_once 'includes/database.php';
    if(isset($_POST['submit'])
    && isset($_POST['prod_id'])
    && isset($_POST['patike'])
    && isset($_POST['vel_40'])
    && isset($_POST['vel_42'])
    && isset($_POST['vel_44'])
    && isset($_POST['vel_46'])
    && isset($_POST['vel_48'])
    && isset($_POST['vel_50'])
    ){
        $patika_id = intval($_POST['patike']);
        $prod_id = intval($_POST['prod_id']);
        $v_40 = intval($_POST['vel_40']);
        $v_42 = intval($_POST['vel_42']);
        $v_44 = intval($_POST['vel_44']);
        $v_46 = intval($_POST['vel_46']);
        $v_48 = intval($_POST['vel_48']);
        $v_50 = intval($_POST['vel_50']);
        
        $sql = "INSERT INTO patika_prodavnica(
            patika_id, prodavnica_id, velicina_40, velicina_42, velicina_44, velicina_46, velicina_48, velicina_50) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: sveProdavnice.php?error=sqlerror");
              exit();
        } else {
            if(mysqli_stmt_bind_param(
                $stmt, "iiiiiiii", $patika_id, $prod_id, $v_40, $v_42, $v_44, $v_46, $v_48, $v_50) === false){ // "===" proveravaju vrednost i tip podatka, dok "==" proveravaju samo vrednost ali ne i tip podatka  
                die('bind_param() failed: ' . htmlspecialchars(mysqli_error($conn)));
            }
            if(mysqli_stmt_execute($stmt) === false){
                die('execute() failed: ' . htmlspecialchars(mysqli_error($conn)));
            }
            header("Location: sveProdavnice.php?success=ubacenArtikl");
            exit();
        }
    }
    // proveravamo da li smo dosli sa stranice sveProdavnice.php
    if(!isset($_GET['prod'])){
      header("Location: sveProdavnice.php?error=artProdNotSelected");
      exit();
    }

    

    $sql = "SELECT patike_id, ime_patike
    FROM patike
    ORDER BY patike_id ASC
    "; 
    $result = mysqli_query($conn, $sql);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div><a href="sveProdavnice.php">NAZAD</a></div>
    <form action="" method="POST">
         <div>
            <input required hidden type="text" name="prod_id" value="<?php echo $_GET['prod'];?>">
        </div>
        <select name="patike" id="patike">
            <!-- izlistavanje svih patika -->
            <?php
                if(mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)) {
                        ?>
                            <option value="<?php echo $row['patike_id']?>"><?php echo $row['patike_id'] . " " . $row['ime_patike']?></option>
                        <?php		
                    }
                }
                mysqli_close($conn);
            ?>
        </select>
        <div>
            <input required type="number" min="0" max="255" placeholder="Velicina 40" name="vel_40">
        </div>
        <div>
            <input required type="number" min="0" max="255" placeholder="Velicina 42" name="vel_42">
        </div>
        <div>
            <input required type="number" min="0" max="255" placeholder="Velicina 44" name="vel_44">
        </div>
        <div>
            <input required type="number" min="0" max="255" placeholder="Velicina 46" name="vel_46">
        </div>
        <div>
            <input required type="number" min="0" max="255" placeholder="Velicina 48" name="vel_48">
        </div>
        <div>
            <input required type="number" min="0" max="255" placeholder="Velicina 50" name="vel_50">
        </div>
        <button type="submit" name="submit">POTVRDI</button>
    </form>
</body>
</html>