import Head from "next/head";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";

import { PostWithCreator } from "../types/Gateway";
import { getRecentGmers } from "../utils/api";
import { gateway } from "../utils/gateway";
import { timeSince } from "../utils/time";

export default function Home({ recent }: { recent: PostWithCreator[] }) {
  const [recents, setRecents] = useState<PostWithCreator[]>(recent);

  async function updatePosts(new_post: PostWithCreator) {
    setRecents((prev) => {
      prev.shift();
      return [...prev, new_post];
    });
  }

  useEffect(() => {
    gateway.addListener("post", updatePosts);

    return () => {
      gateway.removeListener("post", updatePosts);
    };
  }, []);

  return (
    <>
      <Head>
        <title>gm recents • dstn.to</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Container>
        <Content>
          <Heading>gm • recent gms</Heading>
          <HeadingNav>
            <Link href="/" passHref>
              <HeadingLink inactive>unofficial</HeadingLink>
            </Link>
            <Link href="/official" passHref>
              <HeadingLink inactive>official</HeadingLink>
            </Link>
            <Link href="/recents" passHref>
              <HeadingLink>recents</HeadingLink>
            </Link>
          </HeadingNav>
          <LeaderboardContainer>
            {recents &&
              recents.map((lb) => (
                <Link href={lb.creator.username} key={lb.id}>
                  <LeaderboardEntry>
                    <UserAvatar src={lb.creator.avatar} />
                    <Names>
                      <Name>
                        {lb.creator.name} (@{lb.creator.username})
                      </Name>
                      <GMMessage>gm</GMMessage>
                    </Names>
                    <DateCreated>{timeSince(new Date(lb.creation_time), true)}</DateCreated>
                  </LeaderboardEntry>
                </Link>
              ))}
          </LeaderboardContainer>
          <Footer>
            <a target="_blank" href="https://dstn.to">
              dstn.to
            </a>{" "}
            •{" "}
            <a target="_blank" href="https://dstn.to/gm-lb">
              Source
            </a>
          </Footer>
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Heading = styled.h1`
  font-family: Karla, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
  margin: 10px;
`;

const HeadingLink = styled.a<{ inactive?: boolean }>`
  font-family: Karla, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  opacity: ${({ inactive }) => (inactive ? 0.4 : 1)};
`;

const HeadingNav = styled.div``;

const LeaderboardContainer = styled.div`
  background-color: #38383880;
  max-width: 700px;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
`;

const LeaderboardEntry = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Names = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

const DateCreated = styled.h2`
  font-size: 14px;
  margin: 0px;
  margin-right: 10px;
  align-self: center;
  color: #ffffff60;
`;

const Name = styled.h2`
  font-size: 18px;
  margin: 0px;
  color: #ffffff;
`;

const GMMessage = styled.h2`
  font-size: 14px;
  margin: 0px;
  margin-right: 10px;
  color: #ffffff;
`;

const Footer = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: 10px;
  opacity: 0.4;
`;

export async function getServerSideProps(context: any) {
  const recent = await getRecentGmers();

  return {
    props: {
      recent,
    },
  };
}
