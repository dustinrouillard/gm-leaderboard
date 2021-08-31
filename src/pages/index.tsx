import Head from "next/head";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Post, User } from "../types/Gateway";
import { getTopGmers } from "../utils/api";
import { gateway } from "../utils/gateway";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<User[]>();

  async function getLb() {
    const lb = await getTopGmers();
    setLeaderboard(lb);
  }

  async function newPost(data: { user: User; post: Post }) {
    toast(`${data.user.name} said ${data.post.type.toLowerCase()}`);
  }

  async function updateLb(new_users: User[]) {
    setLeaderboard(new_users);
  }

  useEffect(() => {
    getLb();

    gateway.addListener("leaderboard", updateLb);
    gateway.addListener("post", newPost);

    () => {
      gateway.removeListener("leaderboard", updateLb);
      gateway.removeListener("post", newPost);
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
          <Heading>gm leaderboard</Heading>
          <LeaderboardContainer>
            {leaderboard &&
              leaderboard.map((lb, index) => (
                <>
                  <LeaderboardEntry>
                    <Number>#{index + 1}</Number>
                    <UserAvatar src={lb.avatar} />
                    <Names>
                      <Name>{lb.name}</Name>
                      <Username>{lb.username}</Username>
                    </Names>
                    <Score>{lb.score.toLocaleString()}</Score>
                  </LeaderboardEntry>
                  {index != leaderboard.length - 1 && <MarginBottom />}
                </>
              ))}
          </LeaderboardContainer>
          <Footer href="https://dstn.to">dstn.to</Footer>
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
  justify-content: center;
  align-items: center;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-family: Karla, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin: 10px;
`;

const LeaderboardContainer = styled.div`
  background-color: #38383880;
  width: 700px;
  border-radius: 10px;

  padding: 20px;
`;

const LeaderboardEntry = styled.div`
  display: flex;
  flex-direction: row;
`;

const Names = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
`;

const MarginBottom = styled.div`
  margin-bottom: 12px;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
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

const Footer = styled.a`
  font-size: 14px;
  font-weight: bold;
  margin: 10px;
  opacity: 0.4;
`;
