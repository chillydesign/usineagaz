<?php

ini_set('default_charset', 'UTF-8');
header('Content-Type: application/json;charset=UTF-8');


try {


  $url = "http://api.intrazik.com/api/v1/accesstoken?client_id=14_1vhs1tutyuo04ocw84kwk80ogs00k448cc4k8scwwk40kkwck0&client_secret=5ngr2hfgbeo0gckcokoks4k84ggc0wcc0cg00k4gcg8ggoks8g&username=usineagaz&password=4cPmpH3N";

  $ch = curl_init($url);

  if (FALSE === $ch)  throw new Exception('failed to initialize');

  //return the transfer as a string
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
  ));


  // $output contains the output string
  $output = curl_exec($ch);

  if (FALSE === $output) throw new Exception(curl_error($ch), curl_errno($ch));


  echo ($output);


  // close curl resource to free up system resources
  curl_close($ch);


} catch(Exception $e) {

  trigger_error(sprintf(
    'Curl failed with error #%d: %s',
    $e->getCode(), $e->getMessage()),
    E_USER_ERROR);

}


  ?>
