<!DOCTYPE html>
<html lang="en">

<body>
    <div class="email-container" style="width: 100%;margin: auto;display: block;">
        <h2>Detalhes</h2>
        <ul>
            <li>Nome: {{$reservation->name}}</li>
            <li>Email: {{$reservation->email}}</li>
            <li>Telemóvel: {{$reservation->phone}}</li>
            <li>Morada: {{$reservation->address}}</li>
            <li>Privado: {{$reservation->private ? "Sim" : "Não"}}</li>
            <li>Data: {{$reservation->date}} {{$reservation->time}}</li>
        </ul>
        <h2>Participantes</h2>
        <ul>
            @foreach ($reservation->participants as $key => $participant)
            <li>Participante {{$key + 1}}: {{$participant->birthday}} / {{$participant->gender}} /
                {{$participant->weight}} / {{$participant->height}}cm / {{$participant->shoe}} EU</li>
            @endforeach
        </ul>
        <h2>Atividade</h2>
        <ul>
            <li>Atividade: {{$reservation->experience->activity->name}}</li>
            <li>Experiência: {{$reservation->experience->name}}</li>
        </ul>
        <h2>Total: {{$reservation->total}}€</h2>
    </div>
</body>

</html>

<style>
    .image-container {
        width: 200px;
        margin: auto;
        display: block;
        margin-bottom: 20px;
    }

    .image-container img {
        width: 100%;
        height: auto;
    }

    .flex-center {
        display: flex;
        justify-content: center;
    }

    .email-container {
        max-width: 600px;
        width: 90%;
        margin: auto;
        display: block;
    }

    .title {
        font-weight: normal;
        text-align: center;
        margin-bottom: 5px;
    }

    .text {
        font-size: 1em;
    }

    .flex-center {
        display: flex;
        justify-content: center;
    }

    .translation {
        color: gray;
        font-size: .8em;
        margin-bottom: 30px;
    }

    .btn-url {
        text-decoration: none;
    }

    .button {
        margin: 25px auto;
        padding: 24px 36px;
        outline: none;
        border: none;
        text-decoration: none;
        cursor: pointer;
        text-transform: uppercase;
        border-radius: 8px;
        color: white;
        background: #ff7a5c;
        font-weight: bold;
        font-size: .9em;
        transition: .4s ease-out;
    }

    .button:hover {
        background: #fd6442;
        scale: 1.03;
    }
</style>