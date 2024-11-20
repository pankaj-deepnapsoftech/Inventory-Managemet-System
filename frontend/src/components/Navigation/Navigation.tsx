import { FaRegCheckCircle } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlineSpeed } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <div className="h-[inherit] px-3 py-3 overflow-auto bg-[#f9fafc]">
      <ul>
        {routes.map((route, ind) => {
          if (route.isSublink) {
            return (
              <div key={ind}>
                <li
                  key={ind}
                  className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold"
                >
                  <span>{route.icon}</span>
                  <span>{route.name}</span>
                </li>
                {route.sublink &&
                  route.sublink.map((sublink, index) => (
                    <NavLink to={sublink.path}>
                      <li
                        key={index}
                        className="flex gap-x-2 pl-5 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold"
                      >
                        <span>{sublink.icon}</span>
                        <span>{sublink.name}</span>
                      </li>
                    </NavLink>
                  ))}
              </div>
            );
          } else {
            return (
              <NavLink to={route.path || ""}>
                <li
                  key={ind}
                  className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold"
                >
                  <span>{route.icon}</span>
                  <span>{route.name}</span>
                </li>
              </NavLink>
            );
          }
        })}

        {/* <li className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold">
          <span>
            <MdOutlineSpeed />
          </span>
          <span>Dashboard</span>
        </li>
        <li className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold">
          <span>
            <MdOutlineShoppingCart />
          </span>
          <span>Products</span>
        </li>
        <li className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold">
          <span>
            <FaRegCheckCircle />
          </span>
          <span>Approvals</span>
        </li>
        <li className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold">
          <span>
            <IoStorefrontOutline />
          </span>
          <span>Stores</span>
        </li>
        <li className="flex gap-x-2 pl-3 pr-9 py-3 rounded-lg hover:bg-[#e6efff] hover:text-[#1640d6] hover:cursor-pointer text-[15px] font-semibold">
          <span>
            <TbUsersGroup />
          </span>
          <span>Agents</span>
        </li> */}
      </ul>
    </div>
  );
};

export default Navigation;
