import { Blinds, House, SquarePlus, User } from "lucide-react";
import { locationPath } from "../../utils/constants";

export const navLinks = [
  { name: "Home", link: locationPath.home, icon: <House /> },
  // {
  //   name: "Profile",
  //   link: locationPath.profile,
  //   icon: <SquareUserRound />,
  // },
  {
    name: "Library",
    link: locationPath.myLibrary,
    icon: <Blinds />,
  },
  {
    name: "Create Playlists",
    link: locationPath.createPlaylist,
    icon: <SquarePlus />,
  },
  {
    name: "Creators",
    link: locationPath.creators,
    icon: <User />,
  },
];
