
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


