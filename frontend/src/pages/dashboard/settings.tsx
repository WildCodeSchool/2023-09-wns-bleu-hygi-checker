import Layout from "@/components/dashboard/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/settings/Account";
import Profile from "@/components/settings/Profile";
import Appearance from "@/components/settings/Appearance";
import { useGetUserProfileQuery } from "@/types/graphql";
import Loading from "@/components/Loading";

export default function Settings() {
  const { data, loading } = useGetUserProfileQuery();
  const user = data?.getUserProfile;

  return (
    <Layout title="Settings">
      {loading ? (
        <Loading />
      ) : !user ? (
        <p className="text-center text-white">User profile not found</p>
      ) : (
        <>
          {/* ---DESKTOP--- */}
          <div className="hidden xl:flex items-center justify-center h-full">
            <div className="flex bg-white rounded-md">
              <Account data={user} />
              <Profile data={user} />
              <Appearance data={user} />
            </div>
          </div>

          {/* ---MOBILE--- */}
          <div className="flex justify-center xl:hidden">
            <Tabs defaultValue="account">
              <TabsList className="flex gap-2 justify-center">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
        </>
      )}
    </Layout>
  );
}
