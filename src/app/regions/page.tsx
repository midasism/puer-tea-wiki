import regionsData from "@/data/regions.json";
import { RegionsClient } from "@/components/regions/RegionsClient";
import { RegionsLayout } from "@/components/regions/RegionsLayout";

export const metadata = {
  title: "产区地图 | 普洱茶志",
  description:
    "四大产区，百座茶山的风土密码。探索云南普洱茶的西双版纳、临沧、普洱、保山四大产区。",
};

export default function RegionsPage() {
  return (
    <RegionsLayout>
      <RegionsClient regions={regionsData} />
    </RegionsLayout>
  );
}
