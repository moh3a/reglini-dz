/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useCallback, useState } from "react";

import axios from "axios";

const PublicProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState<any>();
  const [blogs, setBlogs] = useState<any>();

  const fetchUser = useCallback(async () => {
    if (username) {
      const { data } = await axios.post("/api/user/get", { name: username });
      if (data.success) {
        setProfile(data.data.user);
        setBlogs(data.data.blogs);
      }
    } else {
      router.replace("/");
    }
  }, [router, username]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Head>
        <title>
          {profile ? `${profile.name}'s profile | ` : ``}
          reglini-dz
        </title>
        <meta name="description" content="reglini-dz user's profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {profile && (
        <div className="mx-3 my-5 md:mx-10">
          <div
            className={`border border-gray-100 rounded-lg p-2 mb-5 flex items-center ${
              router.locale === "ar" && "flex-row-reverse"
            } shadow-lg`}
          >
            <Avatar size="md" picture={profile.picture} />
            <h1 className="text-xl mx-4">{profile.name}</h1>
          </div>
          <div>Email Address: {profile.email}</div>
          <div>User role: {profile.role}</div>
          {profile.blogs.length > 0 && (
            <h2 className="text-lg font-semibold mt-4">User&apos;s blogs</h2>
          )}

          {blogs &&
            blogs.map((blog: any) => (
              <div
                key={blog._id}
                className="border border-black rounded-lg mx-1 my-3 p-1"
              >
                <h1 className="text-lg font-semibold">{blog.title}</h1>
                <p className="h-6 overflow-hidden">{blog.text}</p>
                <div>
                  {blog.votes} votes | {blog.commentsCounter} comments
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
import Avatar from "../../components/elements/Avatar";
PublicProfile.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default PublicProfile;
