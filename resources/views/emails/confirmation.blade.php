<!DOCTYPE html>
<html lang="en">

<body>
    <div class="email-container" style="max-width: 600px;width: 90%;margin: auto;display: block;">
        <div class="image-container flex-center" style="width: 200px;margin: auto;display: block;margin-bottom: 20px;">
            <a href="https://www.fastropemadeira.com/"><img src="https://www.fastropemadeira.com/logo.png"
                    style="width: 100%;height: auto;"></a>
        </div>

        <h1 class="title flex-center" style="font-size: 2em; display: block;text-align: center;font-weight: normal;">
            Está um passo mais perto de completar a sua reserva
        </h1>
        <div class="translation flex-center"
            style="display: block;text-align: center;color: rgb(85, 85, 85);font-size: 1em;margin-bottom: 30px;">
            (You are one step closer to confirm your reservation)
        </div>

        <div class="text flex-center" style="font-size: 1.2em;text-align">
            Por favor confirme o seu endereço de email
        </div>
        <div class="translation flex-center"
            style="display: block;text-align: center;color: rgb(85, 85, 85);font-size: 1em;margin-bottom: 30px;">
            (Please confirm your email address)
        </div>

        <div class="button-container flex-center">
            <a class="btn-url" href=https://www.fastropemadeira.com/confirmation/{{$token}}" style="text-decoration: none;">
                <input class="button btn-slide-line" type="button" value="Confirmar"
                    style="margin: 25px auto;display: block; padding: 24px 36px;outline: none;border: none;text-decoration: none;cursor: pointer;text-transform: uppercase;border-radius: 8px;color: white;background: rgb(52,60,94);font-weight: bold;font-size: .9em;transition: .4s ease-out;">
            </a>
        </div>
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