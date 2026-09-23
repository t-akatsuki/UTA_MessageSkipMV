/* ========================================================================= */
/* __PLUGIN_IDENTIFIER__ __VERSION_WITH_V__ */
/* ========================================================================= */
/*:
 * @target MV
 * @plugindesc Plugin description
 * @author t-akatsuki
 * @url https://www.utakata-no-yume.net
 * @help # --------------------------------------------------------------------------
 * # Overview
 * # --------------------------------------------------------------------------
 * Plugin usage detail
 * TODO: English translate
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
 * 数値が大きいほど早くなる。
 * @type number
 * @default 15
 * @max 100
 * @min 1
 * @decimals 0
 */
