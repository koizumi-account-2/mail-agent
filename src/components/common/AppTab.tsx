import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TabItem = {
  title: string;
  value: string;
  isDisabled?: boolean;
  content: () => React.ReactNode;
};

interface AppTabProps {
  defaultTab: string;
  items: TabItem[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const AppTab = ({
  defaultTab,
  items,
  selectedTab,
  setSelectedTab,
}: AppTabProps) => {
  return (
    <Tabs
      defaultValue={defaultTab}
      className="w-full"
      onValueChange={setSelectedTab}
      value={selectedTab}
    >
      <TabsList>
        {items.map((item) => (
          <TabsTrigger
            value={item.value}
            className="cursor-pointer"
            key={item.title}
            disabled={item.isDisabled}
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent value={item.value} key={item.title}>
          {item.content()}
        </TabsContent>
      ))}
    </Tabs>
  );
};
