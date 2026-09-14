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
 * 複数設定可能。
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
 * @text タッチホールドでのメッセージスキップ
 * @desc タッチホールドでメッセージスキップするか。
 * デフォルト機能を無効にした場合に利用します。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param settingsOfOnShowText
 * @text 「文章の表示」のメッセージスキップ設定
 * @desc 「文章の表示」におけるメッセージスキップ設定。
 * @type struct<settingsOfOnShowTextJP>
 * @default TODO
 * 
 * @param settingsOfOnShowScrollingText
 * @text 「文章のスクロール表示」のメッセージスキップ設定
 * @desc 「文章のスクロール表示」におけるメッセージスキップ設定。
 * @type struct<settingsOfOnShowScrollingTextJP>
 * @default TODO
 * 
 * @param settingsOfBattleLog
 * @text 戦闘ログのメッセージスキップ設定
 * @desc 戦闘ログにおけるメッセージスキップ設定。
 * @type struct<settingsOfBattleLogJP>
 * @default TODO
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
 */
/*~struct~settingsOfOnShowTextJP:
 * 
 * @param messageSkipEnabled
 * @text メッセージスキップの有効状態
 * @desc 「文章の表示」でメッセージスキップ機能を有効にするか。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param forceDisabledDefaultSkip
 * @text デフォルト早送り機能の無効化
 * @desc 「文章の表示」でデフォルト早送り機能を無効化するか。
 * 本プラグインの機能のみを利用したい場合に無効化します。
 * @type boolean
 * @default false
 * @on 無効にする
 * @off 無効にしない
 * 
 * @param skipPauseOperationsEnabled
 * @text ウェイト関連制御記号のスキップ
 * @desc 「文章の表示」における制御記号を用いたウェイトを
 * スキップ対象に含めるか。
 * @type boolean
 * @default true
 * @on スキップする
 * @off スキップしない
 */
/*~struct~settingsOfOnShowScrollingTextJP:
 * 
 * @param messageSkipEnabled
 * @text メッセージスキップの有効状態
 * @desc 「文章のスクロール表示」でメッセージスキップ機能を
 * 有効にするか。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param forceDisabledDefaultSkip
 * @text デフォルト早送り機能の無効化
 * @desc 「文章のスクロール表示」でデフォルト早送り機能を
 * 無効化するか。
 * @type boolean
 * @default false
 * @on 無効にする
 * @off 無効にしない
 * 
 * @param fastForwardRate
 * @text メッセージスキップ時の速度
 * @desc 「文章のスクロール表示」でのメッセージスキップ時の
 * スクロール速度。数値が大きいほど早くなります。
 * @type number
 * @default 9
 * @max 100
 * @min 1
 * @decimals 0
 */
/*~struct~settingsOfBattleLogJP:
 * 
 * @param messageSkipEnabled
 * @text メッセージスキップの有効状態
 * @desc 戦闘ログでメッセージスキップ機能を有効にするか。
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * 
 * @param forceDisabledDefaultSkip
 * @text デフォルト早送り機能の無効化
 * @desc 戦闘ログでデフォルト早送り機能を無効化するか。
 * 本プラグインの機能のみを利用したい場合に無効化します。
 * @type boolean
 * @default false
 * @on 無効にする
 * @off 無効にしない
 * 
 * @param fastForwardRate
 * @text メッセージスキップ時の速度
 * @desc 戦闘ログでのメッセージスキップ時の表示速度。
 * 数値が大きいほど早くなる。
 * @type number
 * @default 9
 * @max 100
 * @min 1
 * @decimals 0
 */
