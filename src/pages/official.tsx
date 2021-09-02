import Head from "next/head";
import Link from "next/link";

import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { OfficialUser } from "../types/Gateway";
import { getOfficialTopGmers, getTopGmers } from "../utils/api";
import { useEffect, useState } from "react";
import { gateway } from "../utils/gateway";
import { GetStaticProps } from "next";

export default function Home({ leaderboard: lb }: { leaderboard: OfficialUser[] }) {
  const [leaderboard, setLeaderboard] = useState<OfficialUser[]>(lb);

  async function updateLb(new_users: OfficialUser[]) {
    setLeaderboard(new_users);
  }

  useEffect(() => {
    gateway.addListener("official_leaderboard", updateLb);

    return () => {
      gateway.removeListener("official_leaderboard", updateLb);
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
          <Heading>gm • top fifty</Heading>
          <HeadingNav>
            <Link href="/" passHref>
              <HeadingLink inactive>unofficial</HeadingLink>
            </Link>
            <Link href="/official" passHref>
              <HeadingLink>official</HeadingLink>
            </Link>
            <Link href="/recents" passHref>
              <HeadingLink inactive>recents</HeadingLink>
            </Link>
          </HeadingNav>
          <LeaderboardContainer>
            {leaderboard &&
              leaderboard.map((lb, index) => (
                <Link href={lb.username} key={lb.uid}>
                  <LeaderboardEntry>
                    <Number>#{index + 1}</Number>
                    <UserAvatar src={lb.avatarUrl} />
                    <Names>
                      <Name>{lb.name}</Name>
                      <Username>@{lb.username}</Username>
                    </Names>
                    <Score>{lb.gmScore.toLocaleString()}</Score>
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
  max-height: 628px;
  overflow: scroll;
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

export async function getServerSideProps(context: any) {
  const leaderboard = await getOfficialTopGmers();

  return {
    props: { leaderboard }
  };
};
