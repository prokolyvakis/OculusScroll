import webgazer from "webgazer/dist/webgazer.commonjs2";
import { getCanvas, getVideo } from "../helper"
import {
    RegressionModules,
    WebgazerHandlerAction,
    Scrollable,
    WebgazerModifiableSettings
} from "../types";
import { ScrollerFactory } from "./factory";

export class WebgazerHandler {
    // Definition of `Class` constants:
    static readonly DEFAULT_REGRESSION_MODULE: RegressionModules = RegressionModules.WEIGHTED_RIDGE;
    // Definition of `Object` variables:
    private readonly _showVideoPreview: boolean;
    private _showPredictionPoints: boolean;
    private readonly _regressionModule: RegressionModules;
    private readonly _useLocalforage: boolean;
    private _scroller: Scrollable;

    /**
     * @constructor
     * @param {() => Scrollable} scrollerConstructor 
     * @param {boolean} showVideoPreview [default=false]
     * @param {boolean} showPredictionPoints [default=false]
     * @param {RegressionModules} regressionModule [default=WebgazerHandler.DEFAULT_REGRESSION_MODULE]
     * @param {boolean} useLocalforage [default=true]
     */
    constructor(scrollerConstructor: () => Scrollable,
                showVideoPreview?: boolean,
                showPredictionPoints?: boolean, 
                regressionModule?: RegressionModules,
                useLocalforage?: boolean) 
    {
        this._showVideoPreview = showVideoPreview ?? false;
        this._showPredictionPoints = showPredictionPoints ?? false;
        this._regressionModule = regressionModule ?? WebgazerHandler.DEFAULT_REGRESSION_MODULE;
        this._useLocalforage = useLocalforage ?? true;
        
        // Saving Data Between Sessions:
        window.saveDataAcrossSessions = this._useLocalforage;
        
        // set scroller:
        this._scroller = scrollerConstructor();
    };
    
    /**
     * @param {WebgazerHandlerAction} action - the action to perform
     * @throws An error in the case of an invalid WebgazerHandlerAction action 
     */
    public performEyeTrackingAction(action: WebgazerHandlerAction): void | Error {
        switch (action as WebgazerHandlerAction) {
            case WebgazerHandlerAction.ENABLE:
                this.enableEyeScrolling();
                break;
            case WebgazerHandlerAction.DISABLE:
                this.disableEyeScrolling();
                break;
            case WebgazerHandlerAction.PAUSE:
                this.pauseEyeScrolling();
                break;
            case WebgazerHandlerAction.RESUME:
                this.resumeEyeScrolling();
                break;
            default:
                throw new Error('WebgazerHandler: Unknown WebgazerHandlerAction!');
        }
    }

    /**
     * @param settings 
     */
    public updateHandler(settings: WebgazerModifiableSettings) {
        /**
         * Check if every property of WebgazerModifiableSettings
         * exists and handle it accordingly. 
         */
        if ( settings.showPredictionPoints !== undefined ) {
            this.showPredictionPoints = settings.showPredictionPoints;
        }
        if ( settings.scrollerSettings !== undefined ) {
            const scrollerConstructor: () => Scrollable =
                ScrollerFactory
                .scrollerWithOptions(
                    settings.scrollerSettings
                );
            this.scroller = scrollerConstructor();
        }
    }

    private async setListener() {
        const scroller = this._scroller;
        await webgazer.setGazeListener(function(data: any, elapsedTime: number) {
            // elapsed time is based on time since begin was called
            if (data === null)
                return;
            // Get y coordinate (relative to the viewport):
            let yPrediction: number = data.y;
            scroller.scroll(yPrediction);
        });
    }

    private async enableEyeScrolling() {
        console.log("Attempting to start webgazer ...");

        webgazer.showVideoPreview(this._showVideoPreview);
        webgazer.showPredictionPoints(this._showPredictionPoints);
        // set a regression module:
        webgazer.setRegression(this._regressionModule.toString());

        await webgazer.begin();
        // Set the listener:
        this.setListener();
    }

    private async disableEyeScrolling() {
        console.log("Disabling webgazer ...");
        // remove gaze listener
        await webgazer.clearGazeListener();

        // stop video
        const video = getVideo();
        const mediaStream = video?.srcObject;
        if (mediaStream instanceof MediaStream) {
            const tracks = mediaStream.getTracks();
            // Iterate & stop every track
            tracks.forEach(track => track.stop());
        }

        // remove video element and canvas
        video?.remove();
        getCanvas()?.remove();
    }

    private async pauseEyeScrolling() {
        console.log("Pausing webgazer ...");
  
        await webgazer.pause();
    }

    private async resumeEyeScrolling() {
        console.log("Resuming webgazer ...");
  
        await webgazer.resume();
    }

    // Definition of Getters & Setters:

    get showVideoPreview() { return this._showVideoPreview; }

    set showPredictionPoints(flag: boolean) { this._showPredictionPoints = flag; }

    get showPredictionPoints() { return this._showPredictionPoints; }

    get regressionModule() { return this._regressionModule.toString(); }

    get useLocalforage() { return this._useLocalforage; }

    get scroller() { return this._scroller; }

    set scroller(scroller) { this._scroller = scroller; } 
}