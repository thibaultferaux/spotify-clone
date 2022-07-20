import {
    Box,
    ButtonGroup,
    Center,
    Flex,
    IconButton,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from "@chakra-ui/react";
import { useStoreActions } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import {
    MdOutlinePauseCircleFilled,
    MdOutlinePlayCircleFilled,
    MdOutlineRepeat,
    MdShuffle,
    MdSkipNext,
    MdSkipPrevious,
} from "react-icons/md";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(
        songs.findIndex((s) => s.id === activeSong.id)
    );
    const [seek, setSeek] = useState(0.0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0.0);
    const soundRef = useRef(null);
    const repeatRef = useRef(repeat);
    const setActiveSong = useStoreActions(
        (state: any) => state.changeActiveSong
    );

    useEffect(() => {
        let timerId;

        if (playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek());
                timerId = requestAnimationFrame(f);
            };

            timerId = requestAnimationFrame(f);
            return () => cancelAnimationFrame(timerId);
        }

        cancelAnimationFrame(timerId);
    }, [playing, isSeeking]);

    useEffect(() => {
        setActiveSong(songs[index]);
    }, [index, setActiveSong, songs]);

    useEffect(() => {
        repeatRef.current = repeat;
    }, [repeat]);

    const setPlayState = (value) => {
        setPlaying(value);
    };

    const onShuffle = () => {
        setShuffle((state) => !state);
    };

    const onRepeat = () => {
        setRepeat((state) => !state);
    };

    const prevSong = () => {
        setIndex((state) => {
            return state ? state - 1 : songs.length - 1;
        });
    };

    const nextSong = () => {
        setIndex((state) => {
            if (shuffle) {
                const next = Math.floor(Math.random() * songs.length);

                if (next === state) {
                    return nextSong();
                }
                return next;
            }
            return state === songs.length - 1 ? 0 : state + 1;
        });
    };

    const onEnd = () => {
        if (repeatRef.current) {
            setSeek(0);
            soundRef.current.seek(0);
        } else {
            nextSong();
        }
    };

    const onLoad = () => {
        const songDuration = soundRef.current.duration();
        setDuration(songDuration);
    };

    const onSeek = (e) => {
        setSeek(parseFloat(e));
        soundRef.current.seek(e);
    };

    return (
        <Box>
            <Box>
                <ReactHowler
                    playing={playing}
                    src={activeSong?.url}
                    ref={soundRef}
                    onLoad={onLoad}
                    onEnd={onEnd}
                    // volume="0.1"
                />
            </Box>
            <Center color="gray.600">
                <ButtonGroup>
                    {/* Shuffle Button */}
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="24px"
                        color={shuffle ? "green.500" : "gray.600"}
                        onClick={onShuffle}
                        icon={<MdShuffle />}
                    />
                    {/* Previous skip Button */}
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="previous"
                        fontSize="24px"
                        icon={<MdSkipPrevious />}
                        onClick={prevSong}
                    />
                    {/* Play/Pause Button */}
                    {playing ? (
                        <IconButton
                            outline="none"
                            variant="link"
                            aria-label="pause"
                            fontSize="40px"
                            color="white"
                            icon={<MdOutlinePauseCircleFilled />}
                            onClick={() => setPlayState(false)}
                        />
                    ) : (
                        <IconButton
                            outline="none"
                            variant="link"
                            aria-label="play"
                            fontSize="40px"
                            color="white"
                            icon={<MdOutlinePlayCircleFilled />}
                            onClick={() => setPlayState(true)}
                        />
                    )}
                    {/* Next skip Button */}
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="next"
                        fontSize="24px"
                        icon={<MdSkipNext />}
                        onClick={nextSong}
                    />
                    {/* Repeat Button */}
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="repeat"
                        fontSize="24px"
                        color={repeat ? "green.500" : "gray.600"}
                        onClick={onRepeat}
                        icon={<MdOutlineRepeat />}
                    />
                </ButtonGroup>
            </Center>

            <Box color="gray.600">
                <Flex justify="center" align="center">
                    <Box width="10%">
                        <Text fontSize="xs">{formatTime(seek)}</Text>
                    </Box>
                    <Box width="80%">
                        <Flex align="center">
                            <Slider
                                aria-label="seek-slider"
                                step={0.1}
                                min={0}
                                max={
                                    duration
                                        ? (duration.toFixed(
                                              2
                                          ) as unknown as number)
                                        : 0
                                }
                                id="player-range"
                                role="group"
                                onChange={onSeek}
                                value={seek}
                                onChangeStart={() => setIsSeeking(true)}
                                onChangeEnd={() => setIsSeeking(false)}
                            >
                                <SliderTrack bg="gray.700">
                                    <SliderFilledTrack
                                        bg="white"
                                        _groupHover={{
                                            background: "green.500",
                                        }}
                                        _groupActive={{
                                            background: "green.500",
                                        }}
                                    />
                                </SliderTrack>
                                <SliderThumb
                                    role="group"
                                    display="none"
                                    _groupHover={{
                                        display: "initial",
                                    }}
                                    _active={{
                                        display: "initial",
                                    }}
                                />
                            </Slider>
                        </Flex>
                    </Box>
                    <Box width="10%">
                        <Text fontSize="xs" textAlign="right">
                            {formatTime(duration)}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Player;
