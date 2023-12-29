import {consoleLog} from '@/common'

type DatabaseQueryParams = {
    // https://developers.notion.com/reference/post-database-query-filter
    filter?: any
    // https://developers.notion.com/reference/post-database-query-sort
    sorts?: any[]
    start_cursor?: string
    page_size?: number
}
type PageCreateParams = {
    parent: {page_id: string} | {database_id: string}
    properties: any
    children?: any[] | string
    icon?: any
    cover?: any
}
type PageUpdatePropertiesParams = {
    properties?: any
    archived?: boolean
    icon?: any
    cover?: any
}

export class NotionClient {
    private readonly _urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp
    private readonly _apiBaseUrl = 'https://api.notion.com/v1'
    private readonly _authToken: string
    constructor(urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp, authToken: string) {
        this._urlFetchApp = urlFetchApp
        this._authToken = authToken
    }
    static createToken(): string{
        // TODO GAS Oauth2を利用する
        return ''
    }
    private createHeaders(){
        return {
            Authorization: `Bearer ${this._authToken}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    }
    private async fetch(path: string, options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions) {
        const url = this._apiBaseUrl + path
        consoleLog.debug('request', url)
        let resp = this._urlFetchApp.fetch(url, options)
        if (resp.getResponseCode() === 429) {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve()
                },2000)
            })
            resp = this._urlFetchApp.fetch(url, options)
        }
        if (resp.getResponseCode() === 200) {
            return JSON.parse(resp.getContentText())
        }
        throw resp.getContentText()
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
            create: async (body: PageCreateParams) => {
                return this.fetch('/pages', {
                    headers: this.createHeaders(),
                    method: 'post',
                    payload: JSON.stringify(body)
                })
            },
            get(){},
            getProperty(){},
            updateProperty: async (pageId: string, body: PageUpdatePropertiesParams) => {
                return this.fetch(`/pages/${pageId}`, {
                    headers: this.createHeaders(),
                    method: 'patch',
                    payload: JSON.stringify(body)
                })
            },
            archive(){},
        }
    }

    get databases() {
        return {
            create() {
            },
            /**
             * 特定のデータベースに対してクエリを実行します。
             *
             * @param {string} databaseId - The ID of the database to query.
             * @param {DatabaseQueryParams} body - The parameters for the query.
             * @returns {Promise<any>} - The response from the query.
             */
            query: async (databaseId: string, body: DatabaseQueryParams = {}): Promise<any> => {
                return this.fetch(`/databases/${databaseId}/query`, {
                    headers: this.createHeaders(),
                    method: 'post',
                    payload: JSON.stringify(body)
                })
            },
            get() {
            },
            update() {
            },
            updateProperty() {
            },
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