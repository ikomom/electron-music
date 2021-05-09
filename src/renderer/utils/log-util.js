// import {IS_DEVELOPMENT} from "@/config/environment";

const LOG_TYPE = {
  INFO: 'info',
  WARN: 'warn',
  SUCCESS: 'success',
  ERROR: 'error',
}
const LOG_HEX = {
  [LOG_TYPE.INFO]: '#00b0ff',
  [LOG_TYPE.WARN]: '#ffc400',
  [LOG_TYPE.SUCCESS]: '#00e676',
  [LOG_TYPE.ERROR]: '#ea0508',
}

const timeFormat = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() - 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function logCreator(type) {
  return (msg, ...args) => {
    const common = [`%c[${timeFormat()}][${type}]${msg}`, 'border-radius:5px;padding:3px;color: #fff;background-color: ' + LOG_HEX[type] || type]
    if (console[type]) {
      console[type](...common, ...args)
    } else {
      console.log(...common, ...args)
    }
  }
}

const log = (msg, ...args) => logCreator(LOG_TYPE.INFO)(msg, ...args)

for (let type in LOG_TYPE) {
  log[LOG_TYPE[type]] = (msg, ...args) => logCreator(LOG_TYPE[type])(msg, ...args)
}

export default log

export const printANSI = () => {
  log('',
    `
     _   _   _    _____   __   _   _____   __   _  
| | | | / /  /  _  \\ |  \\ | | /  _  \\ |  \\ | | 
| | | |/ /   | | | | |   \\| | | | | | |   \\| | 
| | | |\\ \\   | | | | | |\\   | | | | | | |\\   | 
| | | | \\ \\  | |_| | | | \\  | | |_| | | | \\  | 
|_| |_|  \\_\\ \\_____/ |_|  \\_| \\_____/ |_|  \\_| `
  )
}
