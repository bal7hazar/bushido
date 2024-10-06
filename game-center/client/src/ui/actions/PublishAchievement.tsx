import { Button } from "@/ui/elements/button";
import { Rocket } from "lucide-react";

export const PublishAchievement = () => {
  return (
    <Button variant="outline" size="icon" disabled={true}>
      <Rocket />
    </Button>
  );
};