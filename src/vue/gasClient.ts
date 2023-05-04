export class GasClient <C extends BaseControllerInterface>{
    send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']){
        return new Promise((resolve, reject) => {
            const run = google.script.run
                .withSuccessHandler(it => resolve(JSON.parse(it)))
                .withFailureHandler(error => reject(error))[name as string]
            if (run) {
                run(args)
            } else {
                reject(`not found controller: ${name as string}`)
            }
        })
    }
}
