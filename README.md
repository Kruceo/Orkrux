# Orkrux

## Introduction

Orkrux as created for generate SPA's, originaly to reuse standart HTML's pages.
<br><br>
## Technologies

* Node.js
* Puppeteer
<br><br>
npm install -g kruceo/orkrux
```
<br><br>
## Getting started

Create a new folder for your project and join
```console
mkdir newProject
cd newProject
```
Start a new Orkrux template
```console
orkrux --create
```
<br><br>
## Mapping your project

In this stage, as created any structure like this:
```
myProject
├pages
│├Main
│└OtherPage
├out
└test
```
Use the "pages" folder to write your pages in diferent subfolders:
```
pages         
├Main         
│├index.html  
│├main.js     
│├main.css    
│└public      
└OtherPage    
 ├index.html  
 ├main.css    
 ├main.js     
 └public      
```
<br><br>
## Setting up your routing

In yours HTML's head, write a route tag: 
```html
<head>
    <route>other</route>
</head>
```
With this example, in build version you will reach this with "/other" in your browser.

If wou want to reach it with no path, just wirte a void tag `<route>`
<br><br>
## Build

In the root path of your project, do:
```console
orkrux --build
```

And your "out" folder will be filled with your "app.js" and "index.html", use this in GH pages, works well, see <a href="http://home.kruceo.com">Kruceo Website</a>, it's built with Orkrux.
<br><br>
## Author

Visit Kruceo website for more projects: home.kruceo.com