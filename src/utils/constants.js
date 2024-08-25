export const cUsername = "[cUsername]";
export const myLibrary = "my-library";
export const playlistId = "playlist-Id";

export const screens = {
  xxsm: 375,
  xsm: 430,
  msm: 510,
  sm: 640,
  md: 768,
  slg: 950,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
//also modify at config

export const locationPath = {
  home: "/",
  about: "/about",
  contact: "/contact",
  login: "/login",
  profile: "/profile",
  createPlaylist: "/playlist/create",
  creators: "/creators",
  username: "/choose-username",
  forgotPassword: "/forgot-password",
  register: "/register",
  varifyEmail: "/verify-email",
  watchPlayList: `/watch`,
  showLibrary: `/show-library/${cUsername}`,
  myLibrary: "/my-library",
  editPlaylist: `/playlist/edit/${playlistId}`,
};

export const apiEndpoints = {
  getAllPlayLists: "get-all-playlists",
  checkUsername: "check-username",
  register: "register",
  login: "login",
  verifyEmail: "verify-email",
  sendToken: "send-otp-email",
  verifyResetPasswordToken: "verify-reset-password-otp",
  resetPassword: "reset-password",
  createPlaylist: "playlist/create",
  getMylibrary: `get-my-library`,
  getLibrary: `get-library/${cUsername}`,
  playlist: `playlist/${playlistId}`,
  getCreators: "get-creators",
};

export const apiMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

export const statusCodes = {
  OK: 200,
  INVALID_REQUEST: 401,
  NOT_FOUND: 404,
  FAILED: 500,
};

export const playlistForms = {
  create: "create",
  edit: "edit",
};

export const homePage = {
  homeLists: "home-fetched-list",
  searchlist: "searched-fetched-list",
};

export const LS_VERIFY_USER_DATA = "verifyUserData";
export const LS_KEY_AUTHENTICATED = "isAuthenticated";
export const LS_KEY_USER_ID = "userId";

export const VERIFY = "VERIFY";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const mailSubjects = {
  [VERIFY]: "verify email",
  [FORGOT_PASSWORD]: "reset your password",
};

export const password = "password";
export const text = "text";
export const username = "username";

export const domain = "domain";
export const title = "title";
export const description = "description";
export const link = "link";
