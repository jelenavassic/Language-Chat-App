import MyChats from "./MyChats";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="flex-column">
          <h4>My Chats</h4>
          <MyChats></MyChats>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
