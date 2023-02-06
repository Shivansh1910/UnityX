import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextInput } from "@mantine/core";
import { ChevronLeft } from "tabler-icons-react";
import globalModalCss from "src/styles/themeModals.module.css";
import classes from "src/styles/enterRoomModal.module.css";
import ModalCircleBtn from "./ModalCircleBtn";
import { useForm, zodResolver } from "@mantine/form";
import { participantSchema } from "../form/participant";
import { addRoom, signin } from "src/server/firebase";
import { useRouter } from "next/router";

export interface IClaimYourAndIdRef {
  showModal: boolean;
  setModal: () => void;
  isBackAllowed?: boolean;
  name: string | null;
  setName: (name: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
  room: string | null;
}

const SignInModal = (props: IClaimYourAndIdRef) => {
  const router = useRouter();
  const { setModal, showModal } = props;
  const closeModal = () => {
    setModal();
  };

  const form = useForm({
    validate: zodResolver(participantSchema),
    initialValues: {
      name: props.name,
      email: props.email,
    },
  });

  const handleSubmit = (data: any) => {
    props.setName(data.name);
    props.setEmail(data.email);
    if (props.room) {
      addRoom(props.room, data.name, data.email);
      closeModal();
      router.push("/meet/" + props.room);
    }
  };

  const handleSignIn = async () => {
    const user = await signin();
    props.setEmail(user?.email);
    props.setName(user?.displayName);
    if (props.room) {
      addRoom(props.room, user?.email, user?.displayName);
      closeModal();
      router.push("/meet/" + props.room);
    }
  };

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
            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button className={classes.loginWithGoogleBtn} onClick={handleSignIn}>Sign in with Google</Button>
            </Box>
            <p className={classes.detail} style={{ marginTop: '12px', fontSize: '15px', fontWeight: 400 }}>
              OR
            </p>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Name"
                placeholder="Name"
                {...form.getInputProps("name")}
              />
              <TextInput
                mt="sm"
                label="Email"
                placeholder="Email"
                {...form.getInputProps("email")}
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
