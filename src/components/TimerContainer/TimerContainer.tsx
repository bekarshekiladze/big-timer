import { OnTheFlyControls } from "../InputControls";
import { PlayerControls } from "../PlayerControls";
import { Wrapper } from "../Wrapper";

export default function CountdownContainer() {
  return (
    <div className="countdown-container center">
      <PlayerControls />
      <Wrapper />
      <OnTheFlyControls />
    </div>
  );
}
