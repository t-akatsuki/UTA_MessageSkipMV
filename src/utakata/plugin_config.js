// ============================================================================
// plugin_config - プラグイン設定管理モジュール
// ============================================================================
import { UTA_MessageSkipMVError } from "@/utils/error";
import { strictParseParameter } from "@/utils/parser";

/**
 * 「文章の表示」におけるメッセージスキップ設定。
 * @typedef {Object} settingsOfOnShowText
 * @property {boolean} messageSkipEnabled 「文章の表示」でのメッセージスキップの有効状態。
 * @property {boolean} forceDisabledDefaultSkip 「文章の表示」でデフォルト早送り機能を無効化するか。
 * @property {boolean} skipPauseOperationsEnabled 「文章の表示」で制御記号を用いたウェイトをスキップ対象に含めるか。
 */

/**
 * 「文章のスクロール表示」のメッセージスキップ設定。
 * @typedef {Object} settingsOfOnShowScrollingText
 * @property {boolean} messageSkipEnabled 「文章のスクロール表示」でのメッセージスキップの有効状態。
 * @property {boolean} forceDisabledDefaultSkip 「文章のスクロール表示」でフォルト早送り機能を無効化するか。
 * @property {number} fastForwardRate 「文章のスクロール表示」でのメッセージスキップ時のスクロール速度。
 */

/**
 * 戦闘ログにおけるメッセージスキップ設定。
 * @typedef {Object} settingsOfBattleLog
 * @property {boolean} messageSkipEnabled 戦闘ログでのメッセージスキップの有効状態。
 * @property {boolean} forceDisabledDefaultSkip 戦闘ログでデフォルト早送り機能を無効化するか。
 * @property {number} fastForwardRate 戦闘ログでのメッセージスキップ時の表示速度。
 */

/**
 * @typedef {Object} UTA_MessageSkipMVPluginParameters
 * @property {string[]} skipAssignedKeys メッセージスキップキー。
 * @property {boolean} touchHoldSkipEnabled タッチ長押しでメッセージスキップを有効にするか。
 * @property {settingsOfOnShowText} settingsOfOnShowText 「文章の表示」におけるメッセージスキップ設定。
 * @property {settingsOfOnShowScrollingText} settingsOfOnShowScrollingText 「文章のスクロール表示」のメッセージスキップ設定。
 * @property {settingsOfBattleLog} settingsOfBattleLog 戦闘ログにおけるメッセージスキップ設定。
 * @property {boolean} debugLogEnabled デバッグログの有効状態。
 */

/**
 * @class PluginConfig
 * @classdesc プラグインの設定を扱うクラス。
 */
const PluginConfig = (() => {
    /**
     * プラグインの識別子。
     * @private
     * @readonly
     * @type {string}
     */
    const IDENTIFIER = "__PLUGIN_IDENTIFIER__";

    /**
     * @private
     * @type {PluginConfig | null}
     */
    let __instance = null;

    /**
     * @constructor
     */
    function PluginConfig() {
        /**
         * 型安全性が保障されたプラグインパラメータ。
         * @readonly
         * @type {UTA_MessageSkipMVPluginParameters}
         */
        this.parameters = this._loadPluginParameters();
    }

    PluginConfig.prototype.constructor = PluginConfig;

    /**
     * プラグインの識別子。
     * @memberof PluginConfig
     * @name identifier
     * @readonly
     * @type {string}
     */
    Object.defineProperty(PluginConfig.prototype, "identifier", {
        "get": () => { return IDENTIFIER; },
        "configurable": true
    });

    /**
     * シングルトンオブジェクトを取得する。
     * @static
     * @return {PluginConfig} インスタンスの参照。
     */
    PluginConfig.getConfig = function() {
        if (!__instance) {
            __instance = new PluginConfig();
        }
        return __instance;
    };

    /**
     * プラグインパラメータをロードし、適切な型に変換したデータを取得する。
     * @return {UTA_MessageSkipMVPluginParameters} 適切な型に変換したプラグインパラメータ連想配列。読み取り専用。
     */
    PluginConfig.prototype._loadPluginParameters = function() {
        /**
         * @type {Object<string, any>}
         */
        const rawParameters = PluginManager.parameters(this.identifier);

        /**
         * @type {UTA_MessageSkipMVPluginParameters}
         */
        let parameters = {};

        try {
            /* 複数同じ値が設定される可能性があるのでuniqueにする */
            const _skipAssignedKeys = /** @type {string[]} */strictParseParameter(rawParameters["skipAssignedKeys"], "array");
            parameters["skipAssignedKeys"] =  Array.from(new Set(_skipAssignedKeys));
            parameters["touchHoldSkipEnabled"] = strictParseParameter(rawParameters["touchHoldSkipEnabled"], "boolean");

            const _settingsOfOnShowText = /** @type {Object<string, any>} */strictParseParameter(rawParameters["settingsOfOnShowText"], "object");
            parameters["settingsOfOnShowText"] = {
                "messageSkipEnabled": strictParseParameter(_settingsOfOnShowText["messageSkipEnabled"], "boolean"),
                "forceDisabledDefaultSkip": strictParseParameter(_settingsOfOnShowText["forceDisabledDefaultSkip"], "boolean"),
                "skipPauseOperationsEnabled": strictParseParameter(_settingsOfOnShowText["skipPauseOperationsEnabled"], "boolean")
            };

            const _settingsOfOnShowScrollingText = /** @type {Object<string, any>} */strictParseParameter(rawParameters["settingsOfOnShowScrollingText"], "object");
            parameters["settingsOfOnShowScrollingText"] = {
                "messageSkipEnabled": strictParseParameter(_settingsOfOnShowScrollingText["messageSkipEnabled"], "boolean"),
                "forceDisabledDefaultSkip": strictParseParameter(_settingsOfOnShowScrollingText["forceDisabledDefaultSkip"], "boolean"),
                "fastForwardRate": strictParseParameter(_settingsOfOnShowScrollingText["fastForwardRate"], "number")
            };

            const _settingsOfBattleLog = /** @type {Object<string, any>} */strictParseParameter(rawParameters["settingsOfBattleLog"], "object");
            parameters["settingsOfBattleLog"] = {
                "messageSkipEnabled": strictParseParameter(_settingsOfBattleLog["messageSkipEnabled"], "boolean"),
                "forceDisabledDefaultSkip": strictParseParameter(_settingsOfBattleLog["forceDisabledDefaultSkip"], "boolean"),
                "fastForwardRate": strictParseParameter(_settingsOfBattleLog["fastForwardRate"], "number")
            };

            parameters["debugLogEnabled"] = strictParseParameter(rawParameters["debugLogEnabled"], "boolean");
        } catch(e) {
            const errorName = e instanceof Error ? e.name : "Unknown error";
            const errorMessage = e instanceof Error ? e.message : "Unknown error";
            console.error(`${IDENTIFIER}: Failed to load plugin parameter. (${errorName}: ${errorMessage})`);
            throw new UTA_MessageSkipMVError(`Plugin parameter load error (${errorMessage})`);
        }

        return Object.freeze(parameters);
    };

    return PluginConfig;
})();

/**
 * singleton
 */
export const config = PluginConfig.getConfig();
