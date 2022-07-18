import NextImage from "next/image";
import NextLink from "next/link";
import {
    Box,
    Center,
    Divider,
    LinkBox,
    LinkOverlay,
    List,
    ListIcon,
    ListItem,
} from "@chakra-ui/layout";
import {
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite,
} from "react-icons/md";
import NavMenuItem from "./navMenuItem";
import PlaylistMenuItem from "./playlistMenuItem";
import { usePlaylist } from "../lib/hooks";

const musicMenu = [
    {
        name: "Create Playlist",
        icon: MdPlaylistAdd,
        route: "/",
    },
    {
        name: "Favorites",
        icon: MdFavorite,
        route: "/favorites",
    },
];

const navMenu = [
    {
        name: "Home",
        icon: MdHome,
        route: "/",
    },
    {
        name: "Search",
        icon: MdSearch,
        route: "/search",
    },
    {
        name: "Your Library",
        icon: MdLibraryMusic,
        route: "/library",
    },
];

// const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
    const { playlists } = usePlaylist();

    return (
        <Box
            width="100%"
            height="calc(100vh - 100px)"
            bg="black"
            color="gray.500"
        >
            <Box
                paddingX="20px"
                paddingTop="20px"
                height="100%"
                display="flex"
                flexDirection="column"
            >
                <Box width="120px" marginBottom="10px">
                    <NextImage src="/logo.svg" height={60} width={120} />
                </Box>
                <Box marginBottom="30px">
                    <List spacing={2}>
                        {navMenu.map((item) => (
                            <NavMenuItem key={item.name} item={item} />
                        ))}
                    </List>
                </Box>
                <Box marginBottom="10px">
                    <List spacing={2}>
                        {musicMenu.map((item) => (
                            <NavMenuItem key={item.name} item={item} />
                        ))}
                    </List>
                </Box>
                <Divider color="gray.800" />
                <Box
                    overflowY="auto"
                    marginRight="-20px"
                    paddingY="10px"
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "13px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#424242",
                            transition: "background-color 100ms ease-in",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: "#757575",
                        },
                        "&::-webkit-scrollbar-thumb:active": {
                            background: "#BDBDBD",
                        },
                    }}
                >
                    <List spacing={2}>
                        {playlists.map((item) => (
                            <PlaylistMenuItem key={item.id} item={item} />
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
