import {
  AccessTokenRequest,
  AuthRequest,
  CodeChallengeMethod,
  makeRedirectUri,
  RefreshTokenRequest,
} from "expo-auth-session";
import * as Crypto from "expo-crypto";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { StoreInterface } from "../store/store";

const DISCOVERY = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = makeRedirectUri({
  scheme: "lunar-stats-native",
  native: `lunar-stats-native://redirect`,
});
const SCOPES = ["user-top-read"];

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

function base64URLEncode(str: Buffer) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export const createVerifierChallenge = (): Promise<
  [verifier: string, challenge: string]
> => {
  return new Promise(async (resolve, reject) => {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    const verifier = base64URLEncode(Buffer.from(randomBytes));

    const challengeBase64 = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    const challenge = challengeBase64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    resolve([verifier, challenge]);
  });
};

export const getTokenResponse = async () => {
  const [verifier, challenge] = await createVerifierChallenge();

  const codeRequest = new AuthRequest({
    usePKCE: true,
    redirectUri: REDIRECT_URI,
    responseType: "code",
    scopes: SCOPES,
    codeChallengeMethod: CodeChallengeMethod.S256,
    codeChallenge: challenge,

    clientId: CLIENT_ID,
  });

  codeRequest.codeVerifier = verifier;

  if (!DISCOVERY) return;
  const response = await codeRequest.promptAsync(DISCOVERY);
  console.log(response);
  if (response?.type !== "success") return;

  const { code } = response.params;
  console.log(code);

  const tokenRequest = new AccessTokenRequest({
    redirectUri: REDIRECT_URI,
    code: code,
    scopes: SCOPES,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  const tokenResponse = await tokenRequest.performAsync(DISCOVERY);
  console.log(tokenResponse.getRequestConfig());
  return tokenResponse;
};

export const getRefreshToken = async (refreshToken: string) => {
  const refreshRequest = new RefreshTokenRequest({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scopes: SCOPES,
    refreshToken,
  });

  const tokenResponse = await refreshRequest.performAsync(DISCOVERY);
  return tokenResponse;
};

export const useRefreshToken = () => {
  const auth = useSelector((state: StoreInterface) => state.auth);
  const dispatch = useDispatch();

  const refresh = async () => {
    if (!auth.timestamp) return;
    if (Date.now() - auth.timestamp > 3500000) {
      const refreshToken = auth.refreshToken;
      if (!refreshToken) {
        dispatch(authActions.setAuth({ token: null, refreshToken: null }));
        return;
      }
      const newResponse = await getRefreshToken(refreshToken);
      if (newResponse) {
        dispatch(
          authActions.setAuth({
            token: newResponse.accessToken,
            refreshToken: newResponse.refreshToken,
          })
        );
      } else {
        dispatch(authActions.setAuth({ token: null, refreshToken: null }));
      }
    }
  };

  refresh();
};
