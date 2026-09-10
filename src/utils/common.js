// ============================================================================
// common module for MV v1.0.0 - 共通汎用処理モジュール
// ============================================================================
/**
 * 適切な型変換で利用できる型定義。
 * @typedef {Object} CastTypeMap
 * @property {number} number
 * @property {string} string
 * @property {boolean} boolean
 * @property {Record<string, any>} object
 */

/**
 * 引数のデータを適切な型のデータに変換する。
 * @template {keyof CastTypeMap} T 変換後の型の種類。
 * @param {any} target 変換前データ。
 * @param {T} expectedType 期待する型の種類。
 * @return {CastTypeMap[T]} 適切な型に変換されたデータ。
 */
export function strictCastParameter(target, expectedType) {
    const targetType = expectedType.toLowerCase();

    /** @type {any} */
    let casted = undefined;

    switch (targetType) {
        case "number": 
            casted = Number(target);
            if (Number.isNaN(casted)) {
                throw new TypeError(`Casted as NaN (target=${target}, expectedType=${expectedType})`);
            }
            break;
        case "string":
            casted = String(target);
            break;
        case "boolean":
            for (let b of [true, false]) {
                if (target === String(b)) {
                    casted = b;
                    break;
                }
            }
            break;
        case "object":
            casted = JSON.parse(target);
            break;
        default:
            throw new TypeError(`Expected type invalid (target=${target}, expectedType=${expectedType})`);
    }

    if (typeof casted !== targetType || typeof casted === "undefined") {
        throw new TypeError(`Could not cast as expected type (target=${target}, expectedType=${expectedType})`);
    }

    return casted;
}

/**
 * 引数で与えたデータを一括で適切な型のデータに変換する。
 * @template {Array<keyof CastTypeMap>} T 変換後の型の種類。
 * @param {any[]} args 変換前データの配列。
 * @param {[...T]} expectedTypes 期待する型の種類の配列。
 * @return {{ [K in keyof T]: CastTypeMap[T[K]] }} 適切な型に変換されたデータの配列。
 */
export function strictCastParameters(args, expectedTypes) {
    /** @type {any} */
    const ret = args.map((target, index) => {
        const expectedTarget = expectedTypes[index];
        const casted = strictCastParameter(target, expectedTarget);
        return casted;
    });

    return ret;
}
