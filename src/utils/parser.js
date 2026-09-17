// ============================================================================
// parser module for MV v1.0.0 - 解析モジュール
// ============================================================================
/**
 * 適切な型変換で利用できる型定義。
 * @typedef {Object} ParseTypeMap
 * @property {number} number
 * @property {string} string
 * @property {boolean} boolean
 * @property {any[]} array
 * @property {Record<string, any>} object
 */

/**
 * 引数のデータを適切な型のデータに変換する。
 * @template {keyof ParseTypeMap} T 変換後の型の種類。
 * @param {any} target 変換前データ。
 * @param {T} targetType 期待する型の種類。
 * @return {ParseTypeMap[T]} 適切な型に変換されたデータ。
 */
export function strictParseParameter(target, targetType) {
    const targetTypeLower = targetType.toLowerCase();

    /** @type {any} */
    let parsed = undefined;
    let expectedType = targetTypeLower;

    switch (targetTypeLower) {
        case "number": 
            parsed = Number(target);
            if (Number.isNaN(parsed)) {
                throw new TypeError(`Parsed as NaN (target=${target}, targetType=${targetType})`);
            }
            break;
        case "string":
            parsed = String(target);
            break;
        case "boolean":
            for (let b of [true, false]) {
                if (target === String(b)) {
                    parsed = b;
                    break;
                }
            }
            break;
        case "array":
            expectedType = "object";
            parsed = JSON.parse(target);
            break;
        case "object":
            parsed = JSON.parse(target);
            break;
        default:
            throw new TypeError(`Expected type invalid (target=${target}, targetType=${targetType})`);
    }

    if (typeof parsed !== expectedType || typeof parsed === "undefined") {
        throw new TypeError(`Could not parse as expected type (target=${target}, targetType=${targetType})`);
    }

    return parsed;
}

/**
 * 引数で与えたデータを一括で適切な型のデータに変換する。
 * @template {Array<keyof ParseTypeMap>} T 変換後の型の種類。
 * @param {any[]} args 変換前データの配列。
 * @param {[...T]} expectedTypes 期待する型の種類の配列。
 * @return {{ [K in keyof T]: ParseTypeMap[T[K]] }} 適切な型に変換されたデータの配列。
 */
export function strictParseParameters(args, expectedTypes) {
    /** @type {any} */
    const ret = args.map((target, index) => {
        const expectedTarget = expectedTypes[index];
        const parsed = strictParseParameter(target, expectedTarget);
        return parsed;
    });

    return ret;
}
