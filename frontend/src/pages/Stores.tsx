import { Button } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAddProductDrawer,
  closeStoreDetailsDrawer,
  closeUpdateProductDrawer,
  openAddProductDrawer,
  openStoreDetailsDrawer,
  openUpdateProductDrawer,
} from "../redux/reducers/drawersSlice";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import StoreTable from "../components/Table/StoreTable";
import AddStore from "../components/Drawers/Store/AddStore";

const Stores: React.FC = () => {
  const [isLoadingStores, setIsLoadingStores] = useState<boolean>(false);
  const [stores, setStores] = useState<any>([]);
  const [filteredStores, setFilteredStores] = useState<any>([]);
  const {
    isAddStoreDrawerOpened,
    isUpdateStoreDrawerOpened,
    isStoreDetailsDrawerOpened,
  } = useSelector((state: any) => state.drawers);
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  const openAddStoreDrawerHandler = () => {
    dispatch(openAddProductDrawer());
  };

  const closeAddStoreDrawerHandler = () => {
    dispatch(closeAddProductDrawer());
  };

  const openUpdateStoreDrawerHandler = () => {
    dispatch(openUpdateProductDrawer());
  };

  const closeUpdateStoreDrawerHandler = () => {
    dispatch(closeUpdateProductDrawer());
  };

  const openStoreDetailsDrawerHandler = () => {
    dispatch(openStoreDetailsDrawer());
  };

  const closeStoreDetailsDrawerHandler = () => {
    dispatch(closeStoreDetailsDrawer());
  };

  const fetchStoresHandler = async () => {
    try {
      setIsLoadingStores(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "store/all",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies?.access_token}`,
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setStores(data.stores);
      setFilteredStores(data.stores);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Something went wrong");
    } finally{
      setIsLoadingStores(false);
    }
  };

  useEffect(() => {
    fetchStoresHandler();
  }, []);

  return (
    <div>
      <div>
        {/* Add Store Drawer */}
        {isAddStoreDrawerOpened && <AddStore />}
        {/* Update Store Drawer */}
        {/* Store Details Drawer */}
        {/* Stores Page */}
        <div className="flex flex-col items-start justify-start md:flex-row gap-y-1 md:justify-between md:items-center mb-8">
          <div className="flex text-lg md:text-xl font-semibold items-center gap-y-1">
            Stores
          </div>

          <div className="mt-2 md:mt-0 flex flex-wrap gap-y-1 gap-x-2 w-full md:w-fit">
            <textarea
              className="rounded-[10px] w-full md:flex-1 px-2 py-2 md:px-3 md:py-2 text-sm focus:outline-[#1640d6] hover:outline:[#1640d6] border resize-none border-[#bbbbbb] bg-[#bdbdbdd9]"
              rows={1}
              //   width="220px"
              placeholder="Search"
              //   value={searchKey}
              //   onChange={(e) => setSearchKey(e.target.value)}
            />
            <Button
              fontSize={{ base: "14px", md: "14px" }}
              paddingX={{ base: "10px", md: "12px" }}
              paddingY={{ base: "0", md: "3px" }}
              width={{ base: "-webkit-fill-available", md: 100 }}
              onClick={fetchStoresHandler}
              leftIcon={<MdOutlineRefresh />}
              color="#1640d6"
              borderColor="#1640d6"
              variant="outline"
            >
              Refresh
            </Button>
            <Button
              fontSize={{ base: "14px", md: "14px" }}
              paddingX={{ base: "10px", md: "12px" }}
              paddingY={{ base: "0", md: "3px" }}
              width={{ base: "-webkit-fill-available", md: 200 }}
              onClick={openAddStoreDrawerHandler}
              color="white"
              backgroundColor="#1640d6"
            >
              Add New Store
            </Button>
          </div>
        </div>

        <div>
          <StoreTable stores={filteredStores} isLoadingStores={isLoadingStores} />
        </div>
      </div>
    </div>
  );
};

export default Stores;
