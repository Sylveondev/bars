const leeks = require("leeks.js")
exports.log=async(text)=>{
	const color = leeks.colors.blue;
	console.log(color('[INFO]')+` ${text}`)
}
exports.success=async(text)=>{
	const color = leeks.colors.green;
	console.log(color('[DONE]')+` ${text}`)
}
exports.warn=async(text)=>{
	const color = leeks.colors.yellow;
	console.log(color('[WARN]')+` ${text}`)
}
exports.error=async(text)=>{
	const color = leeks.colors.red;
	console.log(color('[ERROR]')+` ${text}`)
}