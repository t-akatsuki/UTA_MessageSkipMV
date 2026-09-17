// =============================================================================
// rpg_objects.js 型定義補助ファイル
// =============================================================================
/**
 * The game object class for switches.
 */
declare class Game_Switches {
    constructor();
    public initialize(): void;
    public clear(): void;

    public _data: boolean[];

    public value(switchId: number): boolean;
    public setValue(switchId: number, value: boolean): void;
    public onChange(): void;
}

/**
 * The interpreter for running event commands.
 */
declare class Game_Interpreter {
    public pluginCommand(command: string, args: Any[]): void;
}

/**
 * The game object class for the state of the message window that displays text
 * or selections, etc.
 */
declare class Game_Message {
    constructor();
    public initialize(): void;

    public clear(): void;

    public _texts = [];
    public _choices = [];
    public _faceName = '';
    public _faceIndex = 0;
    public _background = 0;
    public _positionType = 2;
    public _choiceDefaultType = 0;
    public _choiceCancelType = 0;
    public _choiceBackground = 0;
    public _choicePositionType = 2;
    public _numInputVariableId = 0;
    public _numInputMaxDigits = 0;
    public _itemChoiceVariableId = 0;
    public _itemChoiceItypeId = 0;
    public _scrollMode = false;
    public _scrollSpeed = 2;
    public _scrollNoFast = false;
    public _choiceCallback: ((n: number) => void) | null;

    public choices(): string[];
    public faceName(): string;
    public faceIndex(): number;
    public background(): number;
    public positionType(): number;
    public choiceDefaultType(): number;
    public choiceCancelType(): number;
    public choiceBackground(): number;
    public choicePositionType(): number;
    public numInputVariableId(): number;
    public numInputMaxDigits(): number;
    public itemChoiceVariableId(): number;
    public itemChoiceItypeId(): number;
    public scrollMode(): boolean;
    public scrollSpeed(): number;
    public scrollNoFast(): boolean;
    public add(text: string): void;
    public setFaceImage(faceName: string, faceIndex: number): void;
    public setBackground(background: number): void;
    public setPositionType(positionType: number): void;
    public setChoices(choices: string[], defaultType: number, cancelType: number): void;
    public setChoiceBackground(background: number): void;
    public setChoicePositionType(positionType: number): void;
    public setNumberInput(variableId: number, maxDigits: number): void;
    public setItemChoice(variableId: number, itemType: number): void;
    public setScroll(speed: number, noFast: boolean): void;
    public setChoiceCallback(callback: ((n: number) => void)): void;
    public onChoice(n: number): void;
    public hasText(): boolean;
    public isChoice(): boolean;
    public isNumberInput(): boolean;
    public isItemChoice(): boolean;
    public isBusy(): boolean;
    public newPage(): void;
    public allText(): string;
}
