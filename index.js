/**
 * Usage
 * 
 * npm start vm [start/stop/remove/init]
 * npm start [build/run/commit/ps/image/run...] 
 * 
 */

const { exec } = require("child_process")

const [, , ...AllArgs] = process.argv
const nerdctlCommands = [
  'build',   'builder',   'commit',
  'compose', 'container', 'create',
  'events',  'exec',      'history',
  'image',   'images',    'info',
  'inspect', 'kill',      'load',
  'login',   'logout',    'logs',
  'network', 'pause',     'port',
  'ps',      'pull',      'push',
  'restart', 'rm',        'rmi',
  'run',     'save',      'start',
  'stats',   'stop',      'system',
  'tag',     'top',       'unpause',
  'update',  'volume',    'wait'
]
const limactlCommands = ["start", "stop", "remove", "init"]

if (AllArgs.length === 0) {
	console.error("Please pass argument.")
	process.exit(1)
}

const firstArg = AllArgs[0]

if (firstArg !== "vm" && nerdctlCommands.indexOf(firstArg) === -1 ) {
	console.log("Please pass correct argument.")
	process.exit(1)
}

if (AllArgs[0] === "vm") {
	const secondArg = AllArgs[1]
	if (secondArg === undefined) {
		console.log("Please pass correct argment")
		return
	}
	let limaCommand = ""
	switch (secondArg) {
		case 'start':
			console.log("vm starting...")
			console.log("結果が出てくるのに、数分かかります。")
			limaCommand = joinLimactlArray([secondArg, "mini-finch"])
			break;
		case 'stop':
			console.log("vm stopping...")
			limaCommand = joinLimactlArray([secondArg, "mini-finch"])
			break;
		case 'remove':
			console.log("vm removing...")
			limaCommand = joinLimactlArray([secondArg, "mini-finch"])
			break;
		case 'init':
			console.log("vm initing...")
			console.log("結果が出てくるのに、数分かかります。")
			limaCommand = joinLimactlArray(["start", "--name=mini-finch", "./finch.yaml", "--tty=false"])
			break;
		default:
			console.log("Please pass correct argment")
			return;
	}
	console.log(limaCommand)
	execCommand(limaCommand)
} else {
	const limaCommand = joinNerdctlArray(AllArgs)
	console.log(limaCommand)
	execCommand(limaCommand)
}

function joinNerdctlArray(array) {
	const limactlArray = ["limactl", "shell", "mini-finch", "nerdctl"]
	const limaCommand = limactlArray.concat(array)
	return limaCommand.join(" ")
}

function joinLimactlArray(array) {
	const limactlArray = ["limactl"]
	const limaCommand = limactlArray.concat(array)
	return limaCommand.join(" ")
}

function execCommand(command) {
	exec(command, (err, stdout, stderr) => {
		if (err) { 
			console.log(`error: ${stderr}`)
			return
		}
		console.log(`output: ${stdout}`)
	})
}