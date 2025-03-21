import { useEffect, useState } from "react";
import { getEventRSVPs } from "../api/rsvpApi";
import RSVPButton from "../components/RSVPButton";

interface Attendee {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  status: "going" | "not going" | "maybe";
}

const EventDetails = ({ eventId }: { eventId: string }) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    // ✅ Define an async function inside useEffect
    const fetchRSVPs = async () => {
      try {
        const data: Attendee[] = await getEventRSVPs(eventId);
        setAttendees(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchRSVPs(); // ✅ Call the async function
  }, [eventId]); // ✅ Dependency array includes eventId

  return (
    <div>
      <h2>Event Details</h2>
      <RSVPButton eventId={eventId} onRSVPChange={() => getEventRSVPs(eventId)} />
      <h3>Attendees</h3>
      <ul>
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <li key={attendee.user._id}>
              {attendee.user.name} - {attendee.status}
            </li>
          ))
        ) : (
          <p>No attendees yet.</p>
        )}
      </ul>
    </div>
  );
};

export default EventDetails;
