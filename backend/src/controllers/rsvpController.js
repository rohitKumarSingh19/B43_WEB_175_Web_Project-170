import Event from "../models/Event.js";

// ✅ Handle RSVP for an Event
export const rsvpEvent = async (req, res) => {
  const { eventId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ✅ Check if user already RSVPed
    const existingRSVP = event.attendees.find((attendee) => attendee.user.toString() === userId);

    if (existingRSVP) {
      existingRSVP.status = status; // Update RSVP status
    } else {
      event.attendees.push({ user: userId, status });
    }

    await event.save();
    res.json({ message: "RSVP updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get RSVP Stats
export const getEventRSVPs = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId).populate("attendees.user", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event.attendees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
