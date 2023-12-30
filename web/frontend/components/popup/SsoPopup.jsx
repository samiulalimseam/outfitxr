import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const SsoPopup = ({ shopDataLoading, shop }) => {
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("-");
  console.log(accessToken)

  const openSsoPopup = () => {
    // Your SSO login URL
    const ssoLoginUrl = `https://www.outfitxr.io/sso/login?origin=${shop}`;

    const popup = window.open(
      ssoLoginUrl,
      "Login to OutfitterXR",
      "width=600,height=600"
    );

    if (window.focus) {
      popup.focus();
    }
    const checkPopupClosed = setInterval(() => {
      try {
        if (!popup || popup.closed || popup.closed === undefined) {
          clearInterval(checkPopupClosed);
          // Perform actions after the popup is closed
        } else if (popup.location.href.includes("YOUR_SUCCESS_REDIRECT_URL")) {
          clearInterval(checkPopupClosed);
          // Successful login, retrieve access token from the popup
          const urlParams = new URLSearchParams(popup.location.search);
          const token = urlParams.get("access_token");
          if (token) {
            setAccessToken(token);
            // Optionally, perform further actions with the token
          }
          popup.close();
        }
      } catch (error) {
        console.error("Cross-origin access error:", error);
      }
    }, 1000);
  };

  return (
    <div>
      <Button
        isLoading={shopDataLoading || isBtnLoading}
        onClick={() => {
          setBtnLoading(true);
          openSsoPopup();
          setTimeout(() => {
            setBtnLoading(false);
          }, 2000);
        }}
        size={"sm"}
      >
        Connect
      </Button>
    </div>
  );
};

export default SsoPopup;
