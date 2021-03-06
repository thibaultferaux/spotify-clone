import NextLink from "next/link";
import { LinkBox, LinkOverlay, ListItem } from "@chakra-ui/layout";

const PlaylistMenuItem = ({ item }) => {
    return (
        <ListItem>
            <LinkBox
                _hover={{ color: "white" }}
                transition="color 50ms ease-in"
            >
                <NextLink
                    href={{
                        pathname: "/playlist/[id]",
                        query: { id: item.id },
                    }}
                    passHref
                >
                    <LinkOverlay>{item.name}</LinkOverlay>
                </NextLink>
            </LinkBox>
        </ListItem>
    );
};

export default PlaylistMenuItem;
