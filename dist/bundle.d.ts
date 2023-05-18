type NonEmptyArray<T> = [T, ...T[]];
export declare class Config<C extends string, G extends string, V extends string> {
    private commonConfigKeys;
    private gasConfigKeys;
    private vueConfigKeys;
    constructor(commonConfigKeys: NonEmptyArray<C>, gasConfigKeys: NonEmptyArray<G>, vueConfigKeys: NonEmptyArray<V>);
    getVueConfig(key: Exclude<(V | C | 'debug'), ''>): string | undefined;
    getGasConfig(key: Exclude<(G | C | 'debug'), ''>): string | undefined;
    getAllVueConfig(): {
        [key in Exclude<(V | C), ''>]: string | undefined;
    };
    getAllGasConfig(): {
        [key in Exclude<(G | C), ''>]: string | undefined;
    };
}


export declare const consoleLog: {
    info(label: string, data: any): void;
    debug(label: string, data: any): void;
    warn(label: string, data: any): void;
    error(label: string, data: any): void;
};

/// <reference types="google-apps-script" />


export declare function initGas<C extends string, G extends string, V extends string>(config: Config<C, G, V>, htmlFileName?: string, editHtmlOutput?: (output: GoogleAppsScript.HTML.HtmlOutput) => GoogleAppsScript.HTML.HtmlOutput): InitGasOptions;
type WrapperController<C extends BaseControllerInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string>;
interface InitGasOptions {
    useController<C extends {
        [name: string]: any;
    }>(initGlobal: (global: {
        [K in keyof C]: WrapperController<C, K>;
    }, wrapperController: <C extends BaseControllerInterface, K extends keyof C>(controller: ControllerType<C>, name: K) => WrapperController<C, K>) => void): InitGasOptions;
    useSpreadsheetDB(...repositoryList: {
        new (): SSRepository<any>;
    }[]): InitGasOptions;
}


type LockType = 'user' | 'script' | 'none';
export declare abstract class SSRepository<E extends SSEntity> {
    private _sheet;
    private get sheet();
    private static readonly TABLE_VERSION_LABEL;
    private static readonly DELETE_LABEL;
    private static readonly ROW_FUNCTION;
    protected abstract readonly tableVersion: number;
    protected abstract readonly columnList: (keyof InitEntity<E>)[];
    protected readonly initData: InitEntity<E>[];
    protected abstract readonly spreadsheetId: string;
    protected abstract readonly tableName: string;
    lockType: LockType;
    lockWaitMSec: number;
    private checkVersionUpdated;
    private createTable;
    private toStringList;
    private toEntity;
    private getRowRange;
    private onLock;
    initTable(): void;
    insert(entity: E | InitEntity<E>): void;
    getAll(): E[];
    getByRow(row: number): E;
    update(entity: E): void;
    delete(row: number): void;
}







declare const _default: {
    Config: typeof Config;
    consoleLog: {
        info(label: string, data: any): void;
        debug(label: string, data: any): void;
        warn(label: string, data: any): void;
        error(label: string, data: any): void;
    };
    initGas: typeof initGas;
    SSRepository: typeof SSRepository;
    initVue: typeof initVue;
    GasClient: typeof GasClient;
};


export declare class GasClient<C extends BaseControllerInterface> {
    send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']): Promise<unknown>;
}

import { App } from 'vue';
import { RouteRecordRaw, Router } from 'vue-router';
export declare let router: Router;
export declare function initVue(routes: RouteRecordRaw[], useFunc?: (app: App<Element>) => App<Element>, mountContainer?: string): void;

type BaseControllerInterface = {
    [name: string]: {
        at: unknown
        rt: unknown
    }
}
type ControllerType<C extends BaseControllerInterface> = {
    [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>
}





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

type InitEntity<E extends SSEntity> = Omit<E, 'row'>
type SSEntity = {
    row: number
}