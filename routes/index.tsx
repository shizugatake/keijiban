import { Post, findAllPosts, createPost } from "@db";
import { BanWords, hasBanWords } from "@ban";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import dayjs from "https://deno.land/x/deno_dayjs@v0.2.2/mod.ts"


export const handler: Handlers<Post[]> = {
  async GET(_, ctx) {
    const posts= await findAllPosts();
    console.log(posts);
    return ctx.render(posts);//推測：ここでページのどこを更新するのかを指定している
  },
  async POST(req, ctx) {
    const date = dayjs().format("YYYYMMDDTHH:mm:ss");
    const formData = await req.formData();
    const message = formData.get("message");
    console.log("mes:", message);
    if(!message){
      const err_post: Post[] = [{
        message: "messageが空です",
        id: "0",
        user_id: "0",
        created_at: date,
      }];
      return ctx.render(err_post);
    }
    const censored = hasBanWords(message);
    const new_post: Post = {
      id: "0",
      message: censored,
      user_id: "0",
      created_at: date,
    };
    await createPost(new_post);
    return new Response("", {
      status: 303,
      headers: {
        Location: "/"
      },
    });
  },
};

export default function Home({ data }: PageProps<Post[]>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div >
        <h1 >Tubuyaitaaaaaaa</h1>
        <section >
          <h2 >Posts</h2>
          <div >
            <h3>Create Post</h3>
            <form  method="POST">
              <div>
                <textarea

                name="message"
                id="message"
                cols="10"
                rows="5"></textarea>
              </div>
            <button

            type="submit"
            >Post!</button>
            </form>
          </div>
          <ul >
            {data.map((post) => (
              <li

                key={post.id}
              >
                <p

                >
                  {post.message}
                </p>
                <time

                  dateTime={post.created_at}
                >
                  {post.created_at}
                </time>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
