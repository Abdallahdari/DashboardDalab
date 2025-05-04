"use server";
import { supabase } from "@/app/_lib/supabase";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
export async function Signin(formData) {
  await signIn("credentials", formData);
}

export async function Signout() {
  // Insert the new user into the database
  await signOut();
}
export async function DeleteUSer(id) {
  const { error } = await supabase.from("User").delete().eq("id", id);

  if (error) {
    console.error("Error deleting:", error.message);
  } else {
    console.log("Deleted successfully");
  }
}

export async function DeleteBlogs(id) {
  const { error } = await supabase.from("Blogs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting:", error.message);
  } else {
    console.log("Deleted successfully");
  }
}

export async function DeleteProduct(id) {
  const { error } = await supabase.from("Product").delete().eq("id", id);

  if (error) {
    console.error("Error deleting:", error.message);
  } else {
    console.log("Deleted successfully");
  }
}
export async function CreateProduct(formData) {
  const name = formData.get("name");
  const imageUrl = formData.get("imageUrl");
  const price = formData.get("price");
  const oldPrice = formData.get("oldPrice");
  const discount = formData.get("discount");
  const quantity = formData.get("quantity");
  const rating = formData.get("rating");
  const sizes = formData.get("sizes");
  const description = formData.get("description");

  console.log(formData);
  const { data, error } = await supabase
    .from("Product")
    .insert([
      {
        name: name,
        image: imageUrl,
        description: description,
        price: price,
        Discount: discount,
        Stars: rating,
        OldPrice: oldPrice,
        size: sizes,
        Quantity: quantity,
      },
    ])
    .select();
  if (error) {
    console.error("Error deleting:", error.message);
  } else {
    console.log("Created new Product sucessfully");
  }
  return data;
}

export async function Createblog(formData) {
  const session = await auth();
  const title = formData.get("title");
  const authorAvatar = formData.get("authorAvatar");
  const featuredImage = formData.get("featuredImage");
  const content = formData.get("content");
  const smallDesr = formData.get("smallDesr");
  const publishDate = formData.get("publishDate");
  console.log(formData);
  const { data, error } = await supabase
    .from("Blogs")
    .insert([
      {
        image: featuredImage,
        topic: title,
        autherImage: authorAvatar,
        description: content,
        Smlldescription: smallDesr,
        Date: publishDate,
        aouther: session?.user.email.split("@")[0],
      },
    ])
    .select();

  if (error) {
    console.error("Error deleting:", error.message);
  } else {
    console.log("Created sucessfully");
  }
  return data;
}
