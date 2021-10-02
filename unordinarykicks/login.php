<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/loginstyle.css">
    <title>LOGIN</title>
</head>
<body>


    <h1 ><div id="login"> Log In </div></h1>

    <div class="main_container">
    <p class="noacc">No account? <a href="register.php">Register here!</a></p>
    
    <form action="includes/login-back.php" method="POST">
        <input type="text" name="username" placeholder="Username" autocomplete="off" class="input">
        <input type="password" name="password" placeholder="Password" class="input"><br>
        <button type="submit" name="submit" id="dugme">SUBMIT</button>
    </form>

    <div>



</body>
</html>