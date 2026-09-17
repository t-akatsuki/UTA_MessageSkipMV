import { strictParseParameter, strictParseParameters } from "@/utils/parser";
import { logger } from "@/utils/logger";

import { config } from "@/utakata/plugin_config";
import { UTA_MessageSkipMVError } from "@/utils/error";

/**
 * メッセージスキップ対象種別定義識別子。
 * @typedef {"showText" | "scrollingText" | "battleLog"} MessageSkipTargeLiteral
 */

/**
 * メッセージスキップ対象の種別定義。
 * @type {Object<string, MessageSkipTargeLiteral>}
 */
export const MessageSkipTarget = Object.freeze({
    "SHOW_TEXT": "showText",
    "SCROLLING_TEXT": "scrollingText",
    "BATTLE_LOG": "battleLog"
});

export const MessageSkipManager = (function() {
    /**
     * @class MessageSkipManager
     * @classdesc メッセージスキップ関連処理を管理するマネージャークラス。
     */
    function MessageSkipManager() {
        throw new Error("MessageSkipManager is static class");
    }

    MessageSkipManager.prototype.constructor = MessageSkipManager;

    /**
     * PluginConfigのalias。
     * @static
     * @alias
     */
    MessageSkipManager.config = config;

    /**
     * プラグインの識別子。
     * @memberof MessageSkipManager
     * @name identifier
     * @readonly
     * @type {string}
     */
    Object.defineProperty(MessageSkipManager, "identifier", {
        "get": () => { return config.identifier; },
        "configurable": true
    });

    /**
     * メッセージスキップ機能全体の有効状態。
     * @static
     * @type {boolean}
     */
    MessageSkipManager._enabled = true;

    /**
     * 対象のメッセージスキップ機能の有効状態を得る。
     * @param {MessageSkipTargeLiteral} [target] 対象種別。
     * @return {boolean} メッセージスキップ機能の有効状態
     */
    MessageSkipManager.isEnabled = function(target) {
        let ret = this._enabled;
        if (target === void 0) {
            return ret;
        }

        switch (target) {
            case MessageSkipTarget.SHOW_TEXT:
                ret = ret && this.config.parameters.settingsOfOnShowText.messageSkipEnabled;
                break;
            case MessageSkipTarget.SCROLLING_TEXT:
                ret = ret && this.config.parameters.settingsOfOnShowScrollingText.messageSkipEnabled;
                break;
            case MessageSkipTarget.BATTLE_LOG:
                ret = ret && this.config.parameters.settingsOfBattleLog.messageSkipEnabled;
                break;
            default:
                throw new UTA_MessageSkipMVError(`Invalid message skip target (${target})`);
        }
        return ret;
    };

    /**
     * デフォルトスキップ機能の無効化設定を取得する。
     * @param {MessageSkipTargeLiteral} target 対象種別。
     * @return {boolean} デフォルトスキップ無効化設定としている場合はtrue。
     */
    MessageSkipManager.isForceDisabledDefaultSkip = function(target) {
        let ret;
        switch (target) {
            case MessageSkipTarget.SHOW_TEXT:
                ret = this.config.parameters.settingsOfOnShowText.forceDisabledDefaultSkip;
                break;
            case MessageSkipTarget.SCROLLING_TEXT:
                ret = this.config.parameters.settingsOfOnShowScrollingText.forceDisabledDefaultSkip;
                break;
            case MessageSkipTarget.BATTLE_LOG:
                ret = this.config.parameters.settingsOfBattleLog.forceDisabledDefaultSkip;
                break;
            default:
                throw new UTA_MessageSkipMVError(`Invalid message skip target (${target})`);
        }
        return ret;
    };

    /**
     * ウェイト関連制御文字をメッセージスキップ対象に含めるか取得する。  
     * 当該設定が無い種別を指定した場合は例外を送出する。
     * @static
     * @param {MessageSkipTargeLiteral} target 対象種別。
     * @return {boolean} ウェイト関連制御文字をメッセージスキップ対象に含める場合true。
     */
    MessageSkipManager.isSkipPauseOperations = function(target) {
        let ret;
        switch (target) {
            case MessageSkipTarget.SHOW_TEXT:
                ret = this.config.parameters.settingsOfOnShowText.skipPauseOperationsEnabled;
                break;
            default:
                throw new UTA_MessageSkipMVError(`Invalid message skip target (${target})`);
        }
        return ret;
    };

    /**
     * スキップキーが押されているかを返す。
     * @static
     * @return {boolean} スキップキーのいずれかが押されている場合はtrue。
     */
    MessageSkipManager.isTriggeredSkipButton = function() {
        if (this.config.parameters.touchHoldSkipEnabled && TouchInput.isLongPressed()) {
            return true;
        }
        for (let keyName of config.parameters.skipAssignedKeys) {
            if (Input.isPressed(keyName)) {
                return true;
            }
        }
        return false;
    };

    /**
     * メッセージスキップの早送り速度を取得する。
     * @param {MessageSkipTargeLiteral} target 対象種別。
     * @return {number} 早送り速度の値。
     */
    MessageSkipManager.getFastForwardRate = function(target) {
        let fastForwardRate;
        switch (target) {
            case MessageSkipTarget.SCROLLING_TEXT:
                fastForwardRate = this.config.parameters.settingsOfOnShowScrollingText.fastForwardRate;
                break;
            case MessageSkipTarget.BATTLE_LOG:
                fastForwardRate = this.config.parameters.settingsOfBattleLog.fastForwardRate;
                break;
            default:
                throw new UTA_MessageSkipMVError(`Invalid message skip target (${target})`);
        }
        return fastForwardRate;
    };

    /**
     * メッセージスキップ機能の有効状態を取得し、指定した番号のスイッチに状態を格納する。
     * @param {number} switchId 結果を格納するスイッチの番号。
     */
    MessageSkipManager.getEnabled = function(switchId) {
        logger.debug(`Get message skip enabled state to switch. (switchId=${switchId}, enabled=${this._enabled})`);

        /* 範囲外の番号が渡された場合は何もしない模様 */
        $gameSwitches.setValue(switchId, this._enabled);
    };

    /**
     * メッセージスキップ機能の有効状態を設定する。  
     * 有効状態は各種別全てに影響する。
     * @static
     * @param {boolean} enabled 設定する有効状態。
     */
    MessageSkipManager.setEnabled = function(enabled) {
        logger.debug(`Set message skip enabled state to '${enabled}'`);
        this._enabled = enabled;
    };

    /**
     * プラグインコマンドを実行する。  
     * `Game_Interpreter.prototype.pluginCommand`から呼ばれる。
     * @static
     * @param {string} command プラグインコマンド識別子。
     * @param {string[]} args プラグインコマンド引数。
     */
    MessageSkipManager.dispatchPluginCommand = function(command, args) {
        const prompt = `${command} ${args.join(" ")}`;
        logger.debug(`Dispatch plugin command. '${prompt}'`);

        if (command !== this.config.identifier || args.length <= 0) {
            logger.error(`Invalid plugin command. '${prompt}'`);
            throw new UTA_MessageSkipMVError(`Invalid plugin command ('${prompt}')`);
        }

        const subcommand = strictParseParameter(args[0], "string");
        switch (subcommand) {
            /* UTA_MessageSkipMV getEnabled <switchId> */
            case "getEnabled": {
                const cleanArgs = strictParseParameters(args, ["number"]);
                this.getEnabled(...cleanArgs);
                break;
            }
            /* UTA_MessageSkipMV setEnabled <enabled> */
            case "setEnabled": {
                const cleanArgs = strictParseParameters(args, ["boolean"]);
                this.setEnabled(...cleanArgs);
                break;
            }
            default: {
                logger.error(`Invalid plugin command. '${prompt}'`);
                throw new UTA_MessageSkipMVError(`Invalid plugin command ('${prompt}')`);
            }
        }
    };

    return MessageSkipManager;
})();
