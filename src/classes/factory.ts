import {NaiveScroller} from "./scroller";
import {
    NaiveScrollerModifiableSettings,
    ScrollerModifiableSettings,
    Scroller
  } from "../types";
import { OptionSettingsConstants } from "../config/option_settings_constants";

export class ScrollerFactory {
    
    /**
     * @param settings 
     * @returns {() => NaiveScroller}
     */
    private static naiveScrollerWithOptions = 
        (settings: NaiveScrollerModifiableSettings) =>
            () => new NaiveScroller(settings.epsilon);
    
    /**
     * @param settings 
     * @returns {() => NaiveScroller}
     */
    public static naiveScroller = 
        ScrollerFactory.naiveScrollerWithOptions(
            OptionSettingsConstants.defaultNaiveScrollerSetting
        ); 

    /**
     * @param settings 
     * @returns {() => Scrollable}
     * @throws An error in the case of an invalid Scroller.
     */
    public static scrollerWithOptions =
        (settings: ScrollerModifiableSettings) =>
            {
                switch (settings.scroller) {
                    case Scroller.NAIVE_SCROLLER:
                        return ScrollerFactory.naiveScrollerWithOptions(
                            settings as NaiveScrollerModifiableSettings
                        );
                    default:
                        throw new Error('scrollerWithOptions: Invalid Scroller type!')
                }
            };

}