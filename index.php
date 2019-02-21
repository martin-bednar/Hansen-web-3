<?php
	$time = time() + 3600;
	if ($time<1551441600){
		require 'early.html';
		die();
	}
	require 'new/index.html';
?>