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

        // include ("update_db.php");
        // include("functions.php")

        $questions = 0;
        // $task = parse_tasks("./pending.data");
        $handle = fopen("./kanban.conf", "r");
        $counter = 0;
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $counter++;
                $name = strtok($line, " ");
                $filter = substr(strstr($line, " "), 1);

                $exec = "task $filter export";
                $string = trim(preg_replace('/\s+/', ' ', $exec));
                $task = json_decode(shell_exec($string));
                if ($task == "") {
                    echo $exec;
                    continue;
                }

                echo "
<div class='list-wrapper droppable'>
            <div class='column' id='columne_$counter' >
                <div class='column-header'>
                    <h2 class='list-name'>$name</h2>
                </div>
                <div class='column-body'>
";

                foreach ($task as $key) {
                    if ($key->id != 0) {
                        echo "
                    <div class='card draggable' id='card_{$key->id}'>
                        <div class='card-body'>
                            <p>{$key->id}: {$key->description}</p>
                        </div>
                    </div>
                    
";
                    }
                }
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
            }

            fclose($handle);
        }
        ?>
    </div>
</body>
<script src="./kanban-idee.js"></script>

</html>
