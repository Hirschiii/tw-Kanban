<?php
    class Task {
        public $description = "";
        public $project = "";
        public $uuid = "";
        public $entry = "";
        public $tags = "";
    }
function parse_tasks($file){
    //Open the pending tasks
    $file_handle = fopen($file, "r");

    //Parse all lines
    while (($line = fgets($file_handle)) !== false) {
        $line = fgets($file_handle);
        $part = substr($line, 1, -2);
        $parts = explode("\"", $part);

        $task = new Task();

        for($i = 0; $i < sizeof($parts); $i += 2){
            $key = $parts[$i];
            $value = $parts[$i+1];

            $key = trim($key);
            $value = trim($value);

            switch($key){
                case "description:":
                  $task->description = $value;
                  break;
                case "project:":
                  $task->project = $value;
                  break;
                case "entry:":
                  $task->entry = $value;
                  break;
                case "uuid:":
                   $task->uuid = $value;
                   break;
                case "tags:":
                   $task->tags = $value;
                   break;
            }
        }

        $tasks[] = $task;
    }

    //Close the file
    fclose($file_handle);

    return $tasks;
}
?>


