import React, { useMemo } from 'react';
import { Affix, Paper } from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './NavBar.module.css';


const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <Affix position={{ bottom: 20, left: `calc(50vw - 168px)` }} zIndex={100}>
      <Paper
        shadow="xs"
        p="xs"
        radius={20}
        component={'nav'}
        className={styles.root}
      >
        {/* <Link href={hrefs.PROFILE} className={styles.links}>
          {activeTab === 'profile' ? (
            <Image
              src={'/images/icons/nav-profile-active.svg'}
              alt={'Profile'}
              height={40}
              width={40}
            />
          ) : (
            <Image
              src={'/images/icons/nav-profile.svg'}
              alt={'Profile'}
              height={24}
              width={24}
            />
          )}
        </Link> */}
      </Paper>
    </Affix>
  );
};

export default NavBar;
