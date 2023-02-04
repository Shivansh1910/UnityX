import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextInput } from "@mantine/core";
import { ChevronLeft } from "tabler-icons-react";
import globalModalCss from "src/styles/themeModals.module.css";
import classes from "src/styles/enterRoomModal.module.css";
import ModalCircleBtn from "./ModalCircleBtn";
import { useForm, zodResolver } from "@mantine/form";
import { participantSchema } from "../form/participant";
import useIParticipantStore from "src/stores/participant.store";
import { signin } from "src/server/firebase";

export interface IClaimYourAndIdRef {
  showModal: boolean;
  setModal: () => void;
  isBackAllowed?: boolean;
}

const SignInModal = (props: IClaimYourAndIdRef) => {
  const name = useIParticipantStore((state) => state.name);
  const email = useIParticipantStore((state) => state.email);
  const setName = useIParticipantStore((state) => state.setName);
  const setEmail = useIParticipantStore((state) => state.setEmail);

  const { setModal, showModal } = props;
  const closeModal = () => {
    setModal();
  };

  const form = useForm({
    validate: zodResolver(participantSchema),
    initialValues: {
      name: name,
      email: email,
    },
  });

  const handleSubmit = (data: any) => {
    setName(data.name);
    setEmail(data.email);
    closeModal();
  };

  const handleSignIn = async () => {
    const user = await signin();
    setEmail(user?.email ?? "");
    setName(user?.displayName ?? "");
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal
        styles={{
          modal: { width: 600, maxWidth: "100%", minHeight: 500 },
          root: { background: "#323232" },
        }}
        classNames={{
          modal: `${globalModalCss.modalBody} ${globalModalCss.mobileModalBody}`,
          inner: globalModalCss.modalInnerContent,
          body: classes.modalBody,
        }}
        opened={showModal}
        onClose={closeModal}
        withCloseButton={false}
        overlayColor={"#323232"}
        size={343}
        centered
        padding={0}
        closeOnEscape={false}
        closeOnClickOutside={false}
      >
        <Box sx={{ padding: "25px 24px", height: "100%" }}>
          {props.isBackAllowed && (
            <ModalCircleBtn
              handleOnClick={closeModal}
              Icon={
                <ChevronLeft
                  size={14}
                  color="#fff"
                  scale={2.5}
                  style={{ marginRight: 2 }}
                />
              }
              size={24}
            />
          )}

          <Box className={classes.root}>
            <Box className={classes.cardDesign}>
              <p className={classes.detail}>Choose Sign In Method</p>
            </Box>
            <Box>
              <Button onClick={handleSignIn}>Sign In with Google</Button>
            </Box>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                mt="sm"
                label="Email"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Name"
                placeholder="Name"
                {...form.getInputProps("name")}
              />

              <Button mt="md" type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SignInModal;
