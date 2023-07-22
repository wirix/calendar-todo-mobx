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
	yearData: IInfoTaskAboutMonth[][] | [];
}

class TodoStore implements ITodoClass {
	selectedMonth = 0
	countDaysOfMonth = 0
	yearData: IInfoTaskAboutMonth[][] | [] = []

	constructor() {
		makeAutoObservable(this)
	}

	setSelectedMonth = (newSelectedMonth: number) => {
		this.selectedMonth = newSelectedMonth
	}

	setCountDaysOfMonth = (newCountDaysOfMonth: number) => {
		this.countDaysOfMonth = newCountDaysOfMonth
	}

	setYearData = (newInfoTaskAboutMonth: IInfoTaskAboutMonth[][] | []) => {
		this.yearData = newInfoTaskAboutMonth
	}

	setYear = () => {
		const infoYear: IInfoTaskAboutMonth[][] = Array.from({ length: 12 }, () => []);
		for (let month = 0; month < 12; month++) {
			const daysInMonth = getDaysInMonth(month+1)
			for (let day = 1; day <= daysInMonth; day++) {
				infoYear[month].push({
					numberOfDay: day,
					task: {
						description: '',
						isClosed: false
					}
				})
			}
		}
		this.setYearData(infoYear)
	}

	setNewTask = (month: number, day: number, description: string) => {
		this.yearData[month][day].task = {
			description, 
			isClosed: false
		}
	}
}

export default new TodoStore()