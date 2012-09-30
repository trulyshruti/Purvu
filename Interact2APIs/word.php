<?php

$file_handle = fopen("words.txt", "r");
$a_thingy=array();
while (!feof($file_handle)) {
   $line = fgets($file_handle);
   $a_thingy[] = $line;
}

echo json_encode($a_thingy);

?>
