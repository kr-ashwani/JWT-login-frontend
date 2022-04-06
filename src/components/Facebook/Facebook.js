import React, { useState } from "react";

const APP_ID = process.env.REACT_APP_FB_APP_ID;
const SERVER_REDIRECT = process.env.REACT_APP_FB_SERVER_REDIRECT;
const STATE_PARAMS = process.env.REACT_APP_FB_STATE_PARAMS;
const SELF_REDIRECT = process.env.REACT_APP_SELF_REDIRECT;
const TEMP = "https://spicy-dragon.netlify.com";

const Facebook = () => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${SELF_REDIRECT}&state=${STATE_PARAMS}`;
  let windowObjectReference = null;
  let previousUrl = null;
  const [path, setPath] = useState("");

  const openSignInWindow = (url, name) => {
    // remove any existing event listeners
    // window.removeEventListener("message", receiveMessage);

    // window features
    const strWindowFeatures =
      "toolbar=no, menubar=no, width=600, height=700, top=100, left=0";

    if (windowObjectReference === null || windowObjectReference.closed) {
      /* if the pointer to the window object in memory does not exist
      or if such pointer exists but the window was closed */
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      /* if the resource to load is different,
      then we load it in the already opened secondary window and then
      we bring such window back on top/in front of its parent window. */
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      /* else the window reference must exist and the window
      is not closed; therefore, we can bring it back on top of any other
      window with the focus() method. There would be no need to re-create
      the window or to reload the referenced resource. */
      windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener("message", receiveMessage);
    // assign the previous URL
    previousUrl = url;
  };

  function receiveMessage(event) {
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    window.removeEventListener("message", receiveMessage);
    if (event.origin !== process.env.REACT_APP_SELF_DOMAIN) return;
    console.log(event);
    if (!(typeof event.data === "string")) return;
    setPath(event.data);
    // if (data.source === "lma-login-redirect") {
    //   // get the URL params and redirect to our server to use Passport to auth/login
    //   const redirectUrl = `/auth/google/login${payload}`;
    //   window.location.pathname = redirectUrl;
    // }
  }

  return (
    <>
      <button onClick={() => openSignInWindow(url, "sign in with fb")}>
        Sign in with Facebook
      </button>

      <p>{path}</p>
    </>
  );
};

export default Facebook;
