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

import { Component, App, SetupContext } from 'vue';
import { RouteRecordRaw } from 'vue-router';

/**
 * Gasの機能「スクリプトプロパティ」をConfigとして利用する<br>
 * gasInit実行時に必須
 */
declare class Config<C extends string, G extends string, V extends string> {
    private commonConfigKeys;
    private gasConfigKeys;
    private vueConfigKeys;
    private readonly cache;
    constructor(commonConfigKeys: NonEmptyArray<C>, gasConfigKeys: NonEmptyArray<G>, vueConfigKeys: NonEmptyArray<V>);
    /**
     * vueサイドでのみ利用可能
     */
    getVueConfig(key: Exclude<(V | C | 'debug'), ''>): string | undefined;
    /**
     * gasサイドでのみ利用可能
     */
    getGasConfig(key: Exclude<(G | C | 'debug' | 'CountUrlFetchApp'), ''>): string | undefined;
    /**
     * すべてのVueConfigを取得(gasサイドでのみ利用可能)
     */
    getAllVueConfig(): {
        [key in Exclude<(V | C), ''>]: string | undefined;
    };
}
/**
 * Vue・Gas共に利用可能なLog出力
 */
declare const consoleLog: {
    info(label: string, ...data: any[]): void;
    debug(label: string, ...data: any[]): void;
    warn(label: string, ...data: any[]): void;
    error(label: string, ...data: any[]): void;
};
/**
 * Gasで実行される関数の定義に利用<br>
 * Interfaceにextendsを行う<br>
 * 構成: {Method名: {at: 引数型, rt: 戻り値型}}
 */
type BaseGasMethodInterface = {
    [name: string]: {
        at: unknown;
        rt: unknown;
    };
};
type NonEmptyArray<T> = [T, ...T[]];

type common_BaseGasMethodInterface = BaseGasMethodInterface;
type common_Config<C extends string, G extends string, V extends string> = Config<C, G, V>;
declare const common_Config: typeof Config;
declare const common_consoleLog: typeof consoleLog;
declare namespace common {
  export {
    common_BaseGasMethodInterface as BaseGasMethodInterface,
    common_Config as Config,
    common_consoleLog as consoleLog,
  };
}

type ArgsOption$1 = {
    usePlugin?: (app: App<Element>) => App<Element>;
    mountContainer?: string;
    vueMainScript?: (context: SetupContext) => any;
    vueMainTemplate?: string;
};
/**
 * Vue側entryファイルで実行する関数<br>
 *
 * @param app Componentか、Routingを設定可能
 * @param option プラグイン追加、Vueで最初に起動するscript、マウントコンテナを設定可能
 */
declare function initVue(app: Component | RouteRecordRaw[], option?: ArgsOption$1): void;
/**
 * Vue側からGasで作成したコントローラを呼び出すクラス<br>
 * Gas側で作成したGasMethodInterfaceをgenerics宣言する
 */
declare class GasClient<C extends BaseGasMethodInterface> {
    /**
     * GasMethodの名前と引数を渡すと、Gasで処理をされ結果がPromiseで返却される<br>
     * GasMethodInterfaceを宣言すれば、コード補完で作成している名前が確認できる
     * @param name GasMethod名
     * @param args GasMethod引数
     */
    send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']): Promise<C[N]['rt']>;
}

type vue_GasClient<C extends BaseGasMethodInterface> = GasClient<C>;
declare const vue_GasClient: typeof GasClient;
declare const vue_initVue: typeof initVue;
declare namespace vue {
  export {
    vue_GasClient as GasClient,
    vue_initVue as initVue,
  };
}

/**
 * SSRepositoryのinitData、columnListの宣言に使用
 */
type InitEntity<E extends SSEntity> = Omit<E, 'row'>;
/**
 * スプレッドシートに格納するデータオブジェクトを定義
 */
type SSEntity = {
    row: number;
};
/**
 * スプレッドシートをテーブルとしてCRUD操作を行う<br>
 * 本abstract classをextendsして作成する<br>
 * extendsしたクラスをgasInit().useSpreadsheetDBに入力すると利用可能となる<br>
 * extendsしたクラスをインスタンス化して利用する
 */
