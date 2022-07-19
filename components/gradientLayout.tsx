import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, Skeleton } from "@chakra-ui/react";

const GradientLayout = ({
    color,
    children,
    image,
    subtitle,
    title,
    description,
    roundImage,
    loading = false,
}) => {
    return (
        <Box
            height="100%"
            overflowY="auto"
            css={{
                "&::-webkit-scrollbar": {
                    width: "13px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255, 255, 255, 0.3)",
                    transition: "background-color 100ms ease-in",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(255, 255, 255, 0.5)",
                },
                "&::-webkit-scrollbar-thumb:active": {
                    background: "rgba(255, 255, 255, 0.7)",
                },
            }}
        >
            <Flex padding="40px" align="end" position="relative">
                <Box
                    position="absolute"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    bgColor={`${color}.500`}
                    bgImage="linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)"
                    zIndex="-1"
                />
                <Box padding="20px">
                    <Image
                        boxSize="200px"
                        boxShadow="2xl"
                        objectFit="cover"
                        src={image}
                        borderRadius={roundImage ? "100%" : "3px"}
                    />
                </Box>
                <Box padding="20px" lineHeight="40px" color="white">
                    <Text fontSize="xs" fontWeight="bold" casing="uppercase">
                        {subtitle}
                    </Text>
                    <Skeleton isLoaded={!loading}>
                        <Text
                            fontWeight="bold"
                            lineHeight="none"
                            fontSize="7xl"
                        >
                            {title}
                        </Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                        <Text fontSize="xs" fontWeight="500">
                            {description}
                        </Text>
                    </Skeleton>
                </Box>
            </Flex>
            <Box
                paddingY="50px"
                position="relative"
                bg="rgba(0,0,0,.95)"
                isolation="isolate"
            >
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    height="200px"
                    bgColor={`${color}.500`}
                    bgImage="linear-gradient(rgba(0, 0, 0, .6) 0, rgba(0, 0, 0, .95) 100%)"
                    zIndex="-1"
                />
                {children}
            </Box>
        </Box>
    );
};

export default GradientLayout;
