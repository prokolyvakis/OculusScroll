/**
 * Definition of a basic enum that stores
 * the available regression modules provided
 * by WebGazer.
 */ 
export enum RegressionModules {
    RIDGE = "ridge",
    WEIGHTED_RIDGE = "weightedRidge",
    THREADED_RIDGE = "threadedRidge"
}

/**
 * Definition of actions that WebgazerHandler can perform.
 * Note: INVALID_ACTION has been added for error handling.
 */
export enum WebgazerHandlerAction {
    INVALID_ACTION,
    ENABLE,
    DISABLE,
    PAUSE,
    RESUME
}

/**
 * Definition of the basic type that Chrome messaging
 * should conform to. Note: message design has been
 * kept simple, in the sense that both content_script
 * & background script interactions with popup & option
 * conform to the same type.  
 */
export type Message = {
    action?: WebgazerHandlerAction;
};

/**
 * Definition of the interface that scrollers
 * should conform to. Please note that scroll
 * action is determined by only considering
 * the *vertical* coordinate estimation.
 */
export interface Scrollable {
    scroll(yPrediction: number): void;
    getScrollerType(): Scroller
}

/**
 * Definition of the basis scroller types
 */
export enum Scroller {
    INVALID_SCROLLER,
    NAIVE_SCROLLER
} 

/**
 * Definition of the property *saveDataAcrossSessions*
 * that is used by webgazer to decide whether or not
 * to store on localforage the model between sessions.
 */
declare global {
    export interface Window {
        // add you custom properties and methods
        saveDataAcrossSessions: boolean | undefined;
    }
}

/**
 * Definition of the general settings that are modifiable
 * from the `Options` page of the extension.
 * Note: it's the type that chrome storage should conform to.
 */
export type OptionSettings = {
    webgazerSettings?: WebgazerModifiableSettings;
}

// TODO: see how to exclude undefined as option.
export type OptionSettingsFields = OptionSettings[keyof OptionSettings];

/**
 * Definition of the WebgazerHandler modifiable settings
 */
export type WebgazerModifiableSettings = {
    showPredictionPoints?: boolean;
    scrollerSettings?: ScrollerModifiableSettings;
};

/**
 * Definition of the general scroller modifiable settings.
 */
export interface ScrollerModifiableSettings {
    scroller: Scroller
}

/**
 * Definition of NaiveScroller modifiable settings 
 */
export interface NaiveScrollerModifiableSettings extends ScrollerModifiableSettings {
    scroller: Scroller.NAIVE_SCROLLER,
    epsilon: number;
}