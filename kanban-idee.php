<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kanban</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="My Page Description">
        <link rel="stylesheet" href="./kanban-idee.css">
    </head>
    <body>
        <div id="board">
<?php 

include ("update_db.php");

$questions = 0;

foreach (range(1, 3) as $number) {
echo "
<div class='list-wrapper droppable'>
            <div class='column' id='columne_$number' >
                <div class='column-header'>
                    <h2 class='list-name'>Column $number</h2>
                </div>
                <div class='column-body'>
";
foreach (range(1, 2) as $number2) {
$questions++;
echo "
                    <div class='card draggable' id='card_$questions'>
                        <div class='card-body'>
                            <p>Card $questions</p>
                        </div>
                    </div>
                    
";
};

echo "
                </div>
                <div class='column_add_task'>
                    <div class='card add_task_btn'>
                        <p>Add Task</p>
                    </div>
                </div>
            </div>
</div>
";
};
?>
            </div>
    </body>
    <script src="./kanban-idee.js"></script>
</html>
