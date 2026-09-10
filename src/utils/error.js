// ============================================================================
// error module - カスタムエラーモジュール
// ============================================================================

export const UTA_MessageSkipMVError = (() => {
    /**
     * エラーメッセージのprefix。
     * @private
     * @readonly
     * @type {string}
     */
    const PREFIX = "__PLUGIN_IDENTIFIER__";

    /**
     * @class UTA_MessageSkipMVError
     * @classmethod UTA_MessageSkipMV用カスタム例外クラス。
     * @param {string} message
     */
    function UTA_MessageSkipMVError(message) {
        // stack traceが利用できる環境の場合は必要なプロパティを付与
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, UTA_MessageSkipMVError);
        }

        this.name = "UTA_MessageSkipMVError";
        this.message = `[${PREFIX}] ${message}`;
    }

    // extends Error class
    UTA_MessageSkipMVError.prototype = Object.create(Error.prototype);
    UTA_MessageSkipMVError.constructor = UTA_MessageSkipMVError;

    return UTA_MessageSkipMVError;
})();
