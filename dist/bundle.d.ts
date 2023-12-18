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
    getGasConfig(key: Exclude<(G | C | 'debug'), ''>): string | undefined;
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

type gas_GasMethodType<C extends BaseGasMethodInterface, K extends keyof C> = GasMethodType<C, K>;
type gas_GasMethodsType<C extends BaseGasMethodInterface> = GasMethodsType<C>;
type gas_GasMethodsTypeRequired<C extends BaseGasMethodInterface> = GasMethodsTypeRequired<C>;
declare const gas_initGas: typeof initGas;
declare const gas_useGasMethod: typeof useGasMethod;
declare namespace gas {
  export {
    gas_GasMethodType as GasMethodType,
    gas_GasMethodsType as GasMethodsType,
    gas_GasMethodsTypeRequired as GasMethodsTypeRequired,
    gas_initGas as initGas,
    gas_useGasMethod as useGasMethod,
  };
}

export { common as hCommon, gas as hGas, vue as hVue };
