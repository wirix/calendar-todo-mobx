import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './app.module.css';
import { observer } from 'mobx-react-lite';
import todoStore from './stores/app-store'
import cn from 'classnames';

const App: FC = observer(() => {
  const { infoTaskAboutMonth, setMonth, selectedMonth, setNewInfoTaskAboutMonth } = todoStore

  const [inputState, setInputState] = useState('')

  useEffect(() => {
    setMonth(selectedMonth)
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

  // DragEvent<HTMLDivElement | HTMLSpanElement>
  const onDragStartHandler = (e: any) => {
    'onDragStartHandler'
    console.log(e)
  }

  const onDragLeaveHandler = (e: any, i: number) => {
    e.preventDefault()
    if (!infoTaskAboutMonth[i].task.isClosed) {
      return;
    }
    e.target.style.background = '#6d3b3b'
  }

  const onDragEndHandler = (e: any) => {
    'onDragEndHandler'
    console.log(e)
  }

  const onDragOverHandler = (e: any) => {
    e.preventDefault()
    e.target.style.background = 'gray'
  }

  const onDropHandler = (e: any, number: number) => {
    e.preventDefault()
    setNewInfoTaskAboutMonth([...infoTaskAboutMonth, {
      task: {
        description: inputState,
        isClosed: false,
      },
      numberOfDay: number
    }
    ])
    setNewInfoTaskAboutMonth([...infoTaskAboutMonth.map(task => {
      if (task.numberOfDay === number) {
        return {
          task: {
            description: inputState,
            isClosed: false,
          },
          numberOfDay: number
        }
      }
      return {...task}
    })])
  }

  return (
    <div className={styles.app}>
      <div className={cn(styles.newCard, styles.card)} draggable >
        <input onChange={onInputChange} value={inputState} />
      </div>
      <div className={styles.content}>
        {months.map((month, i) => (
          <button
            key={month}
            className={styles.itemMonth}
            onClick={() => setMonth(i + 1)}
          >
            {month}
          </button>
        ))}
        <div className={styles.cards}>
          {infoTaskAboutMonth.map((dayInfo, i) => (
            <span key={i} className={cn(styles.card, {
              [styles.gray]: dayInfo.task.isClosed
              })}
              onDragStart={(e) => onDragStartHandler(e)}
              onDragLeave={(e) => onDragLeaveHandler(e, i)}
              onDragEnd={(e) => onDragEndHandler(e)}
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
