"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Play, Image as ImageIcon, Video as VideoIcon, Radio, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { getMedia } from '@/lib/actions';
import { Photo, Video, Livestream } from '@/lib/types';

export default function MediaPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [livestreams, setLivestreams] = useState<Livestream[]>([]);
  
  // Lightbox state
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const media = await getMedia();
      setPhotos(media.photos);
      setVideos(media.videos);
      setLivestreams(media.livestreams);
    };
    fetchMedia();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-black tracking-tight mb-4">
            Media <span className="text-primary">Center</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            Relive our powerful moments, watch transformative messages, and join us live from anywhere in the world.
          </p>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-12 bg-white border border-border-gray p-1 rounded-full h-14 shadow-sm">
            <TabsTrigger value="photos" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
              <ImageIcon className="w-4 h-4 mr-2" /> Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
              <VideoIcon className="w-4 h-4 mr-2" /> Videos
            </TabsTrigger>
            <TabsTrigger value="livestreams" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
              <Radio className="w-4 h-4 mr-2" /> Live
            </TabsTrigger>
          </TabsList>

          {/* PHOTOS TAB */}
          <TabsContent value="photos" className="focus-visible:outline-none">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/80 block mb-1">{photo.category}</span>
                      <h4 className="text-white font-playfair font-bold text-xl">{photo.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* VIDEOS TAB */}
          <TabsContent value="videos" className="focus-visible:outline-none">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border-gray">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-3">{video.category}</span>
                    <h3 className="text-xl font-playfair font-bold text-black mb-6 line-clamp-2">{video.title}</h3>
                    
                    <Button asChild className="w-full rounded-full bg-primary hover:bg-[#111111] text-white transition-colors h-12 shadow-sm font-bold">
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        Watch Sermon
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* LIVESTREAMS TAB */}
          <TabsContent value="livestreams" className="focus-visible:outline-none">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {livestreams.map((live) => (
                <div key={live.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border-gray">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={live.thumbnail} alt={live.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-md">
                      <span className="w-2 h-2 bg-white rounded-full"></span> Live Now
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">{new Date(live.date).toLocaleDateString()}</span>
                    <h3 className="text-xl font-playfair font-bold text-black mb-6">{live.title}</h3>
                    
                    <Button asChild className="w-full rounded-full bg-primary hover:bg-[#111111] text-white transition-colors h-12 shadow-sm font-bold">
                      <a href={live.url} target="_blank" rel="noopener noreferrer">
                        Watch Live
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={selectedPhoto.url} 
            alt={selectedPhoto.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-8 left-8">
            <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-1">{selectedPhoto.category}</span>
            <h4 className="text-white font-playfair font-bold text-2xl">{selectedPhoto.title}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
