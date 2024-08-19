const Dashboard = ({ user }) => {
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Here's a complete list of restaurants, including their details and the specifics of each one's menu.
      </p>
    </main>
  );
};

export default Dashboard;
//