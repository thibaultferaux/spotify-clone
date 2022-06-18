import NextLink from "next/link";
import { LinkBox, LinkOverlay, ListItem } from "@chakra-ui/layout";

const PlaylistMenuItem = ({ item }) => {
    return (
        <ListItem key={item}>
            <LinkBox
                _hover={{ color: "white" }}
                transition="color 50ms ease-in"
            >
                <NextLink href="/" passHref>
                    <LinkOverlay>{item}</LinkOverlay>
                </NextLink>
            </LinkBox>
        </ListItem>
    );
};

export default PlaylistMenuItem;