declare abstract class SSRepository<E extends SSEntity> {
    private _sheet;
    private importSheet;
    private get sheet();
    private static readonly TABLE_VERSION_LABEL;
    private static readonly DELETE_LABEL;
    private static readonly ROW_FUNCTION;
    /**
     * テーブルバージョン<br>
     * 変更を行うと、旧テーブルをバックアップし、新しくテーブル生成を行う<br>
     * columnList、initData、Entity変更時にバージョンを上げる
     * @protected
     */
    protected abstract readonly tableVersion: number;
    /**
     * スプレッドシートに保存する際のカラム順を決める
     * @protected
     */
    protected abstract readonly columnOrder: (keyof InitEntity<E>)[];
    /**
     * テーブル作成(アップデート)時、初期にInsertされるデータ
     * @protected
     */
    protected readonly initData: InitEntity<E>[];
    /**
     * データ格納に利用するスプレッドシートID(d/{スプレッドシートID}/edit)
     * @protected
     */
    protected abstract readonly spreadsheetId: string;
    /**
     * テーブル名(シート名)
     * @protected
     */
    protected abstract readonly tableName: string;
    /**
     * SpreadsheetApp(OAuth スコープ回避のため)
     * @protected
     */
    protected abstract readonly spreadSheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp;
    /**
     * トランザクションタイプ(LockService参照) default: user
     */
    lockType: LockType;
    /**
     * トランザクションロック開放を待つ時間(ミリ秒)
     */
    lockWaitMSec: number;
    private checkRequiredUpdate;
    private createTable;
    private toStringList;
    private toEntity;
    private getRowRange;
    private onLock;
    /**
     * gas console上で動作させるinitTables()で利用される
     */
    initTable(): void;
    /**
     * 挿入処理
     * @param entity 挿入するデータ。rowの有無は任意(利用せず、新規rowが付与される)
     * @return 挿入したデータのrow
     */
    insert(entity: E | InitEntity<E>): number;
    /**
     * 全件取得(フィルターなどはJSで実施)
     */
    getAll(): E[];
    /**
     * １件取得
     * @param row 取得するrow(rowは自動で付与され、不定一意)
     */
    getByRow(row: number): E;
    /**
     * 更新処理(上書きなため、部分変更不可)
     * @param entity 変更するデータ(row 必須)
     */
    update(entity: E): void;
    /**
     * 削除処理
     * @param row 削除するrow(rowは自動で付与され、不定一意)
     */
    delete(row: number): void;
}
type LockType = 'user' | 'script' | 'none';
/**
 * SpreadsheetをDBとして利用する<br>
 * 作成したRepositoryを登録する
 */
declare function useSpreadsheetDB(initGlobal: (global: {
    initTables: () => void;
}, initTables: () => void) => void, ...repositoryList: {
    new (): SSRepository<any>;
}[]): void;

type DatabaseQueryParams = {
    filter?: any;
    sorts?: any[];
    page_size?: number;
};
type PageCreateParams = {
    parent: {
        page_id: string;
    } | {
        database_id: string;
    };
    properties: any;
    children?: any[] | string;
    icon?: any;
    cover?: any;
};
type PageUpdatePropertiesParams = {
    properties?: any;
    archived?: boolean;
    icon?: any;
    cover?: any;
};
declare class NotionClient {
    private readonly _urlFetchApp;
    private readonly _apiBaseUrl;
    private readonly _authToken;
    constructor(urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp, authToken: string);
    static createToken(): string;
    private createHeaders;
    private fetch;
    get blocks(): {
        append(): void;
        get(): void;
        list(): void;
        update(): void;
        delete(): void;
    };
    get pages(): {
        create: (body: PageCreateParams) => Promise<any>;
        get(): void;
        getProperty(): void;
        updateProperty: (pageId: string, body: PageUpdatePropertiesParams) => Promise<any>;
        archive(): void;
    };
    get databases(): {
        create(): void;
        query: (databaseId: string, body?: DatabaseQueryParams) => Promise<any>;
        get(): void;
        update(): void;
        updateProperty(): void;
    };
    get users(): {
        get(): void;
        list(): void;
        getBot(): void;
    };
    get comments(): {
        create(): void;
        get(): void;
    };
    get search(): {
        searchByTitle(): void;
    };
}

