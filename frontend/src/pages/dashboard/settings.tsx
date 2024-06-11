import Layout from "@/components/dashboard/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/settings/Account";
import Profile from "@/components/settings/Profile";
import Appearance from "@/components/settings/Appearance";
import { useGetUserProfileQuery } from "@/types/graphql";

export default function Settings() {
  const { data, loading } = useGetUserProfileQuery();
  const user = data?.getUserProfile;

  if (loading) {
    return <p>loading ...</p>; // TODO : add some style to loading page
  }

  if (!user) {
    return <p>User profile not found</p>; // TODO : add some style to error page
  }

  return (
    <Layout title="Settings">
      <div className="flex flex-col text-center gap-8 items-center text-white">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account" className="md:mx-6">
              Account
            </TabsTrigger>
            <TabsTrigger value="profile" className="md:mx-6">
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="md:mx-6">
              Appearance
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Account data={user} />
          </TabsContent>
          <TabsContent value="profile">
            <Profile data={user} />
          </TabsContent>
          <TabsContent value="appearance">
            <Appearance data={user} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
