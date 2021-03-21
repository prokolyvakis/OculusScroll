import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  OptionSettings,
  WebgazerModifiableSettings,
  NaiveScrollerModifiableSettings,
  Scroller
} from "./types";
import { OptionSettingsConstants } from "./config/option_settings_constants";

const Options = () => {
  const [
    webgazerSettings,
    setWebgazerSettings,
  ] = useState<WebgazerModifiableSettings>(OptionSettingsConstants.defaultWebgazerSetting);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    let data: OptionSettings = {
      webgazerSettings: webgazerSettings
    };
    chrome.storage.sync.get(data, (items: OptionSettings) => {
      console.log(items);
      setWebgazerSettings(items.webgazerSettings!);
    });
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    let data: OptionSettings = {
      webgazerSettings: webgazerSettings,
    };
    chrome.storage.sync.set(data, () => {
      // Update status to let user know options were saved.
      setStatus("Options saved.");
      const id = setTimeout(() => {
        setStatus(undefined);
      }, 1000);
      return () => clearTimeout(id);
    });
  };

  return (
    <>
      <div>
        Webgazer Settings:&nbsp;
        <label>
          Show Prediction Points:
          <input
            type="checkbox"
            checked={webgazerSettings?.showPredictionPoints}
            onChange={(event) =>
              setWebgazerSettings({
                showPredictionPoints: event.target.checked,
              })
            }
          />
        </label>
      </div>
      <div>
        Scroller Settings:&nbsp;
        {/* <form onSubmit={saveOptions}> */}
        <form>
          <label>
            Cut-off Threshold value:
            <input
              type="number"
              value={(webgazerSettings?.scrollerSettings as NaiveScrollerModifiableSettings)?.epsilon}
              onChange={(event) => {
                const settings: NaiveScrollerModifiableSettings =
                  {
                    scroller: Scroller.NAIVE_SCROLLER,
                    epsilon: event.target.valueAsNumber
                  }
                setWebgazerSettings({scrollerSettings: settings});
              }}
            />
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
