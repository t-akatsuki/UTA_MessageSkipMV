// =============================================================================
// rpg_windows.js 型定義補助ファイル
// =============================================================================

declare interface TextState {
    index: number;
    x: number;
    y: number;
    left: number;
}

/**
 * The superclass of all windows within the game.
 */
declare class Window_Base {
    constructor();
    public initialize(x: number, y: number, width: number, height: number);

    public _opening: boolean;
    public _closing: boolean;
}

/**
 * The window class with cursor movement and scroll functions.
 */
declare class Window_Selectable extends Window_Base {
    constructor();
    public initialize(x: number, y: number, width: number, height: number): void;
}

/**
 * The window for displaying text messages.
 */
declare class Window_Message extends Window_Base {
    constructor();
    public initialize(): void;
    public initMembers(): void;

    public _imageReservationId: number;
    public _background: number;
    public _positionType: number;
    public _waitCount: number;
    public _faceBitmap: any;    // Bitmap
    public _textState: TextState | null;

    public pause: boolean;

    public clearFlag(): void;

    public _showFast: boolean;
    public _lineShowFast: boolean;
    public _pauseSkip: boolean;

    public isTriggered(): boolean;

    public updateShowFast(): void;

    public processEscapeCharacter(code: string, textState: TextState): void;
    public startWait(count: number): void;
    public startPause(): void;
}

/**
 * The window for displaying scrolling text. No frame is displayed, but it
 * is handled as a window for convenience.
 */
declare class Window_ScrollText extends Window_Base {
    constructor();
    public initialize(): void;

    public update(): void;
    public startMessage(): void;
    public refresh(): void;
    public contentsHeight(): number;
    public updateMessage(): void;
    public scrollSpeed(): number;
    public isFastForward(): boolean;
    public fastForwardRate(): number;
    public terminateMessage(): void;
}

/**
 * The window for displaying battle progress. No frame is displayed, but it is
 * handled as a window for convenience.
 */
declare class Window_BattleLog extends Window_Selectable {
    constructor();
    public initialize(): void;

    public _lines: string[];
    public _methods: {"name": string, "params": Any[]}[];
    public _waitCount: number;
    public _waitMode: "" | "effect" | "movement";
    public _baseLineStack: number[];

    public updateWait(): boolean;
    public updateWaitCount(): boolean;

    public messageSpeed(): number;

    public isFastForward(): boolean;
}

