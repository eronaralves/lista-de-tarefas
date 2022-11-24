import {Trash, CheckCircle, Circle, Pencil} from 'phosphor-react'
import { useState } from 'react'
// Styles
import styles from './Task.module.css'

interface TaskProps {
  text: string;
  onDeleteTask: () => void;
  onFinishedTask: (isChecked: boolean) => void;
  onEditTask: () => void
}

export function Task({text, onDeleteTask, onFinishedTask, onEditTask}: TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleFinishedTask() {
    setIsChecked(!isChecked)

    onFinishedTask(isChecked)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!isChecked ? 
          <Circle 
            size={24} 
            onClick={() => handleFinishedTask()}
          /> : 
          <CheckCircle 
          size={24} 
          color="#9747FF"
          onClick={() => handleFinishedTask()}
          />
        }
        
        <p>{text}</p>
        <Trash size={24} onClick={onDeleteTask}/>
        <Pencil size={24} onClick={onEditTask}/>
      </div>
    </div>
  )
}