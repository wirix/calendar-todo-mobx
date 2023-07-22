import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './app.module.css';
import { observer } from 'mobx-react-lite';
import todoStore from './stores/app-store'
import cn from 'classnames';

const App: FC = observer(() => {
  const { yearData, selectedMonth, setSelectedMonth, setYear, setNewTask } = todoStore

  const [inputState, setInputState] = useState('')

  useEffect(() => {
    setYear()
  }, [])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  const onDragLeaveHandler = (e: any, i: number) => {
    e.preventDefault()
    if (yearData[selectedMonth][i].task.description) {
      return;
    }
    e.target.style.background = '#6d3b3b'
  }

  const onDragOverHandler = (e: any) => {
    e.preventDefault()
    e.target.style.background = 'gray'
  }

  const onDropHandler = (e: any, number: number) => {
    e.preventDefault()
    setNewTask(selectedMonth, number, inputState)
    setInputState('')
  }

  return (
    <div className={styles.app}>
      <div className={cn(styles.newCard, styles.card)} draggable={!!inputState} >
        <input onChange={onInputChange} value={inputState} />
      </div>
      <div className={styles.content}>
        {months.map((month, i) => (
          <button
            key={month}
            className={styles.itemMonth}
            onClick={() => setSelectedMonth(i)}
          >
            {month}
          </button>
        ))}
        <div className={styles.cards}>
          {yearData[selectedMonth] && yearData[selectedMonth].map((dayInfo, i) => (
            <span key={i} className={cn(styles.card, {
              [styles.red]: !dayInfo.task.description,
              [styles.gray]: dayInfo.task.description,
            })}
              onDragLeave={(e) => onDragLeaveHandler(e, i)}
              onDragOver={(e) => onDragOverHandler(e)}
              onDrop={(e) => onDropHandler(e, i)}
            >{dayInfo.task.description} {i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  );
})

export default App;
