<?php
    require_once 'includes/database.php';
    // proveravamo da li smo dosli do ove stranice preko forme
    // 
    if( isset($_POST['ime_grada']) 
        && isset($_POST['submit'])){
        // cyvamo unetu vrednost grada i ubacujemo ga u DB preko SQL upita
        $ime_grada = strtolower(trim($_POST['ime_grada']));
        $sql = "INSERT INTO gradovi(ime_grada) VALUES ('{$ime_grada}')";
        $current_id = mysqli_query($conn, $sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error($conn));
        if (isset($current_id)) {
            header("Location: indexAdmin.php?success=true");
        }
    }
    // uzimamo sve gradove koji su u DB , koje cemo kasnije izlistati
    $sql = "SELECT ime_grada FROM gradovi ORDER BY ime_grada ASC"; 
    $result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/edit_page_style.css" >
    <title>Grad-Upload</title>
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
    <div><a href="indexAdmin.php">admin Homepage</a></div>
    <h2>Postojeci gradovi:</h2>
    <div>
        <ul> 
            <!-- kod za izlistavanje gradova dobijenih iz sql upita -->
            <?php
                if(mysqli_num_rows($result) > 0){
                while($row = mysqli_fetch_assoc($result)) {
            ?>
                    <li><?php echo $row['ime_grada']?></li>
            <?php		
                }
                }
                mysqli_close($conn);
            ?>
        </ul>
    </div>
    <form action="" method="POST" enctype="multipart/form-data">
        <div>
            <label for="ime_grada">Unesi novi grad:</label>
            <input required type="text" placeholder="Ime grada" name="ime_grada">
        </div>
        <div>
            <button type="submit" name ="submit">UBACI GRAD</button>
        </div>
    </form>

</body>
</html>