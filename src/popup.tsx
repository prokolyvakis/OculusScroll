import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useLocalStorageState from "use-local-storage-state";
import { Message, WebgazerHandlerAction } from "./types";

const Popup = () => {

  const [isInInitialState, setInitialState] = useLocalStorageState<boolean>("isInInitialState", true);
  const [isPaused, setPaused] = useLocalStorageState<boolean>("isPaused", false);
  const [badge, setBadge] = useState<string>("");

  useEffect(() => {
    setTimeout(() => chrome.browserAction.setBadgeText({ text: badge }), 1000);
  }, [badge]);

  //TODO: state variables are async -> find a *cleaner & safer* solution
  const updateBadge = () => {
    setBadge(
      !(isInInitialState || isPaused) ? "P" : ""
    )
  };

  const call = (act: WebgazerHandlerAction) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      const message: Message = { 
        action: act
      };
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          message,
          (response) => { console.log("result message:", response); }
        );
      }
    });
  };

  const callAndUpdateBadge = (action: WebgazerHandlerAction) => {
    call(action);
    updateBadge();
  }

  const enableCall  = () => {
    setInitialState(false);
    callAndUpdateBadge(WebgazerHandlerAction.ENABLE);
  }

  const disableCall = () => { 
    setInitialState(true);
    setPaused(false);
    callAndUpdateBadge(WebgazerHandlerAction.DISABLE);
  }

  const resumeCall  = () => { 
    setPaused(false);
    callAndUpdateBadge(WebgazerHandlerAction.RESUME);
  }

  const pauseCall   = () => {
    setPaused(true);
    callAndUpdateBadge(WebgazerHandlerAction.PAUSE);
  }

  let enableButton  = isInInitialState  ? <button onClick={enableCall}>Enable</button> : null;
  let disableButton = !isInInitialState ? <button onClick={disableCall}>Disable</button> : null;

  let pauseButton   = !(isInInitialState || isPaused) ? <button onClick={pauseCall}>Pause</button> : null;
  let resumeButton  = (!isInInitialState && isPaused) ? <button onClick={resumeCall}>Resume</button> : null; 

  return (
    <>
     {enableButton}
     {pauseButton}
     {resumeButton}
     {disableButton}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);