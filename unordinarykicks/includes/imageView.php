<?php
    require_once "database.php";
    // uzimamo ID patike iz url-a kako bismo je kasnije nasli u bazi
    if(isset($_GET['patike_id'])) {
        // Pravimo niz u koji stavljamo 4 stringa cija se imena podudaraju sa podacima u bazi podataka
        $imageAngle[0] = "imageData_default";
        $imageAngle[1] = "imageData_djon";
        $imageAngle[2] = "imageData_ledja";
        $imageAngle[3] = "imageData_sidebyside";
        // u zavisnosti od $_GET['angle'] iz baze podataka izvlacimo odgovarajucu sliku(glavnu sliku, djon, poledjinu, ili sliku jedne do druge patike)
        if(isset($_GET['angle'])){
            if(in_array($_GET['angle'],[0,1,2,3])){
             // uvek vracamo glavnu sliku modela, osim ukoliko nije oznaceno drugacije sa $_GET['angle']
   
                $angle = $imageAngle[$_GET['angle']];
            }else{
                $angle = $imageAngle[0];
            }
        }else{
            $angle = $imageAngle[0];
        }
        
        
        $id=intval($_GET['patike_id']);
        // Dodatno proveravamo da li je $angle jedan od dozvoljenih stringova, iako ne bi trebalo da bude jer je osigurano da je dozvoljen u liniji 19
        if(!in_array($angle,$imageAngle)){
            header("Location: index.php?error=noSuchAngle");
            exit();
        }
        $sql = "SELECT " . $angle . ",ime_patike FROM patike WHERE patike_id = ?";
                // iz baze podataka izvlacimo sadrzaj jedne slike pomocu patike_id i ugla

                $stmt = $conn->prepare($sql); 
                if(($stmt->bind_param("i", $id)) === false){
                    die('bind_param() failed: ' . htmlspecialchars(mysqli_error($conn)));
                }
                if(($stmt->execute()) === false){
                    die('execute() failed: ' . htmlspecialchars(mysqli_error($conn)));
                }
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
        // u headeru naglasavamo da je osobina sadrzaja koju vracamo slika a sa 'echo $row[$angle]' saljemo sadrzaj slike
		header("Content-type: image/jpeg");
        echo $row[$angle];
	}
	mysqli_close($conn);
?>