import Event from '../models/Event.js';
//Create Event
export const createEvent=async(req,res)=>{
    try{
        const {title,description,date,location}=req.body;
        if(!title || !description || !date || !location){
            return res.status(400).json({
                message:'All fields are required'
            });
        }
    const newEvent=new Event({title,description,date,location});
    await newEvent.save();
    res.status(201).json(newEvent);
    }catch(error){
        res.status(500).json({
            message:'Error creating event',error
        })
    }
}
// Get All Events
export const getEvents=async(req,res)=>{
    try{
        const events=await Event.find();
        res.status(200).json(events);
    }catch(error){
        res.status(500).json({
            message:'Error fetching events',error
        });
    }
}
// ✅ Delete an Event (Only Admins)
export const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  //Get upcoming events (Future Events)
  export const getUpcomingEvents=async(req,res)=>{
    try{
        const {category,eventType}=req.query;
        const query={
            data:{$gt:new Date()},//event in futer
        };
        if(category) query.category=category;
        if(eventType) query.eventType=eventType;
        const events=await Event.find(query).sort({date:1});
        res.json(events);
    }catch(error){
        res.status(500).json({message:"Server Error",error});
    }
  };
  //Get past Events
  export const getPastEvents=async(req,res)=>{
    try{
        const {category,eventType}=req.query;
        const query={
            date:{$lt:new Date()},//past events
        }
        if(category) query.category=category;
        if(eventType) query.eventType=eventType;
        const events=await Event.find(query).sort({date:-1});
        res.json(events);
    }catch(error){
        res.status(500).json({message:'Server error',error});
    }
};