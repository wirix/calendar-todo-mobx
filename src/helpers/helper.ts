export const getDaysInMonth = (month: number) => {
	return new Date(2023, month, 0).getDate()
}