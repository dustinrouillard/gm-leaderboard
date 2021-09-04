import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";

import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";

import { PostWithCreator } from "../types/Gateway";
import { getRecentGmers } from "../utils/api";
import { timeSince } from "../utils/time";

export default function Home({ recent: recents}: { recent: PostWithCreator[] }) {

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
          <Heading>gm • final ten posts</Heading>
          <HeadingNav>
            <Link href="/" passHref>
              <HeadingLink inactive>unofficial public</HeadingLink>
            </Link>
            <Link href="/official" passHref>
              <HeadingLink inactive>official</HeadingLink>
            </Link>
            <Link href="/last" passHref>
              <HeadingLink>final goodnights</HeadingLink>
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
                      <GMMessage>{lb.text}</GMMessage>
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
  max-height: 628px;
  overflow: scroll;
  scroll-behavior: smooth;

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

export const getStaticProps: GetStaticProps = async function (context) {
  const recent = await getRecentGmers();

  return {
    props: { recent },
  };
};