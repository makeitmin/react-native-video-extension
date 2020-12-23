import React from 'react';
import { View, ViewProps } from 'react-native';
import { VideoProperties } from 'react-native-video';
import { useVideoCtx } from '../ScreenContainer';
import useControllerStyles from '../useControllerStyles';
import { AspectRatio, toTimeView } from '../utils';
import Overlay from '../Overlay';
import EnhancedSeeker from '../Seeker/EnhancedSeeker';
import Center from '../Section/Center';
import FullscreenToggle from '../controls/FullscreenToggle';
import PlayPauseRefresh from '../controls/PlayPauseRefresh';
import Replay from '../controls/Replay';
import Forward from '../controls/Forward';
import RNVideo from '../Video/RNVideo';
import VideoContainer from '../Video/VideoContainer';
import { useInternalCtx } from '../InternalCtx';
import Text  from '../controls/Text';

const TimePlayed = () => {
  const { mutableState } = useInternalCtx();
  return <Text style={{ width: 80 }}>{toTimeView(mutableState.currentTime)}</Text>;
};

const TimeLeft = () => {
  const { mutableState, duration } = useInternalCtx();
  return (
    <Text style={{ width: 80 }}>-{toTimeView(duration - mutableState.currentTime)}</Text>
  );
};

export type FacebookPlayerProps = {
  style?: ViewProps['style'];
  videoStyle?: VideoProperties['style'];
  initialPaused?: boolean;
  initialAspectRatio?: AspectRatio;
  mode: 'auto-fit' | 'contain';
} & Omit<VideoProperties, 'paused'>;

const FacebookPlayer = ({
  mode,
  initialPaused,
  initialAspectRatio = 'landscape',
  style,
  videoStyle,
  ...props
}: FacebookPlayerProps) => {
  const { isLandscape } = useVideoCtx();
  const styles = useControllerStyles(initialAspectRatio, isLandscape);
  return (
    <VideoContainer
      mode={mode}
      initialAspectRatio={initialAspectRatio}
      initialPaused={initialPaused}
    >
      <RNVideo style={styles.video} {...props} />
      <Overlay>
        <Center>
          <Replay />
          <PlayPauseRefresh />
          <Forward />
        </Center>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TimePlayed />
            <EnhancedSeeker
              mode={mode}
              config={{
                buttonColor: '#fff',
                filledColor: '#1877f2',
                barHeight: 4,
                initialButtonSize: 18,
                touchedButtonSize: 18,
              }}
              styles={{
                seeker: { flex: 1 },
                buffer: { borderRadius: 10 },
                duration: { borderRadius: 10 },
                played: { borderRadius: 10 },
              }}
            />
            <TimeLeft />
            <FullscreenToggle style={{ marginRight: 8 }} />
          </View>
        </View>
      </Overlay>
    </VideoContainer>
  );
};

export default FacebookPlayer;
