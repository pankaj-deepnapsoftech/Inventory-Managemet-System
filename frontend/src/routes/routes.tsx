import { FaRegCheckCircle } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlineSpeed, MdOutlineSell, MdOutlineAttachMoney } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Approvals from "../pages/Approvals";
import Stores from "../pages/Stores";
import Buyers from "../pages/Buyers";
import Sellers from "../pages/Sellers";

const routes = [
  {
    name: "Dashboard",
    icon: <MdOutlineSpeed />,
    path: "",
    element: <Dashboard />,
    isSublink: false
  },
  {
    name: "Product",
    icon: <MdOutlineShoppingCart />,
    path: "product",
    element: <Products />,
    isSublink: false
  },
  {
    name: "Approval",
    icon: <FaRegCheckCircle />,
    path: "approval",
    element: <Approvals />,
    isSublink: false
  },
  {
    name: "Store",
    icon: <IoStorefrontOutline />,
    path: "store",
    element: <Stores />,
    isSublink: false
  },
  {
    name: "Agent",
    icon: <TbUsersGroup />,
    sublink: [
      {
        name: "Buyer",
        icon: <MdOutlineAttachMoney />,
        path: "agent/buyer",
        element: <Buyers />,
      },
      {
        name: "Seller",
        icon: <MdOutlineSell />,
        path: "agent/seller",
        element: <Sellers />,
      },
    ],
    isSublink: true
  },
];

export default routes;
