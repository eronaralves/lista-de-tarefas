import { FormEvent, useState } from 'react'

// Components
import { Header } from './components/Header'
import { Task } from './components/Tasks'

//Styles
import styles from './App.module.css'
import './styles/global.css'
import { X } from 'phosphor-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

interface Task {
  search: string,
  id: number
}

export default function App() {
  const [tasks, setTaks] = useState<Task[]>([])
  const [tasksFinished, setTasksFinished] = useState<Task[]>([])
  const [search, setSearch] = useState('')
  const [changeTask, setChangeTask] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [isEditTask, setIsEditTask] = useState<Task>()

  function handleCreateTask(e: FormEvent) {
    e.preventDefault()

    if(search.length !== 0) {
      setTaks([...tasks, {search, id: Math.random()}])
      setSearch('') 
    }
  }

  function handleDeleteTask(id:number) {
    const deleteTask = tasks.filter(item => item.id !== id)
    const deleteTasksFinished = tasksFinished.filter(item => item.id !== id)
    
    setTasksFinished(deleteTasksFinished)
    setTaks(deleteTask)
  }

  function handleTaskFinished(ischecked: boolean, task: Task) {
    if(!ischecked) {
      return setTasksFinished([...tasksFinished, task])
    }

    const unfinishedTasks = tasksFinished.filter(item => item.id !== task.id)
    setTasksFinished(unfinishedTasks)
  }

  function handleEditTask(task: Task) {
    setIsEditTask(task)
    setChangeTask(task.search)
    setIsModal(!isModal)
  }

  function handleChangeTask(e: FormEvent) {
    e.preventDefault()

    const listTasks = [...tasks]
    let posicao_selecionada = listTasks.findIndex(item => item.id === isEditTask?.id)

    listTasks[posicao_selecionada] = {
      ...listTasks[posicao_selecionada],
      search: changeTask
    }

    setTaks(listTasks)
    setIsModal(false)
    toast.success('Tarefa alterada com sucesso')
  }

  return (
    <div className={styles.container}>
      <Header/>
      <main>
        <form onSubmit={handleCreateTask}>
          <div className={styles.boxSearch}>
            <input 
              className={styles.searchTaks} 
              type="text"
              placeholder='Adicione uma nova tarefa'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              
            />
            <button 
              type='submit' 
              className={styles.button} 
              disabled={search.length === 0}
            >Criar</button>
          </div>

          <div>
            <div className={styles.heading}>
              <span>Tarefas criadas <div>{tasks.length}</div></span>
              <span>Concluido <div>{`${tasksFinished.length} de ${tasks.length}`}</div></span>
            </div>

            <div className={styles.contentTasks}>
              {tasks.map(item => (
                <Task key={item.id} text={item.search} onDeleteTask={() => handleDeleteTask(item.id)} onFinishedTask={(ischeked) => handleTaskFinished(ischeked, item)} onEditTask={() => handleEditTask(item)}/>
              ))}
            </div>
          </div>
        </form>
      </main>
      {isModal && (
        <div className={styles.containerModal}>
          <form onSubmit={handleChangeTask} className={styles.modal}>
            <X size={24} onClick={() => setIsModal(false)}/>
            <h2>Mude o nome da seu tarefa!</h2>
            <textarea 

              defaultValue={changeTask}
              onChange={e => setChangeTask(e.target.value)}
            />

            <button type='submit' className={styles.button}>Alterar</button>
          </form>
        </div>
      )}
      <ToastContainer/>
    </div>
  )
}

