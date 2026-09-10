import { strictCastParameter, strictCastParameters } from "@/utils/common";
import { logger } from "@/utils/logger";

import { config } from "@/utakata/plugin_config";
import { UTA_MessageSkipMVError } from "@/utils/error";

/**
 * メッセージスキップ状態値の定義。
 * @readonly
 * @type {Object<string, number>}
 */
const MessageSkipState = Object.freeze({
    "DISABLED": 0,
    "READY": 1,
    "SKIPPING": 2
});

export const MessageSkipManager = (function() {
    /**
     * @class MessageSkipManager
     * @classdesc メッセージスキップ関連処理を管理するマネージャークラス。
     */
    function MessageSkipManager() {
        throw new Error("MessageSkipManager is static class");
    }

    /**
     * PluginConfigの参照。
     * @static
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
     * メッセージスキップの有効状態。
     * @static
     * @type {boolean}
     */
    MessageSkipManager._enabled = true;

    /**
     * デフォルトスキップ機能の無効化の有効状態を取得する。
     * @static
     * @return {boolean} デフォルトスキップ機能の無効化が有効の場合true。
     */
    MessageSkipManager.isForceDisabledBasicSkip = function() {
        return this.config.parameters.forceDisabledBasicSkip;
    };

    /**
     * ウェイト関連制御文字をメッセージスキップ対象に含めるか取得する。
     * @static
     * @return {boolean} ウェイト関連制御文字をメッセージスキップ対象に含める場合true。
     */
    MessageSkipManager.isSkipPauseOperations = function() {
        return this.config.parameters.isSkipPauseOperations;
    };

    MessageSkipManager.isEnabledOnShowText = function() {
        return this.isEnabled() && this.config.parameters.messageSkipTargets.enabledOnShowText;
    };

    MessageSkipManager.isEnabledOnShowScrollingText = function() {
        return this.isEnabled() && this.config.parameters.messageSkipTargets.enabledOnShowScrollingText;
    };

    MessageSkipManager.isEnabledOnBattleLogText = function() {
        return this.isEnabled() && this.config.parameters.messageSkipTargets.enabledOnBattleLogText;
    };

    /**
     * メッセージスキップの有効状態を取得する。
     * @static
     * @return {boolean} メッセージスキップの有効状態。
     */
    MessageSkipManager.isEnabled = function() {
        return this._enabled;
    };

    /**
     * メッセージスキップの有効状態を設定する。
     * @static
     * @param {boolean} enabled 設定する有効状態。
     */
    MessageSkipManager.setEnabled = function(enabled) {
        logger.debug(`Set message skip state to '${enabled}'`);

        if (enabled !== this._enabled) {
            this._state = enabled ? MessageSkipState.READY : MessageSkipState.DISABLED;
        }

        this._enabled = enabled;
    };

    /**
     * スキップキーが押されているかを返す。
     * @static
     * @return {boolean} スキップキーのいずれかが押されている場合はtrue。
     */
    MessageSkipManager.isTriggeredSkipButton = function() {
        if (this.config.parameters.touchHoldSkipEnabled && TouchInput.isRepeated()) {
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
     * プラグインコマンドを実行する。  
     * Game_Interpreter.prototype.pluginCommand から呼ばれる。
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

        const subcommand = strictCastParameter(args[0], "string");
        switch (subcommand) {
            case "setEnabled": {
                const cleanArgs = strictCastParameters(args, ["boolean"]);
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
