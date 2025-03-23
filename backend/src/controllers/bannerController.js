// import Banner from '../models/bannerModel.js';
// //Get current Banner
// export const getBanner =async(req,res)=>{
//     try{
//         const banner=await Banner.findOne();
//         res.json(banner);
//     }catch(error){
//         res.status(500).json({
//             message:'Error fetching banner'
//         });
//     }
// };
// //Update Banner (Only Admin)
// export const updateBanner=async(req,res)=>{
//     try{
//         const {title,subtitle,imageUrl}=req.body;
//         let banner=await Banner.findOne();
//         if(banner){
//             banner.title=title;
//             banner.subtitle=subtitle;
//             banner.imageUrl=imageUrl;
//         }
//         else{
//             banner=new Banner({title,subtitle,imageUrl});
//         }
//         await banner.save();
//     }catch(error){
//         res.status(500).json({
//             message:'Error Updating Banner'
//         })
//     }
// }
export const getBanner = (req, res) => {
    try {
      const bannerData = {
        title: "Welcome to Event Management",
        description: "Find and manage your events effortlessly!",
        image: "/uploads/banner.jpg", // Example banner image
      };
      res.status(200).json(bannerData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching banner" });
    }
  };
  
  export const updateBanner = (req, res) => {
    try {
      // Example: Expecting title, description, image from frontend
      const { title, description, image } = req.body;
  
      // Here, you'd update the database (not implemented in this example)
      console.log("Banner Updated:", { title, description, image });
  
      res.status(200).json({ message: "Banner updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating banner" });
    }
  };
  