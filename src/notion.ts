

export class NotionClient {
    private readonly _urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp
    private readonly _apiBaseUrl = 'https://api.notion.com/v1'
    private readonly _authToken?: string
    constructor(urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp, authToken: string) {
        this._urlFetchApp = urlFetchApp
        this._authToken = authToken
    }
    static createToken(): string{
        // TODO GAS Oauth2を利用する
        return ''
    }

    get blocks() {
        return {
            append(){},
            get(){},
            list(){},
            update(){},
            delete(){},}
    }

    get pages() {
        return {
            create(){},
            get(){},
            getProperty(){},
            updateProperty(){},
            archive(){},
        }
    }

    get databases() {
        return {
            create(){},
            query(){},
            get(){},
            update(){},
            updateProperty(){},
        }
    }

    get users() {
        return {
            get(){},
            list(){},
            getBot(){},
        }
    }

    get comments() {
        return {
            create(){},
            get(){},
        }
    }
    get search() {
        return {
            searchByTitle(){},
        }
    }
}
