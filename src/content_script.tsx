import { WebgazerHandler } from "./classes/webgazer_handler";
import { ScrollerFactory } from "./classes/factory"
import { 
  Message,
  WebgazerModifiableSettings,
  OptionSettingsFields
} from "./types";
import { stringifyWebgazerHandlerAction } from "./helper";

const webgazerHandler = new WebgazerHandler(ScrollerFactory.naiveScroller);

chrome.runtime.onMessage.addListener(function (msg: Message, sender, sendResponse) {
  if (msg.action) {
    webgazerHandler.performEyeTrackingAction(msg.action);
    sendResponse(
      stringifyWebgazerHandlerAction(msg.action)
      .concat(" has been called.")
    );
  } else {
    sendResponse("No proper WebgazerHandlerAction was provided!");
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let key in changes) {
    let storageChange = changes[key].newValue as OptionSettingsFields;
    switch (key) {
      case "webgazerSettings":
        let webgazerSettings: WebgazerModifiableSettings = storageChange!;
        webgazerHandler.updateHandler(webgazerSettings);
        break;
    }
  }
});