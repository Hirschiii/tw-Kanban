---
title: ""
author: [Niklas von Hirschfeld]
date: ""
keywords: []
---

# Taskwarrior Kanban

Eine lokale Webapp (php + mySql), welche Taskwarrior als Kanban visualisiert. Dabei wird selber angegeben wleche Spalten/Tags angezeigt werden.
Wenn man eine neue Spalte hinzufügt, werden alle Aufgaben mit diesem Tag in der Spalte aufgelistet. Per drag-and-drop kann man Aufgabe verschieben.
Dabei werde automatisch die Tags angepasst.

## Einfluss:

- https://trello.com/

## Hife:

- [Drag drop](https://javascript.info/mouse-drag-and-drop)
- [Color Theme](https://www.color-hex.com/color-palette/1021125)

## Requirements

- taskwarrior
- mySql
- php server
- webserver

# Problems:

## Java call php for task update

### Lösung:

```javascript
/*************************************
JQUERY EXAMPLE
*************************************/
$('#myShutdownButton').click(){
    var jqueryXHR = $.ajax({
        'type': 'GET',
        'url': 'http://someServer.com/shutDown.php',
        'data': {'shutdownServer': 'yes'},//optional
        'dataType': 'json'
       });
    }
}
```
