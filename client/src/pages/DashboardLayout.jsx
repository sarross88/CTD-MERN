import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//create context- loader get Data quickly, must return
export const loader = async () => {
  console.log("hello world");
  try {
    const { data } = await customFetch("/users/current-user");
    console.log("inside loader");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

//context for the globals
const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = useLoaderData();
  console.log(user);
  console.log("inside data");
  const navigate = useNavigate();
  // console.log(data);
  // const user = { name: "john" };
  //state
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  const toggleSidebar = () => {
    console.log("toggle Sidebar");
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        logoutUser,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// Creating a HOOK for the DashboardContext globals elsewhere!!
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
