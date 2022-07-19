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

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(0);
    const [seek, setSeek] = useState(0.0);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0.0);

    const setPlayState = (value) => {
        setPlaying(value);
    };

    const onShuffle = () => {
        setShuffle((state) => !state);
    };

    const onRepeat = () => {
        setRepeat((state) => !state);
    };

    return (
        <Box>
            <Box>
                <ReactHowler playing={playing} src={activeSong?.url} />
            </Box>
            <Center color="gray.600">
                <ButtonGroup>
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="24px"
                        color={shuffle ? "green.500" : "gray.600"}
                        onClick={onShuffle}
                        icon={<MdShuffle />}
                    />
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="previous"
                        fontSize="24px"
                        icon={<MdSkipPrevious />}
                    />
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
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="next"
                        fontSize="24px"
                        icon={<MdSkipNext />}
                    />
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
                        <Text fontSize="xs">1:21</Text>
                    </Box>
                    <Box width="80%">
                        <Flex align="center">
                            <Slider
                                aria-label="seek-slider"
                                step={0.1}
                                min={0}
                                max={321}
                                id="player-range"
                                role="group"
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
                            3:21
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Player;
