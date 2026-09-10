// ============================================================================
// plugin_config - プラグイン設定管理モジュール
// ============================================================================
import { UTA_MessageSkipMVError } from "@/utils/error";
import { strictCastParameter } from "@/utils/common";

/**
 * @typedef {Object} skipTargetMessageType
 * @property {boolean} enabledOnShowText 「文章の表示」でメッセージスキップ機能を有効にするか。
 * @property {boolean} enabledOnShowScrollingText 「文章のスクロール表示」でメッセージスキップ機能を有効にするか。
 * @property {boolean} enabledOnBattleLogText 戦闘中の戦闘ログでメッセージスキップ機能を有効にするか。
 */

/**
 * @typedef {Object} UTA_MessageSkipMVPluginParameters
 * @property {string[]} skipAssignedKeys メッセージスキップキー。
 * @property {boolean} touchHoldSkipEnabled タッチ長押しでメッセージスキップを有効にするか。
 * @property {boolean} forceDisabledBasicSkip デフォルトスキップ機能を無効にするか。
 * @property {boolean} isSkipPauseOperations ウェイト関連制御記号をスキップするか。
 * @property {skipTargetMessageType} messageSkipTargets メッセージスキップ機能の有効状態個別設定。
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
     * @return {UTA_MessageSkipMVPluginParameters}
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
            parameters["skipAssignedKeys"] = /** @type {string[]} */ (strictCastParameter(rawParameters["skipAssignedKeys"], "object"));
            parameters["touchHoldSkipEnabled"] = strictCastParameter(rawParameters["touchHoldSkipEnabled"], "boolean");
            parameters["forceDisabledBasicSkip"] = strictCastParameter(rawParameters["forceDisabledBasicSkip"], "boolean");
            parameters["isSkipPauseOperations"] = strictCastParameter(rawParameters["isSkipPauseOperations"], "boolean");

            const _messageSkipTargets = /** @type {Object<string, string>} */strictCastParameter(rawParameters["messageSkipTargets"], "object");
            parameters["messageSkipTargets"] = {
                "enabledOnShowText": strictCastParameter(_messageSkipTargets["enabledOnShowText"], "boolean"),
                "enabledOnShowScrollingText": strictCastParameter(_messageSkipTargets["enabledOnShowScrollingText"], "boolean"),
                "enabledOnBattleLogText": strictCastParameter(_messageSkipTargets["enabledOnBattleLogText"], "boolean")
            };

            parameters["debugLogEnabled"] = strictCastParameter(rawParameters["debugLogEnabled"], "boolean");
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
