import {IS_DEVELOPMENT} from "@/config/environment";

const log = (text, ...args) => {
  if (IS_DEVELOPMENT) {
    console.log(`%c${text}`, 'color: #fc4d50', ...args)
  }
}

export const printANSI = () => {
  log(
    ` _   _   _    _____   __   _   _____   __   _  
| | | | / /  /  _  \\ |  \\ | | /  _  \\ |  \\ | | 
| | | |/ /   | | | | |   \\| | | | | | |   \\| | 
| | | |\\ \\   | | | | | |\\   | | | | | | |\\   | 
| | | | \\ \\  | |_| | | | \\  | | |_| | | | \\  | 
|_| |_|  \\_\\ \\_____/ |_|  \\_| \\_____/ |_|  \\_| `
  )
}
