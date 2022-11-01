import { ChildProcess, exec } from 'child_process'
import fs from 'fs'

export default function create()
{
    
    fs.mkdirSync('pages/main', { recursive: true })
    fs.mkdirSync('pages/second', { recursive: true })
    fs.writeFileSync('pages/main/index.html',
    `<!DOCTYPE html>
    <html>
    <head>
        <route></route>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Orkrux App</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    </head>
    <body>
        <h2>Hello World</h2>
        <a href="second">Go to second</a>
    </body>
    </html>`)

    fs.writeFileSync('pages/second/index.html',
    `<!DOCTYPE html>
    <html>
    <head>
        <route>second</route>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Orkrux App</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    </head>
    <body>
        <h2>Hello from Orkrux</h2>
       
    </body>
    </html>`)
    fs.writeFileSync('pages/main/main.css',
    `body
    {
        background-color: #222;
        color: white;
        font-family: monospace;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    h2
    {
        animation: anim 5s infinite;
    }
    @keyframes anim
    {
        0%
        {
            transform: scale(1);
            opacity: 1;
        }
        50%
        {
            transform: scale(1.2);
            opacity: 0.5;
        }
    }`)
    fs.writeFileSync('pages/second/main.css',
    `body
    {
        background-color: #222;
        color: white;
        font-family: monospace;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    h2
    {
        animation: anim 5s infinite;
    }
    @keyframes anim
    {
        0%
        {
            transform: scale(1);
            opacity: 1;
        }
        50%
        {
            transform: scale(1.2);
            opacity: 0.5;
        }
    }`)
    fs.mkdirSync('out')
    fs.mkdirSync('test')
    exec('npm init -y').stdout.on('end',(data)=>data)
    
}
