import { GITHUB_CLIENT_ID } from "constants/index";
import { ROUTES } from "constants/routes";
import queryString from "query-string";

const oauth = {
  open() {
    // const windowArea: any = {
    //   width: Math.floor(window.outerWidth * 0.8),
    //   height: Math.floor(window.outerHeight * 0.5),
    // };

    // if (windowArea.width < 1000) {
    //   windowArea.width = 1000;
    // }
    // if (windowArea.height < 630) {
    //   windowArea.height = 630;
    // }
    // windowArea.left = Math.floor(
    //   window.screenX + (window.outerWidth - windowArea.width) / 2
    // );
    // windowArea.top = Math.floor(
    //   window.screenY + (window.outerHeight - windowArea.height) / 8
    // );

    // const sep = _url.indexOf("?") !== -1 ? "&" : "?";
    // const url = `${_url}${sep}`;
    // const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    // 	width=${windowArea.width},height=${windowArea.height},
    // 	left=${windowArea.left},top=${windowArea.top}`;
    // window.open(url, "producthuntPopup", windowOpts);

    const config = {
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: `${window.location.origin}/#${ROUTES.OAUTH_RESULT}`,
      scope: "user",
    };
    window.open(
      `https://github.com/login/oauth/authorize?${queryString.stringify(
        config
      )}`,
      "oauth"
    );
  },
};
export default oauth;
