import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { YOUTUBE_VIDEOS_API } from "../utils/contants";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      setVideos(json?.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]); 
    }
  };

  return (
    <div className="flex flex-wrap">
      {videos?.length > 0 && <AdVideoCard info={videos[0]} />}

      {videos?.map((video) => (
        <Link key={video?.id?.videoId || video?.id} to={"/watch?v=" + (video?.id?.videoId || video?.id)}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;