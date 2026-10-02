import { Composition } from "remotion";
import { MorningMenu, MORNING_MENU_DURATION } from "./MorningMenu";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MorningMenu"
      component={MorningMenu}
      durationInFrames={MORNING_MENU_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
