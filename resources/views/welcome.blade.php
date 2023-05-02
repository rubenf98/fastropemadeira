<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5">


    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">


    <meta name="keywords"
        content="Fast, Rope, fastrope, madeira, island, canyoning, canionismo, caminhada, hiking, adventure, experience, aventura, fast, rope">
    <meta name="author" content="Rúben Freitas">
    <meta name="description"
        content="Fast Rope is more than a Adventure company, is a team that we all share the passion for Canyoning, Hiking and much more...we also do private and personalized tours, you choose what you want to do and we make it happen.">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Allura&family=Mukta:wght@300;500;700&display=swap"
        rel="stylesheet">

    <title>FastRope</title>
</head>

<style>

    html,
    body,
    #index {
        height: 100%;
        font-family: 'Mukta', sans-serif;
        scroll-behavior: smooth;
    }


    .ant-cascader-menu:last-child {
        min-width: 400px !important;
    }

    .ant-cascader-menu:first-child {
        min-width: 111px !important;
    }

    body {
        margin: 0;
        position: relative;
    }

    .full-page-loader {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        filter: contrast(20);
    }

    .full-page-loader>div {}

    .full-page-loader>div>img {
        display: block;
    }

    .gooey {
        padding: 10px;
        width: 100%;
        height: 40px;
        margin: 10px auto;
        background: #fff;
        filter: contrast(20);
    }

    .gooey .dot {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 22px;
        left: 60px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
        transform: translateX(0);
        animation: dot 2.8s infinite;
    }

    .gooey .dots {
        transform: translateX(0);
        margin-top: 12px;
        margin-left: 70px;
        animation: dots 2.8s infinite;
    }

    .gooey .dots span {
        display: block;
        float: left;
        width: 16px;
        height: 16px;
        margin-left: 16px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
    }

    @keyframes dot {
        50% {
            transform: translateX(120px);
        }
    }

    @keyframes dots {
        50% {
            transform: translateX(-20px);
        }
    }
</style>


<script>
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
</script>

<body>
    <div id="index">
        <script src="{{mix('js/app15042023.js')}}"></script>
    </div>
</body>



</html>