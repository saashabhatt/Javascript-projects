// Take user input to create a new bullet point

document.addEventListener("DOMContentLoaded", function() {
    let todoForm = document.querySelector('#newTodoForm');
    let ul = document.querySelector('ul');
    
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        let removeElement = document.createElement("button");
        removeElement.innerText = "Remove Task";
    
        let userEntry = document.querySelector('input').value;
        let newToDo = document.createElement('li');
        newToDo.innerText = userEntry;
        
        ul.append(newToDo);
        newToDo.append(removeElement);
        
        todoForm.reset();
    });
    
    ul.addEventListener("click", function (e) {
        const targetTag = e.target.tagName.toLowerCase();
        if (targetTag === "li") {
            e.target.style.textDecoration = "line-through";
        } else if (targetTag === 'button') {
            e.target.parentNode.remove();
        }
    });});