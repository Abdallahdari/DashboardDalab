import { supabase } from "../../app/_lib/supabase";
export async function GetallUsers() {
  let { data, error } = await supabase.from("User").select("*");
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
export async function GetBlogs() {
  let { data, error } = await supabase.from("Blogs").select("*");
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
export async function AllProduct() {
  let { data, error } = await supabase.from("Product").select("*");
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
