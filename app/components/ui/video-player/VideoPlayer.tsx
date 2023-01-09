import {FC} from 'react';
import {IVideoPlayer} from "@/ui/video-player/video.interface";
import {useVideo} from "@/ui/video-player/useVideo";
import {useAuth} from "@/hooks/useAuth";
import cn from "classnames";

import styles from './VideoPlayer.module.scss';
import {AuthPlaceholder} from "@/ui/video-player/AuthPlaceholder/AuthPlaceholder";
import {MaterialIcon} from "@/ui/MaterialIcon";

interface IVideoPlayerProps {
}

const VideoPlayer: FC<IVideoPlayer> = ({videoSource, slug}) => {

  const {video, videoRef, actions} = useVideo()

  const {user} = useAuth()
  return (
    <div className={cn(styles.wrapper, {'h-96': !user})}>
      {user
        ? <>
          <video src={`${videoSource}#t=8`}
                 ref={videoRef}
                 className={styles.video}
                 preload='metadata'
          />
          <div className={styles.progressBarContainer}>
            <div style={{width: `${video.progress}%`}}
                 className={styles.progressBar}
            />
          </div>

          <div className={styles.controls}>
            <div>
              <button onClick={actions.revert}>
                <MaterialIcon name={"MdHistory"} />
              </button>
              <button onClick={actions.toggleVideo}>
                <MaterialIcon name={video.isPlaying ? "MdPause" : 'MdPlayArrow'} />
              </button>
              <button onClick={actions.forward}>
                <MaterialIcon name={"MdUpdate"} />
              </button>

              <div className={styles.timeControls}>
                <p className={styles.controlsTime}>
                  {Math.floor(video.currentTime / 60) +
                    ':' +
                    ('0' + Math.floor(video.currentTime % 60)).slice(-2)}
                </p>
                <p> / </p>
                <p className={styles.controlsTime}>
                  {Math.floor(video.videoTime / 60) +
                    ':' +
                    ('0' + Math.floor(video.videoTime % 60)).slice(-2)}
                </p>
              </div>
            </div>
            <div>
              <button onClick={actions.fullScreen}>
                <MaterialIcon name={"MdFullscreen"} />
              </button>
            </div>
          </div>
        </>
        : <AuthPlaceholder slug={slug}/>
      }
    </div>
  );
};


// If you wanna add change quality buttons
//kmoskwiak.github.io/videojs-resolution-switcher/
//https://stackoverflow.com/questions/38626993/change-video-quality-with-sources-pointing-to-different-quality-versions


export default VideoPlayer