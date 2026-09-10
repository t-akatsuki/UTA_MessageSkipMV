// ============================================================================
// logger module for MV v1.0.0 - カスタムロガーモジュール
// ============================================================================
import { UTA_MessageSkipMVError } from "./error";
import { config } from "@/utakata/plugin_config";

/**
 * ログレベルの定義。
 * @readonly
 * @type {Object<string, number>}
 */
export const LogLevel = Object.freeze({
    "DISABLED": 0,
    "DEBUG": 1,
    "INFO": 2,
    "WARN": 3,
    "ERROR": 4
});

/**
 * ログ出力関数型定義。
 * @callback LogBindFunction
 * @param {...*} args コンソール出力する任意のデータ。
 * @return {void}
 */

/**
 * console系ラッパーのLoggerオブジェクト型定義。  
 * 作成時点の設定ログレベルに応じてログ出力の有無を制御する。
 * @typedef {Object} Logger
 * @property {LogBindFunction} debug デバッグログを出力。
 * @property {LogBindFunction} info 情報ログを出力。
 * @property {LogBindFunction} warn 警告ログを出力。
 * @property {LogBindFunction} error エラーログを出力。
 */

export const LogManager = (() => {
    /**
     * @class LogManager
     * @classdesc Log関連マネージャークラス。
     */
    function LogManager() {
        throw new Error(`LogManager is static class`);
    }

    LogManager.prototype.constructor = LogManager;

    /**
     * 現在設定されているログレベル。
     * @static
     * @type {number}
     */
    LogManager._currentLogLevel = LogLevel.WARN;

    /**
     * 現在のログレベルを取得する。
     * @static
     * @return {number} 現在のログレベル値。
     */
    LogManager.getLogLevel = function() {
        return LogManager._currentLogLevel;
    };

    /**
     * Loggerオブジェクトを取得する。
     * @static
     * @param {string} [prefix] ログ出力時に付与するprefix文字列。
     * @param {number} [logLevel] 基準とするログレベル。指定しない場合は設定されたログレベルを利用。
     * @return {Logger} 指定したログレベルを考慮して作成したLoggerオブジェクト。
     */
    LogManager.getLogger = function(prefix = "", logLevel) {
        if (prefix) {
            prefix += ":";
        }
        if (logLevel === void 0) {
            logLevel = this.getLogLevel();
        }

        return {
            "debug": logLevel <= LogLevel.DEBUG ? console.log.bind(console, prefix) : () => {},
            "info": logLevel <= LogLevel.INFO ? console.info.bind(console, prefix) : () => {},
            "warn": logLevel <= LogLevel.WARN ? console.warn.bind(console, prefix) : () => {},
            "error": logLevel <= LogLevel.ERROR ? console.error.bind(console, prefix) : () => {}
        };
    };

    /**
     * ログレベルを設定する。  
     * 既に作成済みのLoggerに対しては反映されない。
     * @static
     * @param {number | keyof LogLevel} logLevel 設定するログレベル。  
     *      ログレベル値もしくはログレベル名を指定する。
     * @return {number} 設定したログレベル値。
     */
    LogManager.setLogLevel = function(logLevel) {
        let targetLogLevel;

        switch (typeof logLevel) {
            case "string":
                targetLogLevel = LogLevel[logLevel.toUpperCase()];
                break;
            case "number":
                targetLogLevel = logLevel;
                break;
            default:
                targetLogLevel = undefined;
                break;
        }

        const logLevelValues = Object.keys(LogLevel).map((k) => { return LogLevel[k]; });
        if (targetLogLevel === void 0 || !(logLevelValues.indexOf(targetLogLevel) >= 0)) {
            throw new UTA_MessageSkipMVError(`Invalid loglevel (${logLevel})`);
        }

        this._currentLogLevel = targetLogLevel;
        return this._currentLogLevel;
    };

    return LogManager;
})();

/**
 * デバッグログを有効にした場合はログレベルを調整。
 */
if (config.parameters.debugLogEnabled) {
    LogManager.setLogLevel(LogLevel.DEBUG);
}

/**
 * プラグインパラメータのログレベル設定を反映した汎用Logger。
 * @type {Logger}
 */
export const logger = LogManager.getLogger(config.identifier);
