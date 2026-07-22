import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function Home() {
  const me = await getMe();

  return (
    <div>
      <h1>Hello NextJS</h1>
      <Button className="cursor-pointer">Click Here</Button>
    </div>
  );
}
