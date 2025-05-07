import { CustomeCard } from "@/components/common/CustomeCard";
import { ProjectDTO } from "../../types";
import DropDownMenu from "@/components/common/DropDownMenu";
import Link from "next/link";
type Props = {
  project: ProjectDTO;
};

export const ProjectSammaryPresentation = ({ project }: Props) => {
  const dropdownMenuItemList = [
    {
      key: "edit",
      nodeDom: <Link href={`/project/${project.id}`}>編集</Link>,
    },
    {
      key: "delete",
      nodeDom: <div>削除</div>,
    },
  ];
  return (
    <CustomeCard title="" description="">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-bold">{project.name}</div>
          <div className="text-sm text-gray-500">{project.description}</div>
        </div>
        <div>
          <DropDownMenu
            triggerLabel="編集"
            dropdownMenuItemList={dropdownMenuItemList}
          />
        </div>
      </div>
    </CustomeCard>
  );
};
