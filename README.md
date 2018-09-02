# UTA_MessageSkip

## ■概要 : Overview
メッセージ表示中に特定のキーを押し続ける事でスキップ処理を行う事ができるようになるプラグインです。  
Local版, Web版両方に対応しています。  
ADV等で良くあるメッセージスキップの機能です。  
選択肢を挟む場合は選択肢が表示されるタイミングでスキップが中断される安心設計です。

## ■利用方法 : Usage
ご自身のプロジェクトにUTA_MessageSkip.jsを配置し、有効化、プラグインパラメーターの設定を行って下さい。
ゲーム中でプラグインパラメーターで設定したスキップキーを押している間、メッセージがスキップされます。

## ■プラグインパラメーター : Plugin Parameters
### Skip Key
メッセージスキップキーを設定します。  
Input.keyMapperに定義された値が有効です。

Input.keyMapperに定義されたキーは以下の通りです。

| 指定値 | 対応キー |
|:---:|:---:|
| tab | tab |
| ok | enter, Z, space |
| shift | shift |
| control | control, alt |
| escape | escape, X, insert, numpad 0 |
| pageup | pageup, Q |
| pagedown | pagedown, W |
| left | left arrow, numpad 4 |
| up | up arrow, numpad 8 |
| right | right arrow, numpad 6 |
| down | down arrow, numpad 2 |
| debug | F9 |

### Show Trace
デバッグ用のトレースを出すかを設定します。

| 指定値 | 説明 |
|:---:|:---|
| true | デバッグ用トレースをコンソールに出力する。 |
| false | デバッグ用トレースをコンソールに出力しない。 |

## ■プラグインコマンド : Plugin Commands
プラグインコマンドはありません。

## ■更新履歴 : Change Log
### ver 1.00 (2016.02.17)
初版。

## ■ライセンス/利用規約 : License
本プラグインは[MIT License](LICENSE)です。  
商用/非商用問わずにご利用いただけます。

## ■連絡先 : Contact Information

|  |  |
|:---:|:---|
| Author | 赤月 智平(T.Akatsuki) |
| WebSite | https://www.utakata-no-yume.net |
| Twitter | [@T_Akatsuki](https://twitter.com/t_akatsuki) |
| GitHub | https://github.com/T-Akatsuki |
