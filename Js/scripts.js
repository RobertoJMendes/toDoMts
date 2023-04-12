const todoForm = document.querySelector("#todoform")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
//const todoform = document.querySelector("#todoform")
//const todoform = document.querySelector("#todoform")

let oldInputValue // referente o valor antigo da edição

// Funções
const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)
    //Criando os botões
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
    
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)
    
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value="";
    todoInput.focus()
}
//Edição das tarefas criadas
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}
//Função da edição do titulo

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")
        
        console.log(todoTitle,text)

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}

//Eventos
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault() // faz com que o documento não seja enviado imediatamente!

    const inputValue = todoInput.value
    if(inputValue){
        saveTodo(inputValue)
    }
})
// Identificando o elemento através do click
document.addEventListener("click",(e) =>{

    const targetEL = e.target
    const parentEl = targetEL.closest("div")// com este comando selecionou o elemento pai "div" mais proximo
    let todoTitle

    if(parentEl&&parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if(targetEL.classList.contains("finish-todo")){// verificando se o elemento que esta sendo clicado contém a classe "finish-todo"
    console.log("clicou no botão com classe finish-todo")
    parentEl.classList.toggle("done")
}

    if(targetEL.classList.contains("remove-todo")){
        console.log("clicou no botão com classe remove-todo")
        parentEl.remove();
    }

    if(targetEL.classList.contains("edit-todo")){
        console.log("clicou no botão com classe edit-todo")       
        toggleForms()// Aqui começa a edição da tarefa  
        editInput.value=  todoTitle
        oldInputValue = todoTitle
    }
    // verificando botões do editar
    if(targetEL.classList.contains("botao")){
        e.preventDefault()
        console.log("clicou no botão Verificado, com classe botao!")
    }
    if(targetEL.classList.contains("cancel-edit-btn")){
        e.preventDefault()
        console.log("clicou no cancel-edit-btn!")
    }
    
})
// Botão Cancelar no campo de edição de tarefa
cancelEditBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    toggleForms()
})
editForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms()
})