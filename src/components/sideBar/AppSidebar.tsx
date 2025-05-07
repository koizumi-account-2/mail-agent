import { Sidebar } from "@/components/ui/sidebar";
import { CustomSideBarHeader } from "@/components/sideBar/CustomSideBarHeader";
import { CustomSideBarContent } from "@/components/sideBar/CustomSideBarContent";
import { CustomSideBarFooter } from "@/components/sideBar/CustomSideBarFooter";
import SessionUserInfoProvider from "@/app/context/SessionUserInfoProvider";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="offcanvas">
      <CustomSideBarHeader />
      <CustomSideBarContent />
      <SessionUserInfoProvider>
        <CustomSideBarFooter />
      </SessionUserInfoProvider>
    </Sidebar>
  );
}
