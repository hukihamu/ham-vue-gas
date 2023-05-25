const mockGasController = {}
// gasが登録したfunctionを探して使えるように
for (const key of Object.keys(window)) {
  if (window[key] && window[key].name === '' && typeof window[key] === 'function'){
    mockGasController[key] = window[key]
  }
}


window.google = {
  script: {
    history: {
      replace(_, query, path){
        // TODO ハッシュ変更後リロードしちゃってrootパスになる
        // if (location.hash !== '#'+path) {
        //   location.hash = path
        //   location.search = (new URLSearchParams(query)).toString()
        // }
        // window.history.replaceState({hash: path}, '', '')
      }
    },
    url: {
      getLocation(callback){
        callback({
          hash: location.pathname,
          parameter: {}// TODO search to object
        })
      }
    },
    run: {
      withSuccessHandler(successCallback){
        return {
          withFailureHandler(failureCallback){
            const temp = {}
            for (const key in mockGasController){
              temp[key] = (args) => {
                mockGasController[key](args)
                  .then((it => successCallback(it ?? null)))
                  .catch(it => failureCallback(it))
              }
            }
            return temp
          }
        }
      }
    }
  }
}