// alert("hii")
let add = document.querySelector('.add')
let inputTask = document.querySelector('.task-input input')
let taskBox = document.querySelector('.task-box')
let clearall = document.querySelector('.clear-btn')
let filters = document.querySelectorAll('.filters span')

// button disable
inputTask.addEventListener('keyup', () => {
  if (inputTask.value.length > 0) add.disabled = false
  else add.disabled = true
})

let editId
let isEditTask = false

let todos = JSON.parse(localStorage.getItem('todo-list'))

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('span.active').classList.remove('active')
    btn.classList.add('active')
    showTodo(btn.id)
  })
})

function showTodo(filter) {
  let li = ''
  if (todos) {
    todos.forEach((todo, id) => {
      let iscompleted = todo.status == 'completed' ? 'checked' : ''
      if (filter == todo.status || filter == 'all') {
        if (inputTask.value.length > 0 && inputTask.value == '') {
          add.disabled = false
        } else {
          add.disabled = true
        }
        li += `<li class="task">
                        <label for="${id}">
                            <input onclick = "updateStatus(this)"type="checkbox" id="${id}"${iscompleted}>
                            <p class="${iscompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="fas fa-ellipsis-v"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')" <i class="fas fa-edit"></i><p>Edit</p></li>
                                <li onclick="deleteTask(${id})"<i class="fas fa-trash"></i><p>Delete</p> </li>
                            </ul>
                        </div>
                    </li>`
      }
    })
  }
  taskBox.innerHTML = li || `<span>You currently have no tasks...</span>`

  let checkTask = taskBox.querySelectorAll('.task')
  !checkTask.length
    ? clearall.classList.remove('active')
    : clearall.classList.add('active')
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add('overflow')
    : taskBox.classList.remove('overflow')
}
showTodo('all')

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild
  taskMenu.classList.add('show')
  document.addEventListener('click', (e) => {
    if (e.target.tagName != 'I' || e.target != selectedTask) {
      taskMenu.classList.remove('show')
    }
  })
}

function editTask(taskId, taskName) {
  editId = taskId
  isEditTask = true
  inputTask.value = taskName
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1)
  localStorage.setItem('todo-list', JSON.stringify(todos))
  showTodo('all')
}

let clearAll = () => {
  isEditTask = false
  todos.splice(0, todos.length)
  localStorage.setItem('todo-list', JSON.stringify(todos))
  showTodo('all')
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild
  if (selectedTask.checked) {
    taskName.classList.add('checked')
    todos[selectedTask.id].status = 'completed'
  } else {
    taskName.classList.remove('checked')
    todos[selectedTask.id].status = 'pending'
  }
  localStorage.setItem('todo-list', JSON.stringify(todos))
}

let Taskinput = () => {
  let usertask = inputTask.value.trim()
  if (!isEditTask) {
    if (!todos) {
      todos = []
    }
    let taskinfo = { name: usertask, status: 'pending' }
    todos.push(taskinfo)
  } else {
    isEditTask = false
    todos[editId].name = usertask
  }

  inputTask.value = ''

  localStorage.setItem('todo-list', JSON.stringify(todos))
  showTodo('all')
}