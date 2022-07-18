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
            bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
        >
            <Flex bgColor={`${color}.600`} padding="40px" align="end">
                <Box padding="20px">
                    <Image
                        boxSize="160px"
                        boxShadow="2xl"
                        objectFit="cover"
                        src={image}
                        borderRadius={roundImage ? "100%" : "3px"}
                    />
                </Box>
                <Box padding="20px" lineHeight="40px" color="white">
                    <Text
                        fontSize="x-small"
                        fontWeight="bold"
                        casing="uppercase"
                    >
                        {subtitle}
                    </Text>
                    <Skeleton isLoaded={!loading}>
                        <Text fontWeight="bold" fontSize="6xl">
                            {title}
                        </Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                        <Text fontSize="x-small">{description}</Text>
                    </Skeleton>
                </Box>
            </Flex>
            <Box paddingY="50px">{children}</Box>
        </Box>
    );
};

export default GradientLayout;
