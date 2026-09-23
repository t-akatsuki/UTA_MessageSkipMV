/* ========================================================================= */
/* __PLUGIN_IDENTIFIER__ __VERSION_WITH_V__ */
/* ========================================================================= */
/*:
 * @target MV
 * @plugindesc Allows skipping messages by holding down assigned keys.
 * @author t-akatsuki
 * @url https://www.utakata-no-yume.net
 * 
 * @param skipAssignedKeys
 * @text Message Skip Keys
 * @desc Select keys to trigger message skip.
 * Multiple keys can be assigned.
 * @type select[]
 * @default []
 * @option tab
 * @value tab
 * @option ok
 * @value ok
 * @option cancel
 * @value cancel
 * @option shift
 * @value shift
 * @option menu
 * @value menu
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
 * @text Message Skip by Touch Hold
 * @desc Enable message skip by touch hold.
 * Useful when default fast-forward is disabled.
 * @type boolean
 * @default true
 * @on Enable
 * @off Disable
 * 
 * @param settingsOfOnShowText
 * @text "Show Text" Skip Settings
 * @desc Settings for message skip during "Show Text".
 * @type struct<settingsOfOnShowTextEN>
 * @default {"messageSkipEnabled":"true","forceDisabledDefaultFastForward":"false","skipPauseOperationsEnabled":"true"}
 * 
 * @param settingsOfOnShowScrollingText
 * @text "Show Scrolling Text" Skip Settings
 * @desc Settings for message skip during "Show Scrolling Text".
 * @type struct<settingsOfOnShowScrollingTextEN>
 * @default {"messageSkipEnabled":"true","forceDisabledDefaultFastForward":"false","fastForwardRate":"15"}
 * 
 * @param settingsOfBattleLog
 * @text Battle Log Skip Settings
 * @desc Settings for message skip in Battle Log.
 * @type struct<settingsOfBattleLogEN>
 * @default {"messageSkipEnabled":"true","forceDisabledDefaultFastForward":"false","fastForwardRate":"15"}
 * 
 * @param debugLogEnabled
 * @text Enable Debug Log
 * @desc Enable or disable outputting debug logs.
 * @type boolean
 * @default false
 * @on Enable
 * @off Disable
 * 
 * @help
 * # --------------------------------------------------------------------------
 * # Overview
 * # --------------------------------------------------------------------------
 * Holding down an assigned key while text is displayed will skip through 
 * messages.
 * 
 * This provides a standard message skip feature commonly found in 
 * visual novels and adventure games.
 * 
 * Message skip can be applied to "Show Text", "Show Scrolling Text", 
 * and the "Battle Log".
 * Each feature can be enabled or disabled individually.
 * 
 * Additionally, you can disable the default RPG Maker MV fast-forward function 
 * and rely exclusively on this plugin's message skip feature.
 * 
 * For more details, please refer to the official help documentation.
 * 
 * # --------------------------------------------------------------------------
 * # Plugin Parameters
 * # --------------------------------------------------------------------------
 * # Message Skip Keys
 * Assign keys for skipping messages from standard RPG Maker MV key mappings.
 * Multiple keys can be assigned.
 * 
 * Assigning "control" is recommended, as it is a common standard in PC games.
 * 
 * The mapping between setting values and actual keys is as follows:
 * 
 * +----------+--------------------------+----------------------+
 * | Value    | Keyboard Key             | Gamepad Button       |
 * |----------|--------------------------|----------------------|
 * | tab      | Tab                      |                      |
 * | ok       | Z/Enter/Space            | A                    |
 * | cancel   |                          | B                    |
 * | shift    | Shift                    | X                    |
 * | menu     | X/Escape                 | Y                    |
 * | control  | Control/Alt              |                      |
 * | escape   | X/Escape/Insert/Numpad 0 |                      |
 * | pageup   | Q/PageUp                 | LB                   |
 * | pagedown | W/PageDown               | RB                   |
 * | left     | Left Arrow/Numpad 4      | D-Pad Left           |
 * | up       | Up Arrow/Numpad 2        | D-Pad Up             |
 * | right    | Right Arrow/Numpad 6     | D-Pad Right          |
 * | down     | Down Arrow/Numpad 8      | D-Pad Down           |
 * +----------+--------------------------+----------------------+
 * 
 * # Message Skip by Touch Hold
 * Enable or disable skipping messages by long-pressing (holding) 
 * the touch screen.
 * 
 * Enable this option if you want to use touch-hold skip even when 
 * the default RPG Maker MV fast-forward feature is disabled.
 * 
 * # "Show Text" Skip Settings
 * ## Message Skip Enabled
 * Enable or disable message skipping during "Show Text".
 * 
 * Note: Choice windows are not included in message skip targets.
 * 
 * ## Disable Default Fast-Forward
 * Disable the standard RPG Maker MV text fast-forward function 
 * during "Show Text".
 * 
 * Use this if you want to rely solely on this plugin's 
 * message skip feature.
 * 
 * ## Skip Wait Control Characters
 * Control characters can be used in "Show Text" to add pauses/waits to 
 * text display.
 * Choose whether to skip these wait control characters during message skip.
 * 
 * # "Show Scrolling Text" Skip Settings
 * ## Message Skip Enabled
 * Enable or disable message skipping during "Show Scrolling Text".
 * 
 * Note: If "No Fast Forward" is checked in the "Show Scrolling Text" event 
 * command, message skip will not be applied.
 * 
 * ## Disable Default Fast-Forward
 * Disable the standard RPG Maker MV text fast-forward function during 
 * "Show Scrolling Text".
 * 
 * Use this if you want to rely solely on this plugin's message skip feature.
 * 
 * ## Skip Speed Rate
 * Set the scrolling speed when message skip is active during 
 * "Show Scrolling Text".
 * 
 * Higher values increase the scrolling speed.
 * 
 * # Enable Debug Log
 * Set whether to enable outputting debug logs.
 * 
 * When enabled, debug logs will be output to the developer console (DevTools).
 * Use this feature when you need detailed tracking of the plugin's behavior.
 * 
 * # --------------------------------------------------------------------------
 * # Plugin Commands
 * # --------------------------------------------------------------------------
 * # UTA_MessageSkipMV getEnabled
 * Stores the current enabled/disabled state of the message skip feature 
 * into a specified switch.
 * Useful when you want to check if skipping is temporarily disabled.
 * 
 * The switch value will be ON if enabled, and OFF if disabled.
 * 
 * ## Syntax
 * UTA_MessageSkipMV getEnabled <switchId>
 * 
 * ## Arguments
 * switchId (Required)
 *   The ID of the switch to store the current state.
 * 
 * # UTA_MessageSkipMV setEnabled
 * Temporarily changes the enabled/disabled state of the message skip feature.
 * 
 * ## Syntax
 * UTA_MessageSkipMV setEnabled <enabled>
 * 
 * ## Arguments
 * enabled (Required)
 *   The enabled state to set. Either true or false.
 *   true : Enables message skip.
 *   false: Disables message skip.
 * 
 * # --------------------------------------------------------------------------
 * # Plugin Information
 * # --------------------------------------------------------------------------
 * Version    : v2.0.0
 * Date       : YYYY-MM-DD
 * License    : MIT License
 * Author     : t-akatsuki
 * Website    : https://www.utakata-no-yume.net
 * GitHub     : https://github.com/t-akatsuki
 * X          : https://x.com/T_Akatsuki
 * 
 * # --------------------------------------------------------------------------
 * # Contact & Support
 * # --------------------------------------------------------------------------
 * For bug reports and inquiries, please use the contact form on 
 * the official website:
 * 
 * https://www.utakata-no-yume.net/contact/rpgmvmz/
 * 
 * # --------------------------------------------------------------------------
 * # Changelog
 * # --------------------------------------------------------------------------
 * # v2.0.0 (2026-MM-DD)
 * - Complete overhaul. Not backward compatible with v1.0.0.
 * - Updated supported RPG Maker MV version to v1.6.2 or later.
 * - Added plugin annotation structure supported in RPG Maker MV v1.5.0+.
 * - Added support for assigning multiple message skip keys.
 * - Added option to disable default RPG Maker MV fast-forward features.
 * - Added detailed options such as individual toggle settings per feature.
 * - Added plugin commands to temporarily disable message skipping.
 * 
 * # v1.0.0 (formerly ver 1.00) (2016-02-17)
 * - Initial release.
 * - Compatible with initial release versions of RPG Maker MV.
 */
