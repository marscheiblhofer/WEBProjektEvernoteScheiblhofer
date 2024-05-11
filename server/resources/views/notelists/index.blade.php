<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Notelists</title>

</head>
<body class="antialiased">
<h1>All Notelists</h1>
<ul>
    @foreach($notelists as $notelist)
        <li>{{$notelist->id}} | {{$notelist->creator_id}}<br>
            <h3><a href="\notelists\{{$notelist->id}}">{{$notelist->name}}</a></h3></li>
    @endforeach
</ul>
</body>
</html>
