"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ReactNode } from "react";

type DropDownMenuProps = {
  triggerLabel: string;
  dropdownMenuItemList: {
    key: string;
    nodeDom: ReactNode;
  }[];
};

export default function DropDownMenu(props: DropDownMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="px-2 py-1 border rounded-md">
          {props.triggerLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.dropdownMenuItemList.map((item) => (
            <DropdownMenuItem asChild key={item.key}>
              {item.nodeDom}
            </DropdownMenuItem>
          ))}
          {/* </DropdownMenuContent>
              className="cursor-pointer"
            >
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 cursor-pointer"
            onSelect={() => {
              setIsDropdownOpen(false);
              setShowDeleteDialog(true);
            }}
          >
            削除
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
