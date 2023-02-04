import { Box, Button, createStyles, Grid, TextInput } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import useUIStore from "src/stores/ui.store";
import {
  roomIdFormInitial,
  roomIdSchema,
  TRoomIDForm,
} from "src/components/form/roomId";
import { createRoomId } from "src/utils/createRoomId";
import db, { checkRoomId, dbRef } from "src/server/firebase";
import { ref, set, onValue, push, child, get } from "firebase/database";
import { toast } from "src/utils/toast";
import SignInModal from "src/components/modal/SignInModal";

interface O {
  [key: string]: any;
}

const MeetWrapper: NextPage<{ doesExist?: boolean }> = ({ doesExist }) => {
  const setNavBarVisible = useUIStore((state) => state.setNavBarVisible);

  useEffect(() => {
    if (!doesExist) {
      setNavBarVisible(false);
    }
  }, [doesExist, setNavBarVisible]);

  return <Meet />;
};

const Meet: React.FC = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const [modalBackAllowed, setModalBackAllowed] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(true);

  const handleSignInModal = () => {
    setShowSignInModal(!showSignInModal);
  }

  const handleClick = async () => {
    const roomId = createRoomId();
    // const roomRef = ref(db, "rooms/" + "W6JqvgvBE");
    // const p = await set(ref(db, "rooms/" + "W6JqvgvBE"), {
    //   partipants: {
    //     [btoa("email")]: {
    //       name: "test1",
    //       email: "test2",
    //     },
    //   },
    // });
    // const p = await get(roomRef);
    // const par: O | null = p.toJSON();
    // console.log(par?.partipants);

    // const l = await set(ref(db, "rooms/" + "W6JqvgvBE/partipants/"), {
    //   ...par?.partipants,
    //   [btoa("emais1")]: {
    //     name: "test1",
    //     email: "test",
    //   },
    // });
    // console.log(l);
  };

  const form = useForm({
    validate: zodResolver(roomIdSchema),
    initialValues: roomIdFormInitial,
  });

  const handleSubmit = (values: TRoomIDForm) => {
    const roomRef = ref(db, "rooms/" + values.roomId);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        toast.error("Room does not exist");
      } else {
        router.push("/meet/" + values.roomId);
      }
    });
  };

  return (
    <>
      <Box className={classes.container}>
        <Grid>
          <Grid.Col md={12} lg={6}>
            <h2>Video calls and meetings for everyone.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              assumenda soluta nulla eveniet, voluptatibus nam tempore eius quo
              corrupti id quibusdam! Nemo laboriosam molestiae earum iusto,
              culpa beatae officiis mollitia.
            </p>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Grid>
                <Grid.Col md={2} lg={2}>
                  <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan" }}
                    onClick={handleClick}
                  >
                    Join a meeting
                  </Button>
                </Grid.Col>
                <Grid.Col sm={3} md={3} lg={4}>
                  <TextInput
                    name="roomId"
                    placeholder="Enter the Meeting Code"
                    classNames={{
                      input: classes.detailsRowInput,
                    }}
                    {...form.getInputProps("roomId")}
                  />
                </Grid.Col>
                <Grid.Col sm={3} md={2} lg={2}>
                  <Button variant="outline" type="submit">
                    Join
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Grid.Col>

          <Grid.Col md={12} lg={6}></Grid.Col>
        </Grid>
      </Box>
        <SignInModal
        showModal={showSignInModal}
        setModal={handleSignInModal}
        isBackAllowed={modalBackAllowed}
      />
    </>
  );
};

const useStyles = createStyles({
  container: {
    padding: "0 2rem",
  },
  detailsRowInput: {
    fontSize: 16,
    fontWeight: 400,
    color: "#B1B8C1",
    background: "#000",
    border: "none",
    maxWidth: "400px",
  },
});

export default MeetWrapper;
