import getConversations from "../actions/getConversations";
import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const conversations = await getConversations();
  const currentUser = await getCurrentUser();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList
          items={users}
          conversations={conversations}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </Sidebar>
  );
}
