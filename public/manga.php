<?php

header('Content-Type: application/json');

$data = array(
	"title" => "Naruto",
	"largeImage" => "http://s1.mangareader.net/cover/naruto/naruto-l0.jpg",
	"yearOfRelease" => "1999",
	"status" => "Ongoing",
	"author" => "",
	"artist" => "",
	"readingDirection" => "Right to Left",
	"genre" => array("Action", "Drama", "Fantasy", "Martial Arts", "Shounen", "Super Power", "Supernatural")
);

echo json_encode($data);