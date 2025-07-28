import StatsCards from "../_components/cards/cards";
import UserTable from "../_components/table/table";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <StatsCards />
      <UserTable users={users} />
    </>
  );
}
