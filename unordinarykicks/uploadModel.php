<?php

    if(count($_FILES) > 0){ // funkcija count ispisuje broj elemenata unesenog niza u parametru
        if (is_uploaded_file($_FILES['slika_default']['tmp_name'])
            && is_uploaded_file($_FILES['slika_djon']['tmp_name'])
            && is_uploaded_file($_FILES['slika_ledja']['tmp_name'])
            && is_uploaded_file($_FILES['slika_sidebyside']['tmp_name'])
            && isset($_POST['ime_modela'])
            && isset($_POST['opis_modela'])
            && isset($_POST['cena'])
            ) {
            require_once 'includes/database.php';

            // Data checking(size and type)
            $ime_modela = $_POST['ime_modela'];
            $opis_modela = $_POST['opis_modela'];
            $cena = $_POST['cena'];

            echo "<br/>";
            if(strlen($ime_modela) === 0 || strlen($ime_modela) > 255){
                header("Location: uploadModel.php?error=ime_modela_invalidStringLength");
                exit();
            }
            if(strlen($opis_modela) === 0 || strlen($opis_modela) > 65635){
                header("Location: uploadModel.php?error=opis_modela_invalidStringLength");
                exit();
            }
            if(!is_numeric($cena)){
                header("Location: uploadModel.php?error=cena_invalidInput");
                exit();
            }
            $cena = intval($cena);
            
            $imagesPath['default'] = $_FILES['slika_default']['tmp_name'];
            $imagesPath['djon'] = $_FILES['slika_djon']['tmp_name'];
            $imagesPath['ledja'] = $_FILES['slika_ledja']['tmp_name'];
            $imagesPath['sidebyside'] = $_FILES['slika_sidebyside']['tmp_name'];

            $allowedTypes = [
                // PNG NE RADI treba srediti
                'image/png' => 'png', 
                'image/jpeg' => 'jpg'
            ];

            foreach($imagesPath as &$imagePath){
                $file_path = $imagePath;
                $file_size = filesize($file_path); // dobijamo velicinu slike
                // sledece funckcije su za dobijanje tipa fajla(npr. da li je fajl jpg,png,gif,txt)
                $file_info = finfo_open(FILEINFO_MIME_TYPE); 
                $file_type = finfo_file($file_info, $file_path);
                echo "$file_size,";

                if($file_size === 0){
                    header("Location: uploadModel.php?error=theFileIsEmpty");
                    exit();
                }
                if($file_size > 1024 * 1024){ // 1024*1024*byte kako fajl ne bi bio veci od 1MB 
                    header("Location: uploadModel.php?error=fileSizeTooLarge");
                    exit();
                }
                if(!in_array($file_type, array_keys($allowedTypes))) { // proveravamo da li je tip fajla koji je korisnik prosledio dozvoljen
                    header("Location: uploadModel.php?error=fileTypeNotAllowed");
                    exit();
                }

            }

            // $imagesPath['default'] = $_FILES['slika_default']['tmp_name'];
            // $imagesPath['djon'] = $_FILES['slika_djon']['tmp_name'];
            // $imagesPath['ledja'] = $_FILES['slika_ledja']['tmp_name'];
            // $imagesPath['sidebyside'] = $_FILES['slika_sidebyside']['tmp_name'];




            // file_get_contents pretvara ceo fajl u string, koji kasnije skladistimo u DB

            $imgData[0] = file_get_contents($imagesPath['default']);  
            $imgData[1] = file_get_contents($imagesPath['djon']);
            $imgData[2] = file_get_contents($imagesPath['ledja']);
            $imgData[3] = file_get_contents($imagesPath['sidebyside']);


            $sql = "INSERT INTO patike(ime_patike ,opis_patike, cena_patike, imageData_default, imageData_djon, imageData_ledja, imageData_sidebyside)
	                VALUES(?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql); 
                if(($stmt->bind_param("ssissss", $ime_modela, $opis_modela, $cena, $imgData[0], $imgData[1], $imgData[2],$imgData[3])) === false){
                    die('bind_param() failed: ' . htmlspecialchars(mysqli_error($conn)));
                }
                if(($stmt->execute()) === false){
                    die('execute() failed: ' . htmlspecialchars(mysqli_error($conn)));
                }

            header("Location: indexAdmin.php?success=iThinkIsGood");
            exit();
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/edit_page_style.css" >
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
    <div class="maincontainer">
    <div ><a href="indexAdmin.php">admin Homepage</a></div>

    <form action="" method="POST" enctype="multipart/form-data">
        
        <div>
            <label for="ime_modela">Ime modela patike:</label>
            <input required type="text" placeholder="Ime modela" name="ime_modela">
        </div>
        <div>
            <label for="slika_default">Slika jedne patike:</label>
            <input required type="file" name="slika_default">
        </div>

        <div>
            <label for="slika_djon">Slika djona patike:</label>
            <input required type="file" name="slika_djon">
        </div>
        <div>
            <label for="slika_ledja">Slika ledja para patika:</label>
            <input required type="file" name="slika_ledja">
        </div>
        <div>
            <label for="slika_sidebyside">Slika jedne do druge patike:</label>
            <input required type="file" name="slika_sidebyside">
        </div>
        <div>
            <label for="opis_modela">Opis patike:</label>
            <textarea required name="opis_modela"  cols="60" rows="15"></textarea>
        </div>
        
        <div>
            <label for="cena">Cena patike:</label>
            <input required type="number" name="cena" placeholder="price">
        </div>
        <div>
            <button type="submit" name ="submit">UBACI MODEL</button>
        </div>
    </form>
        </div>
</body>
</html>