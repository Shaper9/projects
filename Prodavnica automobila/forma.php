<!DOCTYPE html>
<?php 

echo "<h1>POTVRDITE VASE PODATKE</h1> <br/><br/><br/>";

$ime=$_POST['name'];
echo "<b>Vase ime: </b>", $ime, "<br/>";
$prezime=$_POST['surname'];
echo "<b>Vase prezime: </b>", $prezime ,"<br/>";
$datum=$_POST['date'];
echo "<b>Vas datum rojdennja:</b> ", $datum, "<br/>";

       

$placanje=$_POST['payment'];
echo "<b>Nacin placanja:</b> ", $placanje, "<br/>";
$grad=$_POST['city'];
echo "<b>Izabrano voizlo mozete preuzeti u gradu:</b> ", $grad, "<br/>";
$date=date("Y/m/d");
$newdate = date('Y-m-d', strtotime($date.' + 10 days'));
echo "<b>Vozilo mozete preuzeti od:</b> ", $newdate, "<br/><br/><br/><br/><br/>";

$dodatna_oprema=array("PRVA POMOC","REZERVNI TOCAK","RADIO","DIZALICA","TROUGAO");
echo "Uz automobil dobili ste i: " , "<br/>";
foreach($dodatna_oprema as $oprema){
    echo "$oprema" , "<br/>" ;

}
echo "<br/><br/><br/><br/>";


$cena=120000;
$multiplikator=0; // multiplikator  za popuste

If($placanje=='CRYPTO'){   
    $multiplikator+=0.1;
    echo "<b>Ostvarili ste dodatni popust od 10% prilikom placanja sa kripto valutom</b> " , "<br/>";
}



// $pol=$_POST['gender'];
// echo $pol; 
if (isset($_POST['gender'])){
    $pol=$_POST['gender'];
    if ($pol=='zenski'){
        echo "<b>  U mesecu martu sve dame dobijaju dodatan popust od 5% </b><br/>";
        $multiplikator+=0.05;
    }
}
$cena=$cena-($multiplikator*$cena);
echo "<h2>Vasa cena je:  ", $cena, "EUR</h2>";



?>


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>formaphp</title>
</head>
<body>
 

<a href="potvrda.html" target="_blank"> <button type="button" > POTVRDJUJEM UNETE PODATKE </button> </a>





</body>
</html>