/*:ja
 * @target MV
 * @plugindesc 特定キーを押す事でメッセージをスキップできるようにします。
 * @author 赤月 智平(t-akatsuki)
 * @url https://www.utakata-no-yume.net
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
 * @option cancel
 * @value cancel
 * @option shift
 * @value shift
 * @option menu
 * @value menu
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
 * @default {"messageSkipEnabled":"true","forceDisabledDefaultFastForward":"false","skipPauseOperationsEnabled":"true"}
 * 
 * @param settingsOfOnShowScrollingText
 * @text 「文章のスクロール表示」のメッセージスキップ設定
 * @desc 「文章のスクロール表示」におけるメッセージスキップ設定。
 * @type struct<settingsOfOnShowScrollingTextJP>
 * @default {"messageSkipEnabled":"true","forceDisabledDefaultFastForward":"false","fastForwardRate":"15"}
 * 
 * @param settingsOfBattleLog
 * @text 戦闘ログのメッセージスキップ設定
 * @desc 戦闘ログにおけるメッセージスキップ設定。
 * @type struct<settingsOfBattleLogJP>
 * @default {"messageSkipEnabled":"true","forceDisabledDefaultFastForward":"false","fastForwardRate":"15"}
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
 * # --------------------------------------------------------------------------
 * # 概要
 * # --------------------------------------------------------------------------
 * メッセージ表示中に特定キーを押し続けることでメッセージスキップ処理を行います。
 * テキストアドベンチャーなどによくあるメッセージスキップ機能です。
 * 
 * メッセージスキップは「文章の表示」「文章のスクロール表示」「戦闘ログ」に
 * 対応しており、それぞれ利用するかの設定が可能です。
 * 
 * また、ツクールデフォルト機能の決定キーなどの長押しによる早送り機能を無効化し、
 * 本プラグインのメッセージスキップのみを利用する事もできます。
 * 
 * より詳しい利用方法はヘルプドキュメントを参照してください。
 * 
 * # --------------------------------------------------------------------------
 * # プラグインパラメータ
 * # --------------------------------------------------------------------------
 * # メッセージスキップキー
 * メッセージスキップに割り当てるキーをRPGツクールMV標準で扱える
 * キーの中から選択して設定します。
 * 複数のキーを割り当てることができます。
 * 
 * PCゲームで慣例的に割り当てられることが多い「control」がおすすめです。
 * 
 * 設定値と実際のキーの対応は以下の通りです。
 * 
 * +----------+---------------------------+----------------------+
 * | 設定値   | キーボード対応キー        | ゲームパッド対応キー |
 * |----------|---------------------------|----------------------|
 * | tab      | Tab                       |                      |
 * | ok       | Z/Enter/Space             | A                    |
 * | cancel   |                           | B                    |
 * | shift    | Shift                     | X                    |
 * | menu     | X/Escape                  | Y                    |
 * | control  | Control/Alt               |                      |
 * | escape   | X/Escape/Insert/Numpad 0  |                      |
 * | pageup   | Q/Pageup                  | LB                   |
 * | pagedown | W/Pagedown                | RB                   |
 * | left     | 左キー/Numpad 4           | D-Pad左キー          |
 * | up       | 上キー/Numpad 2           | D-Pad上キー          |
 * | right    | 右キー/Numpad 6           | D-Pad右キー          |
 * | down     | 下キー/Numpad 8           | D-Pad下キー          |
 * +----------+---------------------------+----------------------+
 * 
 * # タッチホールドでのメッセージスキップ
 * タッチホールド(長押し)で本プラグインのメッセージスキップを行うかを設定します。
 * 
 * RPGツクールMV標準の早送り機能を無効にした際に、タッチホールドで
 * 本プラグインのメッセージスキップを行いたい場合に有効にします。
 * 
 * # 「文章の表示」のメッセージスキップ設定
 * ## メッセージスキップの有効状態
 * 「文章の表示」にて本プラグインのメッセージスキップ機能を有効にするかを
 * 設定します。
 * 
 * なお、選択肢はメッセージスキップ対象に含まれません。
 * 
 * ## デフォルト早送り機能の無効化
 * 「文章の表示」にてRPGツクールMV標準の文章早送りの機能を無効にするかを
 * 設定します。
 * 
 * 本プラグインのメッセージスキップ機能のみを利用したい場合に利用してください。
 * 
 * ## ウェイト関連制御記号のスキップ
 * 「文章の表示」では特殊記号を用いる事で文章表示にウェイトを
 * かけることができます。
 * これらの制御記号をメッセージスキップ対象に含めるかを設定します。
 * 
 * # 「文章のスクロール表示」のメッセージスキップ設定
 * ## メッセージスキップの有効状態
 * 「文章のスクロール表示」にて本プラグインのメッセージスキップ機能を
 * 有効にするかを設定します。
 * 
 * なお、「文章のスクロール表示」の設定で「早送りなし」とした場合は
 * メッセージスキップの対象としません。
 * 
 * ## デフォルト早送り機能の無効化
 * 「文章のスクロール表示」にてRPGツクールMV標準の文章早送りの機能を
 * 無効にするかを設定します。
 * 
 * 本プラグインのメッセージスキップ機能のみを利用したい場合に利用してください。
 * 
 * ## メッセージスキップ時の速度
 * 「文章のスクロール表示」における本プラグインのメッセージスキップの
 * 早送り速度を設定します。
 * 
 * 数値が大きいほど早送りが早くなります。
 * 
 * # 戦闘ログのメッセージスキップ設定
 * ## メッセージスキップの有効状態
 * 戦闘ログにて本プラグインのメッセージスキップ機能を有効にするかを設定します。
 * アニメーションなどの演出はメッセージスキップの対象に含まれません。
 * 
 * ## デフォルト早送り機能の無効化
 * 戦闘ログにてRPGツクールMV標準の文章早送りの機能を無効にするかを設定します。
 * 
 * 本プラグインのメッセージスキップ機能のみを利用したい場合に利用してください。
 * 
 * ## メッセージスキップ時の速度
 * 戦闘ログにおける本プラグインのメッセージスキップの早送り速度を設定します。
 * 
 * 数値が大きいほど早送りが早くなります。
 * 
 * # デバッグログの有効状態
 * デバッグログを有効にするかを設定します。
 * 
 * 有効にすると開発者コンソールにデバッグログが流れるようになります。
 * 細かな動作確認が必要な場合に利用してください。
 * 
 * # --------------------------------------------------------------------------
 * # プラグインコマンド
 * # --------------------------------------------------------------------------
 * # UTA_MessageSkipMV getEnabled
 * 本プラグインのメッセージスキップ機能の有効/無効状態をスイッチに格納します。
 * 一時的な無効状態であるかを確認したい場合に利用します。
 * 
 * 格納したスイッチ値がONの時は有効、OFFの時は無効を表します。
 * 
 * ## 利用構文
 * UTA_MessageSkipMV getEnabled <switchId>
 * 
 * ## 引数
 * switchId (必須)
 *   状態を格納するスイッチ番号。
 * 
 * # UTA_MessageSkipMV setEnabled
 * 本プラグインのメッセージスキップ機能の有効/無効状態を一時的に変更します。
 * 
 * ## 利用構文
 * UTA_MessageSkipMV setEnabled <enabled>
 * 
 * ## 引数
 * enabled (必須)
 *   設定する有効状態。true, falseの何れか。
 *   true : 有効状態に設定する。
 *   false: 無効状態に設定する。
 * 
 * # --------------------------------------------------------------------------
 * # プラグインの情報
 * # --------------------------------------------------------------------------
 * バージョン : v2.0.0
 * 更新日     : YYYY-MM-DD
 * ライセンス : MIT License
 * 制作者     : 赤月 智平(t-akatsuki)
 * Webサイト  : https://www.utakata-no-yume.net
 * GitHub     : https://github.com/t-akatsuki
 * X          : https://x.com/T_Akatsuki
 * 
 * # --------------------------------------------------------------------------
 * # プラグインに関するお問い合わせ
 * # --------------------------------------------------------------------------
 * 不具合報告などは公式Webサイトのお問い合わせフォームからお願いいたします。
 * 以下URLからアクセスしてください。
 * 
 * https://www.utakata-no-yume.net/contact/rpgmvmz/
 * 
 * # --------------------------------------------------------------------------
 * # 更新履歴
 * # --------------------------------------------------------------------------
 * # v2.0.0 (2026-MM-DD)
 * - 全面刷新。v1.0.0との後方互換性無し。
 * - RPGツクールMVのサポートバージョンをv1.6.2以降に変更。
 * - RPGツクールMV v1.5.0以降に追加されたアノテーション対応。
 * - メッセージスキップキーを複数登録できるように。
 * - RPGツクールMV標準の早送り機能を無効化できるように。
 * - 各機能毎の個別有効化などの細かい設定を追加。
 * - 一時的にメッセージスキップを無効化するプラグインコマンドを追加。
 * 
 * # v1.0.0 (旧表記 ver 1.00) (2016-02-17)
 * - 初版。
 * - RPGツクールMV初期版から動作するバージョン。
 * 
 */
