/* ========================================================================= */
/* __PLUGIN_IDENTIFIER__ __VERSION_WITH_V__ */
/* ========================================================================= */
/*:
 * @target MV
 * @plugindesc Plugin description
 * @author t-akatsuki
 * @url Plugin distribution url
 * @help
 * Plugin usage detail
 * 
 */
/*:ja
 * @target MV
 * @plugindesc 特定キーを押す事でメッセージをスキップできるようにします。
 * @author 赤月 智平(t-akatsuki)
 * 
 * @param skipAssignedKeys
 * @text メッセージスキップキー
 * @desc メッセージスキップに紐づけるキーを設定します。
 * 複数設定可能です。
 * @type select[]
 * @default []
 * @option tab
 * @value tab
 * @option ok
 * @value ok
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option escape
 * @value escape
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 * @option left
 * @value left
 * @option up
 * @value up
 * @option right
 * @value right
 * @option down
 * @value down
 * 
 * @param touchHoldSkipEnabled
 * @text タッチ長押しでのメッセージスキップ有効化
 * @desc タッチ長押しでメッセージスキップを有効にするか。
 * デフォルト機能を無効にした場合に利用します。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param forceDisabledBasicSkip
 * @text デフォルトスキップ機能の無効化
 * @desc 決定キーなど長押しで早送りできるデフォルト機能を無効にするか。
 * 自分で決めたキーのみを利用したい場合は無効化してください。
 * @type boolean
 * @default false
 * @on 無効にする
 * @off 無効にしない
 * 
 * @param isSkipPauseOperations
 * @text ウェイト関連制御記号のスキップ
 * @desc ウェイト関連の制御記号をメッセージスキップ対象にするか。
 * @type boolean
 * @default true
 * @on スキップする
 * @off スキップしない
 * 
 * @param messageSkipTargets
 * @text メッセージスキップ機能の有効状態個別設定
 * @desc 各機能単位でメッセージスキップ機能を利用するかを設定します。
 * @type struct<skipTargetMessageTypeJP>
 * @default {"enabledOnShowText":"true","enabledOnShowScrollingText":"true","enabledOnBattleLogText":"true"}
 * 
 * @param debugLogEnabled
 * @text デバッグログの有効状態
 * @desc デバッグログの有効状態を設定します。
 * @type boolean
 * @default false
 * @on 有効にする
 * @off 無効にする
 * 
 * @help
 * TODO: プラグインの詳細な説明文
 * 
 * # 概要
 * 
 * 
 * # プラグインパラメータ
 * 
 * 
 * # プラグインコマンド
 * 
 * 
 * # ライセンス
 * 
 * 
 * # 更新履歴
 *   v2.0.0 (YYYY-MM-DD)
 *     全面刷新。v1.0.0との後方互換性無し。
 *     RPGツクールMV v1.5.0以降に追加されたアノテーション対応。
 *     メッセージスキップキーを複数登録できるように。
 *     デフォルトのスキップ機能を無効化できるように。
 *     各機能毎の個別有効化などの細かい設定を追加。
 *     一時的にメッセージスキップを無効化するプラグインコマンドを追加。
 * 
 *   v1.0.0 (旧表記 ver 1.00) (2016-02-17)
 *     初版。
 * 
 * # リンク・連絡先
 *   WebSite: https://www.utakata-no-yume.net
 *   GitHub : https://github.com/t-akatsuki
 *   X      : @T_Akatsuki
 */
/*~struct~skipTargetMessageTypeJP:
 * 
 * @param enabledOnShowText
 * @text 「文章の表示」での有効状態
 * @desc 「文章の表示」でメッセージスキップ機能を有効にするか。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param enabledOnShowScrollingText
 * @text 「文章のスクロール表示」での有効状態
 * @desc 「文章のスクロール表示」でメッセージスキップ機能を有効にするか。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param enabledOnBattleLogText
 * @text 戦闘ログでの有効状態
 * @desc 戦闘中の戦闘ログでメッセージスキップ機能を有効にするか。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 */
