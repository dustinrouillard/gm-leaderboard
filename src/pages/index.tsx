import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { User } from "../types/Gateway";
import { getTopGmers } from "../utils/api";

export default function Home({ leaderboard }: { leaderboard: User[] }) {
  return (
    <>
      <Head>
        <title>gm • dstn.to</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AlertBanner red>
        <AlertText>gm is now offline, this site is read-only archived</AlertText>
      </AlertBanner>
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
              <HeadingLink>unofficial public</HeadingLink>
            </Link>
            <Link href="/official" passHref>
              <HeadingLink inactive>official</HeadingLink>
            </Link>
            <Link href="/last" passHref>
              <HeadingLink inactive>final goodnights</HeadingLink>
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

const AlertBanner = styled.div<{ blue?: boolean; red?: boolean }>`
  position: absolute;
  width: 100%;

  background-color: ${({blue, red}) => blue ? '#2d8fff' : red ? 'red' : 'green'};
  color: #ffffff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertText = styled.p`
  color: #ffffff;
  margin: 0;
  text-align: center;
  font-weight: bold;
  flex: 1;
`;

const AlertClose = styled.p`
  color: #ffffff;
  margin: 5px;
  font-weight: bold;
  cursor: pointer;
  opacity: .75;
`;

export const getStaticProps: GetStaticProps = async function (context) {
  const leaderboard = await getTopGmers();

  return {
    props: {
      leaderboard,
    },
  };
};