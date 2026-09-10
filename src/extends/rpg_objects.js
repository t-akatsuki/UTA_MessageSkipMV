import { MessageSkipManager } from "@/utakata/message_skip";

/* ------------------------------------------------------------------------- */
/* Game_Interpreter extends */
/* ------------------------------------------------------------------------- */
const _Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;

/**
 * @override
 * @param {string} command プラグインコマンド識別子。
 * @param {string[]} args プラグインコマンド引数。
 */
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_prototype_pluginCommand.call(this, command, args);

    if (command === MessageSkipManager.identifier) {
        MessageSkipManager.dispatchPluginCommand(command, args);
    }
};
