import NextLink from "next/link";
import { LinkBox, LinkOverlay, ListIcon, ListItem } from "@chakra-ui/layout";

const NavMenuItem = ({ item }) => {
    return (
        <ListItem key={item.name} fontSize="14px" fontWeight="600">
            <LinkBox
                _hover={{ color: "white" }}
                transition="color 100ms ease-in"
            >
                <NextLink href={item.route} passHref>
                    <LinkOverlay display="flex" alignItems="center">
                        <ListIcon
                            fontSize="24px"
                            as={item.icon}
                            marginRight="20px"
                        />
                        {item.name}
                    </LinkOverlay>
                </NextLink>
            </LinkBox>
        </ListItem>
    );
};

export default NavMenuItem;