declare function ssCache(spreadSheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp, spreadsheetId: string, expirationInSeconds?: number): {
    get: (rowNumber: number) => any;
    set: (rowNumber: number, data: any) => void;
    clear: (rowNumber: number) => void;
};

/**
 * GasMethod実装に利用する(全メソッド必須)
 */
type GasMethodsTypeRequired<C extends BaseGasMethodInterface> = {
    [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>;
};
/**
 * GasMethod実装に利用する(任意の複数メソッド)
 */
type GasMethodsType<C extends BaseGasMethodInterface> = Partial<{
    [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>;
}>;
/**
 * GasMethod実装に利用する(1メソッドのみ)
 */
type GasMethodType<C extends BaseGasMethodInterface, K extends keyof C> = (args?: C[K]['at']) => Promise<C[K]['rt']>;
type ArgsOption = {
    htmlFileName?: string;
    editHtmlOutput?: (output: GoogleAppsScript.HTML.HtmlOutput) => GoogleAppsScript.HTML.HtmlOutput;
};
/**
 * Gas側entryファイルで実行する関数<br>
 * @param config インスタンス化したhCommon.Configを入力
 * @param option htmlファイル名を変更したり、htmlを変更する際に利用
 */
declare function initGas<C extends string, G extends string, V extends string>(config: Config<C, G, V>, option?: ArgsOption): void;
type WrapperMethod<C extends BaseGasMethodInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string | {
    e: any;
}>;
/**
 * Gasで実行される関数を登録する<br>
 * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
 * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
 * globalへ代入前に"wrapperMethod"を利用する<br>
 * GasMethodInterfaceをGenerics宣言すると、コード補完される
 */
declare function useGasMethod<C extends BaseGasMethodInterface>(gasMethod: GasMethodsTypeRequired<C>, initGlobal: (global: {
    [K in keyof C]: WrapperMethod<C, K>;
}, wrapperMethod: <K extends keyof C>(name: K) => WrapperMethod<C, K>) => void): void;
/**
 * ScriptPropertiesのCountUrlFetchAppにUrlFetchAppを何回実行したかカウントする
 * 無料アカウントなら20000回まで
 * ※fetchのみラッパー済み
 */
declare function wrapperUrlFetchApp(urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp): GoogleAppsScript.URL_Fetch.UrlFetchApp;

type gas_GasMethodType<C extends BaseGasMethodInterface, K extends keyof C> = GasMethodType<C, K>;
type gas_GasMethodsType<C extends BaseGasMethodInterface> = GasMethodsType<C>;
type gas_GasMethodsTypeRequired<C extends BaseGasMethodInterface> = GasMethodsTypeRequired<C>;
type gas_InitEntity<E extends SSEntity> = InitEntity<E>;
type gas_NotionClient = NotionClient;
declare const gas_NotionClient: typeof NotionClient;
type gas_SSEntity = SSEntity;
type gas_SSRepository<E extends SSEntity> = SSRepository<E>;
declare const gas_SSRepository: typeof SSRepository;
declare const gas_initGas: typeof initGas;
declare const gas_ssCache: typeof ssCache;
declare const gas_useGasMethod: typeof useGasMethod;
declare const gas_useSpreadsheetDB: typeof useSpreadsheetDB;
declare const gas_wrapperUrlFetchApp: typeof wrapperUrlFetchApp;
declare namespace gas {
  export {
    gas_GasMethodType as GasMethodType,
    gas_GasMethodsType as GasMethodsType,
    gas_GasMethodsTypeRequired as GasMethodsTypeRequired,
    gas_InitEntity as InitEntity,
    gas_NotionClient as NotionClient,
    gas_SSEntity as SSEntity,
    gas_SSRepository as SSRepository,
    gas_initGas as initGas,
    gas_ssCache as ssCache,
    gas_useGasMethod as useGasMethod,
    gas_useSpreadsheetDB as useSpreadsheetDB,
    gas_wrapperUrlFetchApp as wrapperUrlFetchApp,
  };
}

export { common as hCommon, gas as hGas, vue as hVue };
