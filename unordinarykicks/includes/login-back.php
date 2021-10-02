<?php
    if (isset($_POST['submit'])){
        require 'database.php';

        $username = $_POST['username'];
        $password = $_POST['password'];
        // Ubacujemo u promenljive podatke za prijavljivanje iz POST requesta i proveravamo njihovu autenticnost

        if(empty($username) || empty($password)){
            header("Location: ../login.php?error=emptyfields");
            exit();
        } else {
            $sql = "SELECT * FROM users WHERE username = ?";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("Location: ../login.php?error=sqlerror");
                exit();
            } else {
                mysqli_stmt_bind_param($stmt, "s", $username);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if($row = mysqli_fetch_assoc($result)){
                    // funkcija 'password_verify' vraca istinitost da li je uneta sifra hashovana ista kao hashovana sifra u bazi podataka
                    $passCheck = password_verify($password, $row['password']);
                    if($passCheck == false){
                        header("Location: ../login.php?error=wrongPassword");
                        exit();
                    } elseif($passCheck == true){
                        session_start();
                        // otvaramo sesiju, i u nizu ubacujemo podatke o korisniku koji je logovan, koje koristimo za dozvolu/zabranu odredjenih privilegija na drugim stranicama sajta
                        $_SESSION['sessionId'] = $row['id'];
                        $_SESSION['sessionUser'] = $row['username'];
                        header("Location: ../index.php?success=loggedIn");
                        exit();
                    } else {
                        header("Location: ../login.php?error=wrongPassword");
                        exit();
                    }
                } else {
                    header("Location: ../login.php?error=nouser");
                    exit(); 
                }
            }
        }

    } else {
        header("Location: ../login.php?error=accessforbidden");
        exit();
    }

?>