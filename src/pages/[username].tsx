import Head from "next/head";
import { useRouter } from "next/router";

import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Post, User } from "../types/Gateway";
import { getUser } from "../utils/api";
import { timeSince } from "../utils/time";

export default function Userpage({
  user,
}: {
  user: User & { last_post: Post };
}) {
  return (
    <>
      <Head>
        <title>@{user ? user.username : ""} • dstn.to</title>
        <link rel="icon" href="/favicon.ico" />

        {!!user && (
          <>
            <meta name="description" content="" />

            <meta
              property="og:url"
              content={`https://gm.dstn.to/${user.username}`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`@${user.username} on gm`} />
            <meta
              property="og:description"
              content={`Rank: ${user.rank.toLocaleString()} - Score: ${user.score.toLocaleString()}`}
            />
            <meta property="og:image" content={user.avatar} />

            <meta name="twitter:card" content="summary" />
            <meta property="twitter:domain" content="gm.dstn.to" />
            <meta
              property="twitter:url"
              content={`https://gm.dstn.to/${user.username}`}
            />
            <meta name="twitter:title" content={`@${user.username} on gm`} />
            <meta
              name="twitter:description"
              content={`Rank: ${user.rank.toLocaleString()} - Score: ${user.score.toLocaleString()}`}
            />
            <meta name="twitter:image" content={user.avatar} />
          </>
        )}
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
        {user && (
          <Content>
            <Heading>
              <Link href="/">gm</Link>
            </Heading>
            <ProfileContainer>
              <ProfileEntry>
                <UserAvatar src={user.avatar} />
                <Extra>
                  <Names>
                    <Name>{user.name}</Name>
                    <Username>@{user.username}</Username>
                  </Names>
                  {!!user.bio && <ProfileBio>{user.bio}</ProfileBio>}
                  <Bottom>
                    <Score>Rank: {user.rank.toLocaleString()}</Score>
                    <Score>Score: {user.score.toLocaleString()}</Score>
                    {!!user.last_post && (
                      <LastSaidGM>
                        Last GM:{" "}
                        {timeSince(new Date(user.last_post.creation_time))} ago
                      </LastSaidGM>
                    )}
                    {!user.last_post && (
                      <LastSaidGM>Last GM: Not seen recently</LastSaidGM>
                    )}
                  </Bottom>
                </Extra>
              </ProfileEntry>
            </ProfileContainer>
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
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  justify-content: center;
  align-items: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Heading = styled.h1`
  font-family: Karla, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin: 10px;
`;

const LastSaidGM = styled.h3`
  font-family: Karla, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin: 0px;
  margin-left: 0px;
  color: #ffffff;
`;

const ProfileContainer = styled.div`
  background-color: #38383880;
  min-width: 100%;
  max-width: 700px;
  border-radius: 10px;

  padding: 20px;
`;

const Extra = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: space-between;
`;

const ProfileEntry = styled.div`
  display: flex;
  flex-direction: row;
`;

const Bottom = styled.div`
  justify-content: end;
`;

const Names = styled.div`
  flex-direction: column;
`;

const ProfileBio = styled.p`
  color: #ffffff;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const UserAvatar = styled.img`
  border-radius: 10px;
  width: 196px;
  height: 196px;
  object-fit: cover;
`;

const Name = styled.h2`
  font-size: 25px;
  margin: 0px;
  color: #ffffff;
`;

const Username = styled.h2`
  font-size: 16px;
  margin: 0px;
  color: #ffffff;
`;

const Score = styled.h3`
  font-size: 14px;
  margin: 0px;
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
  const { username } = context.query;
  const user = await getUser(username);

  return {
    props: {
      user,
    },
  };
}
