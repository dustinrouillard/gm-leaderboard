import Head from "next/head";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";

import { User } from "../types/Gateway";
import { getTopGmers } from "../utils/api";
import { gateway } from "../utils/gateway";
import { GetStaticProps } from "next";

export default function Home({ leaderboard: lb }: { leaderboard: User[] }) {
  const [leaderboard, setLeaderboard] = useState<User[]>(lb);

  async function updateLb(new_users: User[]) {
    setLeaderboard(new_users);
  }

  useEffect(() => {
    gateway.addListener("leaderboard", updateLb);

    return () => {
      gateway.removeListener("leaderboard", updateLb);
    };
  }, []);

  return (
    <>
      <Head>
        <title>gm leaderboard • dstn.to</title>
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
          <Heading>gm • top ten</Heading>
          <HeadingNav>
            <Link href="/" passHref>
              <HeadingLink>unofficial</HeadingLink>
            </Link>
            <Link href="/official" passHref>
              <HeadingLink inactive>official</HeadingLink>
            </Link>
            <Link href="/recents" passHref>
              <HeadingLink inactive>recents</HeadingLink>
            </Link>
          </HeadingNav>
          <LeaderboardContainer>
            {leaderboard &&
              leaderboard.map((lb) => (
                <Link href={lb.username} key={lb.uid}>
                  <LeaderboardEntry>
                    <Number>#{lb.rank}</Number>
                    <UserAvatar src={lb.avatar} />
                    <Names>
                      <Name>{lb.name}</Name>
                      <Username>@{lb.username}</Username>
                    </Names>
                    <Score>{lb.score.toLocaleString()}</Score>
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

const Number = styled.h2`
  font-size: 20px;
  margin: 0px;
  opacity: 0.6;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: right;
  margin-right: 10px;
  width: 45px;
  color: #ffffff;
`;

const Name = styled.h2`
  font-size: 20px;
  margin: 0px;
  color: #ffffff;
`;

const Username = styled.h2`
  font-size: 12px;
  margin: 0px;
  color: #ffffff;
`;

const Score = styled.h2`
  font-size: 18px;
  margin: 0px;
  margin-right: 10px;
  align-self: center;
  color: #ffffff;
`;

const Footer = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: 10px;
  opacity: 0.4;
`;

export const getStaticProps: GetStaticProps = async function (context) {
  const leaderboard = await getTopGmers();

  return {
    props: {
      leaderboard,
    },
    revalidate: 60,
  };
};
