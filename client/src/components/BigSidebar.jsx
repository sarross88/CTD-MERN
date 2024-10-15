import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
// import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <div>
      <Wrapper>
        <div
          className={
            showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
          }
        >
          <div className="content">
            <header>
              <Logo />
            </header>
            <NavLinks isBigSidebar />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default BigSidebar;
