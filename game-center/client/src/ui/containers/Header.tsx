import { ModeToggle } from "@/ui/components/Theme";
import logo from "/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Connection } from "../components/Connection";

export const Header = () => {
  const navigate = useNavigate();

  const setGameQueryParam = useCallback(
    () => navigate("", { replace: true }),
    [navigate],
  );

  return (
    <div className="w-full flex justify-between items-center px-8 py-2">
      <div className="flex gap-4 items-center">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={setGameQueryParam}
        >
          <img src={logo} alt="Game-Center" className="h-12" />
          <p className="text-4xl font-bold">Bushido</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Connection />
        <ModeToggle />
      </div>
    </div>
  );
};
