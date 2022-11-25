import { createClient } from "supabase";
import "dotenv/load.ts"

export interface Post {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
}

const client = createClient(
  Deno.env.get('DB_TWO_URL')!,
  Deno.env.get('DB_TWO_ANON')!
);

export const findAllPosts = async () => {
  //データベースにある投稿を全て取得
  console.log("findAllPosts Start!");
  const { data, error } = await client.from('posts').select();
  console.log(data);
  console.log(error);
  return data;
}


export const createPost = async(p: Post) => {
  const { data, err } = await client.from('posts').select();
  console.log("data: ", data);
  console.log("err: ", err);
  const id = data.length;
  const { error } = await client.from('posts')
                                .insert({id: id,
                                        user_id: p.user_id,
                                        message: p.message,
                                        created_at: p.created_at});
  console.log(error);
}
