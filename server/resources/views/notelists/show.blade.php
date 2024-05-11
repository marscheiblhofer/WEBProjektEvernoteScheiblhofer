<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Notelist</title>

</head>
<body class="antialiased">
<h1>My Notelist List</h1>
<h2>{{$notelist->name}}</h2>

<hr>
<a href="\notelists">Back to list</a>
</body>
</html>
