import { useState, useRef, useEffect } from "react";
import {
  useDisclosure,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

const SsoPopup = ({ shopDataLoading, update, setUpdate, shop }) => {
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const ssoLoginUrl = `https://www.outfitxr.io/sso?origin=${shop}`;

  useEffect(() => {
    // Function to handle post messages received from the iframe
    const handleMessage = (event) => {
      // Check if the message origin is trusted (you can adjust this according to your requirements)
      if (event.origin === "https://www.outfitxr.io") {
        // Access the data sent from the iframe
        const messageData = event.data;
        setAccessToken(JSON.stringify(messageData));
        setAccessToken(JSON.stringify(messageData));
        localStorage.setItem("outfitXrAccessToken", messageData);
        onClose();
        setUpdate(!update);

        // Handle the received message data as needed
        console.log("Received post message:", messageData);
      }
    };

    // Add event listener for receiving post messages
    window.addEventListener("message", handleMessage);

    return () => {
      // Clean up by removing the event listener when component unmounts
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <Button
        size={"sm"}
        fontWeight={400}
        bg={"green.500"}
        color={"white"}
        isDisabled={localStorage?.getItem("outfitXrAccessToken")?.length}
        onClick={()=> {
          setBtnLoading(true)
          setTimeout(() => {
            setBtnLoading(false)
          }, 2000);
          onOpen()
        }}
      >
        {localStorage?.getItem("outfitXrAccessToken")?.length
          ? "Connected"
          : "Connect"}{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SSO Login</ModalHeader>
          <ModalBody>
            {/* Create an iframe inside the modal */}
            <iframe
              title="SSO Login"
              src={ssoLoginUrl}
              width="100%"
              height="400px"
              frameBorder="0"
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SsoPopup;
