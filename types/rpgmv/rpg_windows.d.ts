/**
 * The superclass of all windows within the game.
 */
declare class Window_Base {
    constructor();
    public initialize(x: number, y: number, width: number, height: number);
}

/**
 * The window for displaying text messages.
 */
declare class Window_Message extends Window_Base {
    constructor();
    public initialize(): void;

    public clearFlag(): void;

    public _showFast: boolean;
    public _lineShowFast: boolean;
    public _pauseSkip: boolean;

    public isTriggered(): boolean;

    public updateShowFast(): void;
}
