import {
  NaiveScrollerModifiableSettings,
  WebgazerModifiableSettings,
  Scroller
} from "../types";

export namespace OptionSettingsConstants {
    
    const naiveScrollerEpsilon: number = 260;

    export const defaultNaiveScrollerSetting: NaiveScrollerModifiableSettings = {
        scroller: Scroller.NAIVE_SCROLLER,
        epsilon: naiveScrollerEpsilon
    };
    
    const showPredictionPoints = false;

    export const defaultWebgazerSetting: WebgazerModifiableSettings = {
        showPredictionPoints: showPredictionPoints,
        scrollerSettings: defaultNaiveScrollerSetting
    };
}