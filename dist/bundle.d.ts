export declare namespace hCommon {
    /**
     * Gasの機能「スクリプトプロパティ」をConfigとして利用する<br>
     * gasInit実行時に必須
     */
    class Config<C extends string, G extends string, V extends string> {
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
    const consoleLog: {
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
}
type NonEmptyArray<T> = [T, ...T[]];


/// <reference types="google-apps-script" />

export declare namespace hGas {
    /**
     * GasMethod実装に利用する(全メソッド必須)
     */
    export type GasMethodsTypeRequired<C extends hCommon.BaseGasMethodInterface> = {
        [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>;
    };
    /**
     * GasMethod実装に利用する(任意の複数メソッド)
     */
    export type GasMethodsType<C extends hCommon.BaseGasMethodInterface> = Partial<{
        [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>;
    }>;
    /**
     * GasMethod実装に利用する(1メソッドのみ)
     */
    export type GasMethodType<C extends hCommon.BaseGasMethodInterface, K extends keyof C> = (args?: C[K]['at']) => Promise<C[K]['rt']>;
    /**
     * SSRepositoryのinitData、columnListの宣言に使用
     */
    export type InitEntity<E extends SSEntity> = Omit<E, 'row'>;
    /**
     * スプレッドシートに格納するデータオブジェクトを定義
     */
    export type SSEntity = {
        row: number;
    };
    type ArgsOption = {
        htmlFileName?: string;
        editHtmlOutput?: (output: GoogleAppsScript.HTML.HtmlOutput) => GoogleAppsScript.HTML.HtmlOutput;
    };
    /**
     * Gas側entryファイルで実行する関数<br>
     * @param config インスタンス化したhCommon.Configを入力
     * @param option htmlファイル名を変更したり、htmlを変更する際に利用
     */
    export function initGas<C extends string, G extends string, V extends string>(config: hCommon.Config<C, G, V>, option?: ArgsOption): InitGasOptions;
    /**
     * スプレッドシートをテーブルとしてCRUD操作を行う<br>
     * 本abstract classをextendsして作成する<br>
     * extendsしたクラスをgasInit().useSpreadsheetDBに入力すると利用可能となる<br>
     * extendsしたクラスをインスタンス化して利用する
     */
    export abstract class SSRepository<E extends SSEntity> {
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
    
}
type LockType = 'user' | 'script' | 'none';
type WrapperMethod<C extends hCommon.BaseGasMethodInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string>;
interface InitGasOptions {
    /**
     * Gasで実行される関数を登録する<br>
     * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
     * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
     * globalへ代入前に"wrapperMethod"を利用する<br>
     * GasMethodInterfaceをGenerics宣言すると、コード補完される
     */
    useGasMethod<C extends {
        [name: string]: any;
    }>(gasMethod: hGas.GasMethodsTypeRequired<C>, initGlobal: (global: {
        [K in keyof C]: WrapperMethod<C, K>;
    }, wrapperMethod: <K extends keyof C>(name: K) => WrapperMethod<C, K>) => void): InitGasOptions;
    /**
     * SpreadsheetをDBとして利用する<br>
     * 作成したRepositoryを登録する
     */
    useSpreadsheetDB(...repositoryList: {
        new (): hGas.SSRepository<any>;
    }[]): InitGasOptions;
}






import { App, Component, SetupContext } from 'vue';
import { RouteRecordRaw } from 'vue-router';

type ArgsOption = {
    usePlugin?: (app: App<Element>) => App<Element>;
    mountContainer?: string;
    vueMainScript?: (context: SetupContext) => any;
    vueMainTemplate?: string;
};
export declare namespace hVue {
    /**
     * Vue側entryファイルで実行する関数<br>
     *
     * @param app Componentか、Routingを設定可能
     * @param option プラグイン追加、Vueで最初に起動するscript、マウントコンテナを設定可能
     */
    function initVue(app: Component | RouteRecordRaw[], option?: ArgsOption): void;
    /**
     * Vue側からGasで作成したコントローラを呼び出すクラス<br>
     * Gas側で作成したGasMethodInterfaceをgenerics宣言する
     */
    class GasClient<C extends hCommon.BaseGasMethodInterface> {
        /**
         * GasMethodの名前と引数を渡すと、Gasで処理をされ結果がPromiseで返却される<br>
         * GasMethodInterfaceを宣言すれば、コード補完で作成している名前が確認できる
         * @param name GasMethod名
         * @param args GasMethod引数
         */
        send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']): Promise<C[N]['rt']>;
    }
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
