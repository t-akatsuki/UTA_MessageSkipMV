// =============================================================================
// rpg_core.js 型定義補助ファイル
// =============================================================================
/**
 * The static class that handles input data from the keyboard and gamepads.
 */
declare class Input {
    constructor();

    public static initialize(): void;

    public static keyRepeatWait: number;
    public static keyRepeatInterval: number;

    public static keyMapper: {[key: number]: string};
    public static gamepadMapper: {[key: number]: string};

    public static clear(): void;

    protected static _currentState: {[key: string]: boolean};
    protected static _previousState: {[key: string]: boolean};
    protected static _gamepadStates: {[key: number]: boolean};
    protected static _latestButton: string | null;
    protected static _pressedTime: number;
    protected static _dir4: number;
    protected static _dir8: number;
    protected static _preferredAxis: string;
    protected static _date: number;

    public static update(): void;
    public static isPressed(keyName: string): boolean;
    public static isTriggered(keyName: string): boolean;
    public static isRepeated(keyName: string): boolean;
    public static isLongPressed(keyName: string): boolean;

    public static readonly dir4: number;
    public static readonly dir8: number;
    public static readonly date: number;
    
    protected static _wrapNwjsAlert(): void;
    protected static _setupEventHandlers(): void;
    protected static _onKeyDown(event: KeyboardEvent): void;
    protected static _shouldPreventDefault(keyCode: number): boolean;
    protected static _onKeyUp(event: KeyboardEvent): void;
    protected static _onLostFocus(): void;
    protected static _pollGamepads(): void;
    protected static _updateGamepadState(gamepad: Gamepad): void;
    protected static _updateDirection(): void;
    protected static _signX(): number;
    protected static _signY(): number;
    protected static _makeNumpadDirection(x: number, y: number): number;
    protected static _isEscapeCompatible(keyName: string): boolean;
}

/**
 * The static class that handles input data from the mouse and touchscreen.
 */
declare class TouchInput {
    constructor();

    public static initialize(): void;

    public static keyRepeatWait: number;
    public static keyRepeatInterval: number;

    public static clear(): void;

    protected static _mousePressed: boolean;
    protected static _screenPressed: boolean;
    protected static _pressedTime: number;
    protected static _events: {
        "triggered": boolean;
        "cancelled": boolean;
        "moved": boolean;
        "released": boolean;
        "wheelX": number;
        "wheelY": number;
    };
    protected static _triggered: boolean;
    protected static _cancelled: boolean;
    protected static _moved: boolean;
    protected static _released: boolean;
    protected static _wheelX: number;
    protected static _wheelY: number;
    protected static _x: number;
    protected static _y: number;
    protected static _date: number;

    public static update(): void;
    public static isPressed(): boolean;
    public static isTriggered(): boolean;
    public static isRepeated(): boolean;

    public static isLongPressed(): boolean;
    public static isCancelled(): boolean;
    public static isMoved(): boolean;
    public static isReleased(): boolean;

    public static readonly wheelX: number;
    public static readonly wheelY: number;
    public static readonly x: number;
    public static readonly y: number;
    public static readonly date: number;

    protected static _setupEventHandlers(): void;
    protected static _onMouseDown(event: MouseEvent): void;
    protected static _onLeftButtonDown(event: MouseEvent): void;
    protected static _onMiddleButtonDown(event: MouseEvent): void;
    protected static _onRightButtonDown(event: MouseEvent): void;
    protected static _onMouseMove(event: MouseEvent): void;
    protected static _onMouseUp(event: MouseEvent): void;
    protected static _onWheel(event: MouseEvent): void;
    protected static _onTouchStart(event: TouchEvent): void;
    protected static _onTouchMove(event: TouchEvent): void;
    protected static _onTouchEnd(event: TouchEvent): void;
    protected static _onTouchCancel(event: TouchEvent): void;
    protected static _onPointerDown(event: PointerEvent): void;
    protected static _onTrigger(x: number, y: number): void;
    protected static _onCancel(x: number, y: number): void;
    protected static _onMove(x: number, y: number): void;
    protected static _onRelease(x: number, y: number): void;
}
