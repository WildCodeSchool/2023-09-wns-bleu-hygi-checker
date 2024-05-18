import Layout from "@/components/dashboard/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/settings/Account";
import Profile from "@/components/settings/Profile";
import Appearance from "@/components/settings/Appearance";

export default function Settings() {
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
            <Account />
          </TabsContent>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="appearance">
            <Appearance />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
