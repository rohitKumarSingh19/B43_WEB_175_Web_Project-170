import { Button, ButtonGroup } from "@mui/material";
import { submitRSVP } from "../api/rsvpApi";

interface RSVPProps {
  eventId: string;
  onRSVPChange: () => void;
}

const RSVPButton = ({ eventId, onRSVPChange }: RSVPProps) => {
  const handleRSVP = async (status: "going" | "not going" | "maybe") => {
    try {
      await submitRSVP(eventId, status);
      onRSVPChange();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ButtonGroup variant="contained">
      <Button onClick={() => handleRSVP("going")}>Going</Button>
      <Button onClick={() => handleRSVP("maybe")}>Maybe</Button>
      <Button onClick={() => handleRSVP("not going")}>Not Going</Button>
    </ButtonGroup>
  );
};

export default RSVPButton;
