export const TimeValidation = (str) => {
	let timeRegex = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');

	return timeRegex.test(str);
}
