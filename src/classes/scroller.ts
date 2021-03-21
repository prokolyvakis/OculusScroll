import { Scrollable, Scroller } from "../types";
import { getCanvasHeight, incrementScrollTop } from "../helper"

/**
 * `AbstractScroller`: absract class that all Scrollers
 * should extend. It basically only cares that a action
 * will be taken only in the case when we have a valid
 * canvas height, otherwise no action is taken.
 * @implements {Scrollable}
 */
export abstract class AbstractScroller implements Scrollable {
    protected _canvasHeight: number | null = getCanvasHeight();

    // Definition of abstract methods:

    /** 
     * When `safe_scroll` is called _canvasHeight is 
     * guaranteed to be *not null*
     */
    protected abstract safe_scroll(yPrediction: number) : void;
    public abstract getScrollerType(): Scroller;
    
    // Definition of methods:

    public scroll(yPrediction: number) : void {
        this.requestValidCanvasHeight();
        if (this.isValidCanvasHeight())
            this.safe_scroll(yPrediction);
    }

    protected isValidCanvasHeight() { return this._canvasHeight !== null; }
    
    protected requestValidCanvasHeight() {
        if (!this.isValidCanvasHeight())
            this._canvasHeight = getCanvasHeight();
    }

    // Definition of Getters & Setters:

    get canvasHeight() { return this._canvasHeight; }
}

/**
 *  Implement a Naive Scroller that scrolls only
 *  when the distance exceeds a certain threshold.
 * @params {number} epsilon - the threshold value
 * @extends AbstractScoller
 * @implements {Scrollable}
 */
export class NaiveScroller extends AbstractScroller {
    // Definition of `Class` variables:
    static readonly SCROLL_TOP_INCREMENT: number = 1;
    // Definition of `Object` variables:
    private _epsilon: number;

    constructor(epsilon: number) {
        super();
        this._epsilon = epsilon;
    }

    // Definition of methods:
    protected safe_scroll(yPrediction: number) : void {
        const diff: number = this._canvasHeight! - yPrediction;
        if (diff < this._epsilon)
            incrementScrollTop(NaiveScroller.SCROLL_TOP_INCREMENT);
    }

    public getScrollerType() { return Scroller.NAIVE_SCROLLER; }

    // Definition of Getters & Setters:

    get epsilon() { return this._epsilon; }

    set epsilon(eps: number) { this._epsilon = eps; }
    
}