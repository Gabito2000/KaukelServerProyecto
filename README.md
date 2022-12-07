# KaukelServerProyecto

## How to set up
execute the next line of commands
```cmd
pip install flask

npm install

npx tailwindcss -i ./static/src/input.css -o ./static/dist/css/output.css --watch
```
## How to run
execute
```
python app.py
```
## How to add or remove commands to the list
go to the file static/processes.js
there you should find a file like this

```js
processes = [{
    "name": "Kmu",

    "img": "static/Kmu.jpg",
    
    "command": "console command to start process 1"
  
  },
  
  {
  
    "name": "Varso",
  
    "img": "static/Varso.jpg",
    
     "command": "console command to start process 2"},
   ]
```

You can add or remove elements of the array as you see fit.
The elements of the array describe the cards, its images, names and command executed when started.