/*~struct~settingsOfOnShowTextEN:
 * 
 * @param messageSkipEnabled
 * @text Enable Message Skip
 * @desc Enable message skip in "Show Text".
 * @type boolean
 * @default true
 * @on Enable
 * @off Disable
 * 
 * @param forceDisabledDefaultFastForward
 * @text Disable Default Fast-Forward
 * @desc 「Disable standard fast-forward in "Show Text".
 * Enable this to use only this plugin's skip feature.
 * @type boolean
 * @default false
 * @on Disable
 * @off Do not disable
 * 
 * @param skipPauseOperationsEnabled
 * @text Skip Wait Control Characters
 * @desc 「Skip wait control characters used in "Show Text".
 * @type boolean
 * @default true
 * @on Skip
 * @off Do not skip
 */
/*~struct~settingsOfOnShowScrollingTextEN:
 * 
 * @param messageSkipEnabled
 * @text Enable Message Skip
 * @desc Enable message skip in "Show Scrolling Text".
 * @type boolean
 * @default true
 * @on Enable
 * @off Disable
 * 
 * @param forceDisabledDefaultFastForward
 * @text Disable Default Fast-Forward
 * @desc Disable standard fast-forward in "Show Scrolling Text".
 * Enable this to use only this plugin's skip feature.
 * @type boolean
 * @default false
 * @on Disable
 * @off Do not disable
 * 
 * @param fastForwardRate
 * @text Skip Speed Rate
 * @desc Scroll speed during message skip in "Show Scrolling Text".
 * Higher values are faster.
 * @type number
 * @default 15
 * @max 100
 * @min 1
 * @decimals 0
 */
/*~struct~settingsOfBattleLogEN:
 * 
 * @param messageSkipEnabled
 * @text Enable Message Skip
 * @desc Enable message skip in Battle Log.
 * @type boolean
 * @default true
 * @on Enable
 * @off Disable
 * 
 * @param forceDisabledDefaultFastForward
 * @text Disable Default Fast-Forward
 * @desc Disable standard fast-forward in Battle Log.
 * Enable this to use only this plugin's skip feature.
 * @type boolean
 * @default false
 * @on Disable
 * @off Do not disable
 * 
 * @param fastForwardRate
 * @text Skip Speed Rate
 * @desc  Message display speed during message skip in Battle Log.
 * Higher values are faster.
 * @type number
 * @default 15
 * @max 100
 * @min 1
 * @decimals 0
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
 * @param forceDisabledDefaultFastForward
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
 * @param forceDisabledDefaultFastForward
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
 * @default 15
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
 * @param forceDisabledDefaultFastForward
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
 * 数値が大きいほど早くなります。
 * @type number
 * @default 15
 * @max 100
 * @min 1
 * @decimals 0
 */
