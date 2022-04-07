function getGoogleAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_SERVER_REDIRECT,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

function getGithubAuthUrl() {
  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const SERVER_REDIRECT = process.env.REACT_APP_GITHUB_SERVER_REDIRECT;
  const SELF_REDIRECT = process.env.REACT_APP_SELF_REDIRECT;

  return `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${SERVER_REDIRECT}?path=${SELF_REDIRECT}&scope=user:email`;
}
function getFacebookAuthUrl() {
  const APP_ID = process.env.REACT_APP_FB_APP_ID;
  const SERVER_REDIRECT = process.env.REACT_APP_FB_SERVER_REDIRECT;
  const STATE_PARAMS = process.env.REACT_APP_FB_STATE_PARAMS;
  const SELF_REDIRECT = process.env.REACT_APP_SELF_REDIRECT;

  return `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${SERVER_REDIRECT}&state=${STATE_PARAMS}?path=${SELF_REDIRECT}&scope=email,public_profile`;
}

const googleUrl = getGoogleAuthUrl();
const githubUrl = getGithubAuthUrl();
const facebookUrl = getFacebookAuthUrl();

export { googleUrl, githubUrl, facebookUrl };
