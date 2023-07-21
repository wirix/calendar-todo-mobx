import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react';
import styles from './NewCard.module.css';
import { NewCardProps } from './NewCard.props';
import cn from 'classnames';

export const NewCard: FC<NewCardProps> = ({ className, ...props }) => {
	const [inputState, setInputState] = useState('')
	const [isDragCard, setIsDragCard] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputState(e.target.value)
	}

	const onCardMouseUp = () => {
		if (!ref.current) {
			return;
		}
		setIsDragCard(false)
	}
	
	const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
		'onDragStartHandler'
		console.log(e)
	}
	
	const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
		'onDragLeaveHandler'
		console.log(e)
	}
	
	const onDragEndHandler = (e: DragEvent<HTMLDivElement>) => {
		'onDragEndHandler'
		console.log(e)
	}
	
	const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
		'onDragOverHandler'
		console.log(e)
	}
	
	const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
		'onDropHandler'
		console.log(e)
	}

	return (
		<div className={cn(styles.card, className)} onMouseUp={onCardMouseUp}
			style={{
				cursor: isDragCard ? 'move' : 'auto'
			}}
			ref={ref}
			draggable
			onDragStart={(e) => onDragStartHandler(e)}
			onDragLeave={(e) => onDragLeaveHandler(e)}
			onDragEnd={(e) => onDragEndHandler(e)}
			onDragOver={(e) => onDragOverHandler(e)}
			onDrop={(e) => onDropHandler(e)}
		>
		 	<input onChange={onInputChange} value={inputState} />
		 	<div onClick={() => setIsDragCard(true)}>yes</div>
		 	<div onClick={() => setIsDragCard(false)}>no</div>
		</div>
	);
}