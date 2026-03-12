import { MountainsClient } from "@/components/mountains/MountainsClient";
import { MountainsLayout } from "@/components/mountains/MountainsLayout";
import { getAllMountains } from "@/lib/mountains";

export const metadata = {
  title: "山头图鉴 | 普洱茶志",
  description:
    "每座山头都有独特的风味密码。探索云南普洱茶各大名山的风土、口感与特色。",
};

export default function MountainsPage() {
  const mountains = getAllMountains();

  return (
    <MountainsLayout>
      <MountainsClient mountains={mountains} />
    </MountainsLayout>
  );
}
