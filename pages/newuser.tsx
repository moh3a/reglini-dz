const NewUser = () => {
  return (
    <div>
      <p>Welcome</p>
    </div>
  );
};

import Layout from "../components/layout/Layout";
NewUser.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default NewUser;
