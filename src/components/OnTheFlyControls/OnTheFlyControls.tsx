import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";


export default function OnTheFlyControls() {
  return <div className="buttons-container">
    <button className="place-content-center grid round button primary-button"><GrAdd /></button>
    <button className="place-content-center grid round button primary-button"><GrSubtract /></button>
  </div>;
}
