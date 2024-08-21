const Dashboard = ({ user }) => {
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Here's a complete list of restaurants, including their details and the specifics of each one's menu. , you can view all the restaurant through the navigation , or create your own restaurants and view them throguh your profile .
      </p>
    </main>
  );
};

export default Dashboard;
//