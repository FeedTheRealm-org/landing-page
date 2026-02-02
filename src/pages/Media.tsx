import { useState, useEffect } from 'react';
import yaml from 'js-yaml';

function Media() {
  const [videos, setVideos] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const videoModule = await import('/data/media-page/videos.yaml?raw');
      const data = yaml.load(videoModule.default) as { links: string[] };
      setVideos(data.links);
    };

    const loadImages = async () => {
      const imageModules = import.meta.glob('/data/media-page/imgs/*', { query: '?url', import: 'default' });
      const imageList: string[] = [];
      for (const path in imageModules) {
        const url = await imageModules[path]() as string;
        imageList.push(url);
      }
      setImages(imageList);
    };

    loadVideos();
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">Media</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="aspect-video">
              <iframe src={`https://www.youtube.com/embed/${video.split('v=')[1]}`} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
            </div>
          ))}
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Media ${index}`} className="w-full h-auto" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Media;