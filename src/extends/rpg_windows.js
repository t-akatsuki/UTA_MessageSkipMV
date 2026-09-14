import { MessageSkipManager, MessageSkipTarget } from "@/utakata/message_skip";

/* ------------------------------------------------------------------------- */
/*  Window_Message extends */
/* ------------------------------------------------------------------------- */
// OK: pauseSkipはオプションにした方がよい
// --: 推された時を拡張するのが正しい
//    -> これをつぶすとメッセージが送れなくなって詰む
// OK: 元の処理を無視する事はできるが、タッチでの処理も消えちゃうのでオプションであった方が良い
// terminateMessageでメッセージウィンドウが閉じる時にアップデートした方が良い
// updateShowFastで早くするフラグを立てているここでメッセージスキップしているかが分かる
// update/updateMessageがupdate実体
const _Window_Message_prototype_updateShowFast = Window_Message.prototype.updateShowFast;

/**
 * @override
 */
Window_Message.prototype.updateShowFast = function() {
    _Window_Message_prototype_updateShowFast.call(this);

    if (!MessageSkipManager.isEnabled(MessageSkipTarget.SHOW_TEXT)) {
        return;
    }

    /* デフォルト機能を無効に設定した場合、メッセージスキッププラグインで設定したキーのみを考慮する */
    let isTriggered = this.isTriggered() && !MessageSkipManager.isForceDisabledDefaultSkip(MessageSkipTarget.SHOW_TEXT);
    isTriggered = isTriggered || MessageSkipManager.isTriggeredSkipButton();

    this._showFast = isTriggered;

    /* ウェイト系制御文字のスキップを有効にした場合は当該フラグを立てる */
    if (isTriggered && MessageSkipManager.isSkipPauseOperations(MessageSkipTarget.SHOW_TEXT)) {
        this._pauseSkip = true;
    }
};

/* ------------------------------------------------------------------------- */
/*  Window_ScrollText extends */
/* ------------------------------------------------------------------------- */

// Window_ScrollText.prototype.isFastForwardでボタン判定
// Window_ScrollText.prototype.scrollSpeedでスクロール速度調整
// Window_ScrollText.prototype.terminateMessageでウィンドウを閉じている
// update/updateMessageがupdate実体

// 早送り無し==$gameMessage.scrollNoFast()がtrue?




/* ------------------------------------------------------------------------- */
/*  Window_BattleLog extends */
/* ------------------------------------------------------------------------- */

// Window_BattleLog.prototype.messageSpeedで速度を返している
// Window_BattleLog.prototype.isFastForwardでボタン判定
// Windowのterminate処理がないのよね…
// Scene_Battle.prototype.terminateはあるので、ここでリセットした方が良いかも
