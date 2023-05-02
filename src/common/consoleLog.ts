
export const consoleLog = {
    info(label: string, data: any){
        console.info(label, data)
    },
    debug(label: string, data: any){
        console.log(label, data)
    },
    warn(label: string, data: any){
        console.warn(label, data)
    },
    error(label: string, data: any){
        console.error(label, data)
    },
}