import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
    const { user, isLoading } = useMe();

    return (
        <GradientLayout
            color="gray"
            subtitle="profile"
            title={`${user?.firstName} ${user?.lastName}`}
            description={`${user?.playlistsCount} public playlists`}
            image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
            roundImage
            loading={isLoading}
        >
            <Box color="white" paddingX="40px">
                <Box marginBottom="40px">
                    <Text fontSize="2xl" fontWeight="bold">
                        Top artists this month
                    </Text>
                    <Text fontSize="xs">Only visible to you</Text>
                </Box>
                <Flex>
                    {artists.map((artist) => (
                        <Box
                            paddingRight="20px"
                            width="12.5%"
                            key={artist.name}
                        >
                            <Box
                                bgColor="gray.900"
                                borderRadius="4px"
                                padding="15px"
                                width="100%"
                            >
                                <Image
                                    src="https://i.pravatar.cc/300"
                                    borderRadius="50%"
                                    objectFit="cover"
                                />
                                <Box marginTop="20px">
                                    <Text fontSize="sm" fontWeight="semibold">
                                        {artist.name}
                                    </Text>
                                    <Text fontSize="x-small">Artist</Text>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </GradientLayout>
    );
};

export const getServerSideProps = async () => {
    const artists = await prisma.artist.findMany({});

    return {
        props: { artists },
    };
};

export default Home;
