export function calculateNights(start: Date, end: Date) {
	const oneDay = 1000 * 60 * 60 * 24;
	return Math.ceil((end.getTime() - start.getTime()) / oneDay);
}
