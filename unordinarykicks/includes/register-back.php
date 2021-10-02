<?php 

    if (isset($_POST['submit'])){
        
        require_once 'database.php';

        $username = $_POST['username'];
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];

        if (empty($username) || empty($password) || empty($confirmPassword)){
            header("Location: ../register.php?error=emptyfields&username=".$username);
            exit();
            // preg_match("/^[a-zA-Z0-9]*/" koristimo kako bismo dozvolili korisniku da upisuje samo slova i brojeve
        } elseif(!preg_match("/^[a-zA-Z0-9]*/","$username")){
            header("Location: ../register.php?error=invalidUsername&username=".$username);
            exit();
        } elseif($password !== $confirmPassword){
            header("Location: ../register.php?error=passwordDoNotMatch&username=".$username);
            exit();
        } else{
            // proveravamo da li user vec postofji u bazi
            $sql = "SELECT username FROM users WHERE username = ?";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("Location: ../register.php?error=sqlerror");
            exit();
            } else {
                mysqli_stmt_bind_param($stmt, "s", $username);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_store_result($stmt);
                $rowCount = mysqli_stmt_num_rows($stmt);

                if($rowCount > 0 ){
                    header("Location: ../register.php?error=usernameTaken");
                     exit();
                } else {
                    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
                    $stmt = mysqli_stmt_init($conn);
                    if(!mysqli_stmt_prepare($stmt, $sql)){
                        header("Location: ../register.php?error=sqlerror");
                          exit();
                } else {
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Ubacujemo u bazu podataka podatke o novom korisniku, a password cuvamo kao hashovanu vrednost radi bolje sigurnosti
                    mysqli_stmt_bind_param($stmt, "ss", $username, $hashedPassword);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../login.php?success=registered");
                    exit();
                }

            }
        }
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }
} else {
    header("Location: ../register.php?error=accessforbidden");
    exit();
}

?>