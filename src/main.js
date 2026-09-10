import { MessageSkipManager } from "@/utakata/message_skip";
import "@/extends/rpg_objects";
import "@/extends/rpg_windows";

/** ------------------------------------------------------------------------ */
/** utakata.UTA_MessageSkipMV namespace */
/** ------------------------------------------------------------------------ */
/**
 * utakata名前空間。
 * @namespace
 */
window.utakata = window.utakata || {};

/**
 * UTA_MessageSkipMV名前空間。
 * @namespace
 */
window.utakata.UTA_MessageSkipMV = {
    /**
     * プラグインのバージョン。
     * @type {string}
     */
    "VERSION": "__VERSION__",
    "MessageSkipManager": MessageSkipManager
};

