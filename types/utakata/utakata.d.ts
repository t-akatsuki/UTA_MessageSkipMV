// =============================================================================
// utakata名前空間型定義補助ファイル
// =============================================================================
/**
 * utakata名前空間用オブジェクト型。
 */
interface UtakataNamespace {
    /**
     * 各種プラグイン単位の名前空間オブジェクト。  
     * プラグイン単位で型定義ファイルを作成し、その中で拡張定義する。
     * @namespace
     */
    [key: string]: any;
}

// Windowインターフェースを拡張
interface Window {
    /**
     * utakata名前空間。
     */
    utakata?: UtakataNamespace;
}

/**
 * utakata名前空間。  
 * Top level宣言として参照可能にするための名前空間定義。
 * @alias window.utakata
 */
declare var utakata: UtakataNamespace | undefined;
