<?php
    session_start();
    unset($_SESSION['sessionId']);
    unset($_SESSION['sessionUser']);
    session_destroy();
    // preko headera vracamo se na homepage posle izaska sa naseg profila
    header("Location: index.php?success=loggedOut");
    exit();
?>