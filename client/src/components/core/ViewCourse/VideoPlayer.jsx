import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const VideoPlayer = ({ videoUrl, onEnded }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const playerRef = useRef(null);

    return (
        <div className="relative w-full h-full bg-black">
            <div className="player-wrapper">
                <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    volume={volume}
                    onEnded={onEnded}
                    onProgress={({ played }) => setPlayed(played)}
                    className="react-player"
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                onContextMenu: e => e.preventDefault()
                            }
                        }
                    }}
                />
            </div>

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Play/Pause Button */}
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-yellow-50 text-2xl"
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    
                    {/* Progress Bar */}
                    <div className="flex-1">
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={played}
                            onChange={e => {
                                const time = parseFloat(e.target.value);
                                setPlayed(time);
                                playerRef.current?.seekTo(time);
                            }}
                            className="w-full cursor-pointer accent-yellow-50"
                        />
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
                            className="text-white hover:text-yellow-50 text-xl"
                        >
                            {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={volume}
                            onChange={e => setVolume(parseFloat(e.target.value))}
                            className="w-20 cursor-pointer accent-yellow-50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
