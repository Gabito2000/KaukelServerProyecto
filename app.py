# app.py
from flask import Flask, render_template, request, jsonify
import subprocess
import json
import ast
import textwrap

def read_processes_from_file(filename):
  with open(filename) as f:
    # read the file as a string
    data = f.read()
    # remove the leading and trailing whitespace from the code
    data = data.strip()
    # dedent the code (remove the common leading whitespace from all lines)
    data = textwrap.dedent(data)
    # reindent the code with four spaces
    data = textwrap.indent(data, "    ")
    # remove the "var processes = " part of the string
    data = data[16:]
    # convert the string to a Python object using the "ast" module
    processes = ast.literal_eval(data)
  return processes

processesPosible = read_processes_from_file('static/processes.js') 
print(processesPosible)
app = Flask(__name__)

processes = []

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/tilewindtest", methods=["GET"])
def tilewindtest():
    return render_template("tilewindtest.html")


@app.route("/start", methods=["GET"])
def start_process():
    #START PROCESS COMMAND AND ADD IT TO THE LIST
    command = request.args.get("command")
    for process in processesPosible:
        if process['command'] == command:
            print("Process started "+ command) 
            process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
            processes.append((process, command))
            return render_template("index.html", action="Se ha iniciado el proceso")
    return render_template("index.html", action="No se ha encontrado el proceso")

@app.route("/end", methods=["GET"])
def stop_process():
    #STOP PROCESS COMMAND AND REMOVE IT FROM THE LIST
    command = request.args.get("command")
    for process in processes:
        if process[1] == command:
            process[0].kill()
            processes.remove(process)
            print("Process killed " + command)
            return render_template("index.html", action="Se ha detenido el proceso")
    print("Process not found " + command)
    return render_template("index.html", action="No se ha encontrado el proceso")

@app.route("/status", methods=["GET"])
def status():
    #RETURN THE STATUS OF THE PROCESSES
    command = request.args.get("command")
    for process in processes:
        if process[1] == command:
            return jsonify({"status": "Running"})
    return jsonify({"status": "Stopped"})
    
    
if __name__ == "__main__":
  app.run()