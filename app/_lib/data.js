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

export async function getUserOrders() {
  try {
    const { data, error } = await supabase.from("Orders-Main").select(`
  id,
  UserId,
  User:UserId (
    id,
    email,
    name
  ),
  OrderItems (
    id,
    quatitiy,
    ProductID,
    Product:ProductID (
      id,
      name,
      price,
      image
    )
  )
`);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders: " + error.message);
  }
}
