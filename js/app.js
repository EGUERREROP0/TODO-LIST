const formulario = document.querySelector('#formulario')
const ulList = document.querySelector('.list-group')

let tasks = []

//Event listeners
startApp()
function startApp() {
    formulario.addEventListener('submit', validateForm)

    //When the screen is list
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('taskLocalStorage')) || [];

        showTaskHtml()
    })
}

function validateForm(e) {
    e.preventDefault()
    const task = document.querySelector('#task').value

    if (task.trim() == '') {
        showNotification('error', 'No puede registrar una tarea sin contenido', 'Error')
        return
    }

    //Adding taskObject ID
    const taskObj = {
        id: Date.now(),
        task: task
    }

    //Adding taskObj to Array
    tasks = [...tasks, taskObj]

    showTaskHtml()
    showNotification('success', 'Tarea agregada', 'Agregado')

    formulario.reset()
}

function showTaskHtml() {
    //Clean HTML before append the tasks
    cleanHtml(ulList)
    if (tasks.length <= 0) {
        const p = document.createElement('P')
        p.classList.add('text-center')
        p.textContent = 'No hay tienes tareas agregadas empieza por crear una.'
        ulList.appendChild(p)
    }
    if (tasks.length > 0) {
        tasks.forEach(task => {
            const li = document.createElement('LI')
            li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between')

            const spanContainer = document.createElement('SPAN')
            spanContainer.classList.add('d-flex', 'align-items-center')

            const checbox = document.createElement('INPUT')
            checbox.classList.add('me-2')
            checbox.type = 'checkbox'
            //If checkBox is checked
            checbox.onchange = () => {
                (checbox.checked)
                    ? spanMessage.classList.add('chb-checked')
                    : spanMessage.classList.remove('chb-checked')

            }

            const spanMessage = document.createElement('SPAN')
            spanMessage.textContent = task.task

            const spanContentIcon = document.createElement('SPAN')
            spanContentIcon.innerHTML = '<i class="bi bi-trash3-fill"></i>'
            spanContentIcon.onclick = () => deleteTask(task.id)

            //Adding to HTML
            spanContainer.appendChild(checbox)
            spanContainer.appendChild(spanMessage)

            li.appendChild(spanContainer)
            li.appendChild(spanContentIcon)

            ulList.appendChild(li)
        });
    }

    synchronizeLocalStorage()
}

//Loap data to localaStorage
function synchronizeLocalStorage() {
    localStorage.setItem('taskLocalStorage', JSON.stringify(tasks))
}

//Delete one task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id)
    showNotification('warning', 'Tarea eliminada correctamente', 'Eliminado!')
    showTaskHtml()
}


//Show Notification error
function showNotification(type, title, message) {
    toastr[type](title, message, {
        "progressBar": true,
        "closeButton": true,
        "newestOnTop": true,
    })
}

//Clean container tasks
function cleanHtml(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
}



