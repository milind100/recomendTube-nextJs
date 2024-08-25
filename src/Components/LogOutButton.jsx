"use client";
import { signOut } from "next-auth/react";
import RTButton from "../shared/RTButton";
import { useDispatch } from "react-redux";
import { clearAppData } from "../reducers/appReducer/appSlice";
import { LogOut } from "lucide-react";
import { clearPlaylistFormData } from "../reducers/playlistReducer/playlistFormSlice";

const LogOutButton = ({ className }) => {
  const dispatch = useDispatch();
  const handleLogoutClick = async () => {
    await signOut();

    dispatch(clearPlaylistFormData);
    dispatch(clearAppData);
  };
  return (
    <RTButton onClick={handleLogoutClick} className={className}>
      <LogOut size={18} /> logout
    </RTButton>
  );
};

export default LogOutButton;
