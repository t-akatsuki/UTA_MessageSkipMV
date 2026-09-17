import { MessageSkipManager, MessageSkipTarget } from "@/utakata/message_skip";

/* ------------------------------------------------------------------------- */
/*  Window_Message extends */
/* ------------------------------------------------------------------------- */
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
const _Window_ScrollText_prototype_isFastForward = Window_ScrollText.prototype.isFastForward;

/**
 * @override
 * @return {boolean}
 */
Window_ScrollText.prototype.isFastForward = function() {
    let ret = _Window_ScrollText_prototype_isFastForward.call(this);

    /* デフォルト機能を無効に設定した場合、デフォルトの早送り判定で必ずfalseを返す */
    if (MessageSkipManager.isForceDisabledDefaultSkip(MessageSkipTarget.SCROLLING_TEXT)) {
        ret = false;
    }

    return ret;
};

const _Window_ScrollText_prototype_scrollSpeed = Window_ScrollText.prototype.scrollSpeed;

/**
 * @override
 * @return {number}
 */
Window_ScrollText.prototype.scrollSpeed = function() {
    let speed = _Window_ScrollText_prototype_scrollSpeed.call(this);

    /* 「早送りなし」を設定した場合はメッセージスキップ不可とする */
    if ($gameMessage.scrollNoFast()) {
        return speed;
    }

    /* メッセージスキップキーを押下している場合は早送り速度を上書き */
    if (MessageSkipManager.isEnabled(MessageSkipTarget.SCROLLING_TEXT) && MessageSkipManager.isTriggeredSkipButton()) {
        speed = MessageSkipManager.getFastForwardRate(MessageSkipTarget.SCROLLING_TEXT);
    }

    return speed;
};

/* ------------------------------------------------------------------------- */
/*  Window_BattleLog extends */
/* ------------------------------------------------------------------------- */
const _Window_BattleLog_prototype_updateWaitCount = Window_BattleLog.prototype.updateWaitCount;

/**
 * @override
 * @return {boolean}
 */
Window_BattleLog.prototype.updateWaitCount = function() {
    let ret = _Window_BattleLog_prototype_updateWaitCount.call(this);
    if (this._waitCount <= 0) {
        return ret;
    }

    /* メッセージスキップキーを押下している場合はスキップ速度でカウンタを進める */
    if (MessageSkipManager.isEnabled(MessageSkipTarget.BATTLE_LOG) && MessageSkipManager.isTriggeredSkipButton()) {
        /* 元の処理で既に引かれた分を考慮 */
        const updatedWaitCount = this.isFastForward() ? 3 : 1;
        const decreaseWaitCount = Math.max(MessageSkipManager.getFastForwardRate(MessageSkipTarget.BATTLE_LOG) - updatedWaitCount, 0);
        this._waitCount -= decreaseWaitCount;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
        ret = true;
    }

    return ret;
};

const _Window_BattleLog_prototype_isFastForward = Window_BattleLog.prototype.isFastForward;

/**
 * @override
 * @return {boolean}
 */
Window_BattleLog.prototype.isFastForward = function() {
    let ret = _Window_BattleLog_prototype_isFastForward.call(this);

    /* デフォルト機能を無効に設定した場合、デフォルトの早送り判定で必ずfalseを返す */
    if (MessageSkipManager.isForceDisabledDefaultSkip(MessageSkipTarget.BATTLE_LOG)) {
        ret = false;
    }

    return ret;
};

