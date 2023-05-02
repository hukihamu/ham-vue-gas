declare namespace google {
  namespace script {
    interface Run {
      [name: string]: (...args: any) => void

      withFailureHandler(callback: (error: Error, object?: any) => void): Run

      withSuccessHandler(callback: (value: any, object?: any) => void): Run

      /**
       * サーバには送らず、ハンドラーに渡す値をセットする
       * @param object
       */
      withUserObject(object: any): Run
    }

    const run: Run

    interface UrlLocation {
      hash: string
      parameter: { [key: string]: any }
      parameters: { [key: string]: any[] }
    }

    namespace history {
      function push(stateObject?: any, params?: { [key: string]: any }, hash?: string): void

      function replace(stateObject?: any, params?: { [key: string]: any }, hash?: string): void

      function setChangeHandler(callback: (event: { state: any; location: UrlLocation }) => void): void
    }
    namespace host {
      function close(): void

      function setHeight(height: number): void

      function setWidth(width: number): void

      namespace editor {
        function focus(): void
      }
    }
    namespace url {
      function getLocation(callback: (location: UrlLocation) => void): void
    }
  }
}
