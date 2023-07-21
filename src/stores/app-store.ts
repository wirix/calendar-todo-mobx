import { makeAutoObservable } from "mobx"
import { getDaysInMonth } from '../helpers/helper';

interface IInfoTaskAboutMonth {
	numberOfDay: number;
	task: {
		description: string;
		isClosed: boolean;
	};
}

export interface ITodoClass {
	selectedMonth: number;
	countDaysOfMonth: number;
	infoTaskAboutMonth: IInfoTaskAboutMonth[];
}

class TodoStore implements ITodoClass {
	selectedMonth = 0
	countDaysOfMonth = 0
	infoTaskAboutMonth = [{
		numberOfDay: 0,
		task: {
			description: 'string',
			isClosed: true
		}
	}]

	constructor() {
		makeAutoObservable(this)
	}

	setSelectedMonth = (newSelectedMonth: number) => {
		this.selectedMonth = newSelectedMonth
	}

	setCountDaysOfMonth = (newCountDaysOfMonth: number) => {
		this.countDaysOfMonth = newCountDaysOfMonth
	}

	setNewInfoTaskAboutMonth = (newInfoTaskAboutMonth: IInfoTaskAboutMonth[]) => {
		this.infoTaskAboutMonth = newInfoTaskAboutMonth
	}

	setMonth = (newMonth: number) => {
		const daysInMonth = getDaysInMonth(newMonth)
		this.setCountDaysOfMonth(daysInMonth)
		let infoMonth: IInfoTaskAboutMonth[] = []
		for (let i = 0; i < daysInMonth; i++) {
			infoMonth = [...infoMonth, {
				numberOfDay: i,
				task: {
					description: '',
					isClosed: false
				}
			}]
		}
		this.setNewInfoTaskAboutMonth(infoMonth)
	}
}

export default new TodoStore()