let isDragging = false;

var tasks = 6;

let elemDiv = document.createElement('div');
elemDiv.classList.add('card');
elemDiv.id = "placeholder";
elemDiv.style.cssText = 'position:static;background:#c2c2c2;content:" ";line-height: 1.25em;min-height:1.25em;';

document.addEventListener('mousedown', function(event) {
    let currentDroppable = null;

    let dragElement = event.target.closest('.draggable');

    if (!dragElement) return;

    let father = dragElement.parentNode;
    enterDroppable(father);
    event.preventDefault();

    dragElement.ondragstart = function() {
        return false;
    };

    let coords, shiftX, shiftY;

    startDrag(dragElement, event.clientX, event.clientY);

    function onMouseUp(event) {
        finishDrag();
    };

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);

        var e = window.event;


        var posX = e.clientX;
        var posY = e.clientY;

        $(dragElement).hide();
        let elemBelow = document.elementFromPoint(posX, posY);
        $(dragElement).show();

        // mousemove events may trigger out of the window (when the ball is dragged off-screen)
        // if clientX/clientY are out of the window, then elementFromPoint returns null
        if (!elemBelow) return;

        // potential droppables are labeled with the class "droppable" (can be other logic)
        let droppableBelow = elemBelow.closest('.droppable');

            // we're flying in or out...
                // note: both values can be null
            //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
            //   droppableBelow=null if we're not over a droppable now, during this event

        if (currentDroppable) {
            // the logic to process "flying out" of the droppable (remove highlight)
            leaveDroppable(currentDroppable);
            enterDroppable(father);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
            // the logic to process "flying in" of the droppable
            enterDroppable(currentDroppable);
        }
    }


    function enterDroppable(elem) {
        // elem.style.background = 'pink';
        $(elem).children(".column").children(".column-body").append(elemDiv);

    }

    function leaveDroppable(elem) {
        // elem.style.background = '';
        $(elem).children(".column").children(".column-body").remove("#placeholder");
    }

    // on drag start:
    //   remember the initial shift
    //   move the element position:fixed and a direct child of body
    function startDrag(element, clientX, clientY) {
        if(isDragging) {
            return;
        }


        isDragging = true;

        document.addEventListener('mousemove', onMouseMove);
        element.addEventListener('mouseup', onMouseUp);

        shiftX = clientX - element.getBoundingClientRect().left;
        shiftY = clientY - element.getBoundingClientRect().top;

      element.style.position = 'absolute';
      element.style.zIndex = 1000;
        element.classList.add('dragging');
      document.body.append(element);

        moveAt(clientX, clientY);
    };

    // switch to absolute coordinates at the end, to fix the element in the document
    function finishDrag() {
        if(!isDragging) {
            return;
        }
        var e = window.event;

        var posX = e.clientX;
        var posY = e.clientY;

        $(dragElement).hide();
        let elemBelow = document.elementFromPoint(posX, posY);
        $(dragElement).show();


        // potential droppables are labeled with the class "droppable" (can be other logic)
        let droppableBelow = elemBelow.closest('.droppable');

            // we're flying in or out...
                // note: both values can be null
            //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
            //   droppableBelow=null if we're not over a droppable now, during this event

        if (currentDroppable) {
            // the logic to process "flying out" of the droppable (remove highlight)
            $(currentDroppable).children(".column").children(".column-body").append(dragElement);
            $("#placeholder").remove();
        } else {
            father.appendChild(dragElement);
            leaveDroppable(father);
        }

        dragElement.style.position = 'static';
        dragElement.classList.remove('dragging');
        isDragging = false;

        document.removeEventListener('mousemove', onMouseMove);
        dragElement.removeEventListener('mouseup', onMouseUp);
    }

    function moveAt(clientX, clientY) {
        // new window-relative coordinates
        let newX = clientX - shiftX;
        let newY = clientY - shiftY;

        // check if the new coordinates are below the bottom window edge
        let newBottom = newY + dragElement.offsetHeight; // new bottom

        // below the window? let's scroll the page
        if (newBottom > document.documentElement.clientHeight) {
            // window-relative coordinate of document end
            let docBottom = document.documentElement.getBoundingClientRect().bottom;

            // scroll the document down by 10px has a problem
            // it can scroll beyond the end of the document
            // Math.min(how much left to the end, 10)
            let scrollY = Math.min(docBottom - newBottom, 10);

            // calculations are imprecise, there may be rounding errors that lead to scrolling up
            // that should be impossible, fix that here
            if (scrollY < 0) scrollY = 0;

            window.scrollBy(0, scrollY);

            // a swift mouse move make put the cursor beyond the document end
            // if that happens -
                // limit the new Y by the maximally possible (right at the bottom of the document)
            newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
        }

        // check if the new coordinates are above the top window edge (similar logic)
        if (newY < 0) {
            // scroll up
            let scrollY = Math.min(-newY, 10);
            if (scrollY < 0) scrollY = 0; // check precision errors

            window.scrollBy(0, -scrollY);
            // a swift mouse move can put the cursor beyond the document start
            newY = Math.max(newY, 0); // newY may not be below 0
        }


        // limit the new X within the window boundaries
        // there's no scroll here so it's simple
        if (newX < 0) newX = 0;
        if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
            newX = document.documentElement.clientWidth - dragElement.offsetWidth;
        }

        dragElement.style.left = newX + 'px';
        dragElement.style.top = newY + 'px';
    }

});

function addTask(id) {
    console.log(id);
    tasks++;
    var task = document.getElementById(id);
    let newTask = document.createElement('div');
    newTask.className = 'card draggable';
    newTask.id = 'card_' + id;
    newTask.innerHTML = "<div class='card-body'><p>Card " + tasks + "</p></div>";
    $("#" + id).children(".column-body").append(newTask);
}

 $('.add_task_btn').click(function(e){
    tasks++;
     let id = $(this).parent().parent().attr('id');
    var task = document.getElementById(id);
    let newTask = document.createElement('div');
    newTask.className = 'card draggable';
    newTask.id = 'card_' + id;
    newTask.innerHTML = "<div class='card-body'><p>Card " + tasks + "</p></div>";
     $(this).parent().parent().children(".column-body").append(newTask);
      //parent() because i think you want to change the class of the div ...
 });
