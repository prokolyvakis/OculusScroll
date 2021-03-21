
import webgazer from "webgazer/dist/webgazer.commonjs2";
import { 
  WebgazerHandlerAction,
  OptionSettingsFields,
  WebgazerModifiableSettings
} from "./types";
import { WebgazerHandler } from "./classes/webgazer_handler";

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCanvas() : HTMLCanvasElement | null {
  return webgazer.getVideoElementCanvas();
}

export function getCanvasHeight() : number | null {
  const canvas = getCanvas();
  return (canvas !== null) ? canvas.height : null;
}

export function getVideo() : HTMLVideoElement | null {
  return document.querySelector('video');
}

export function incrementScrollTop(increment: number) {
  document.documentElement.scrollTop+=increment; 
}

export function stringifyWebgazerHandlerAction(action: WebgazerHandlerAction) {
  let actionString: string;
  switch (action as WebgazerHandlerAction) {
    case WebgazerHandlerAction.ENABLE:
        actionString = "enable";
        break;
    case WebgazerHandlerAction.DISABLE:
        actionString = "disable";
        break;
    case WebgazerHandlerAction.PAUSE:
        actionString = "pause";
        break;
    case WebgazerHandlerAction.RESUME:
        actionString = "resume";
        break;
    default:
        actionString = "invalid"
  }
  return actionString.concat(" action");
}
