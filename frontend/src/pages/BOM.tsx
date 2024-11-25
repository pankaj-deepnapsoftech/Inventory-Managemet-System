import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import BOMTable from "../components/Table/BOMTable";
import { useDeleteBomMutation, useLazyFetchBomsQuery } from "../redux/api/api";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { closeAddBomDrawer, closeBomDetailsDrawer, closeUpdateBomDrawer, openAddBomDrawer, openBomDetailsDrawer, openUpdateBomDrawer } from "../redux/reducers/drawersSlice";
import AddBom from "../components/Drawers/BOM/AddBom";

const BOM: React.FC = () => {
  const [cookies] = useCookies();
  const [bomId, setBomId] = useState<string | undefined>();
  const [searchKey, setSearchKey] = useState<string | undefined>();
  const [isLoadingBoms, setIsLoadingBoms] = useState<boolean>(false);
  const [boms, setBoms] = useState<any[]>([]);
  const [filteredBoms, setFilteredBoms] = useState<any[]>([]);

    const [deleteBom] = useDeleteBomMutation();

  const {  isAddBomDrawerOpened, isUpdateBomDrawerOpened, isBomDetailsDrawerOpened} = useSelector((state: any)=> state.drawers);
  const dispatch = useDispatch();

    const openAddBomDrawerHandler = ()=>{
        dispatch(openAddBomDrawer());
    }
    const closeAddBomDrawerHandler = ()=>{
        dispatch(closeAddBomDrawer());
    }
    const openUpdateBomDrawerHandler = (id: string)=>{
        setBomId(id);
        dispatch(openUpdateBomDrawer());
    }
    const closeUpdateBomDrawerHandler = ()=>{
        dispatch(closeUpdateBomDrawer());
    }
    const openBomDetailsDrawerHandler = (id: string)=>{
        setBomId(id);
        dispatch(openBomDetailsDrawer());
    }
    const closeBomDetailsDrawerHandler = ()=>{
        dispatch(closeBomDetailsDrawer());
    }


  const fetchBomsHandler = async () => {
    try {
      setIsLoadingBoms(true);
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "bom/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies?.access_token}`,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setBoms(data.boms);
      setFilteredBoms(data.boms);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoadingBoms(false);
    }
  };

  const deleteBomHandler = async (id: string)=>{
    try {
        const response = await deleteBom(id).unwrap();
        toast.success(response?.message);
        fetchBomsHandler();
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchBomsHandler();
  }, []);

  return (
    <div>

        {/* Add BOM */}
        {isAddBomDrawerOpened && <AddBom closeDrawerHandler={closeAddBomDrawerHandler} fetchBomsHandler={fetchBomsHandler} />}


      <div className="flex flex-col items-start justify-start md:flex-row gap-y-1 md:justify-between md:items-center mb-8">
        <div className="flex text-lg md:text-xl font-semibold items-center gap-y-1">
          Bill Of Materials (BOM)
        </div>

        <div className="mt-2 md:mt-0 flex flex-wrap gap-y-1 gap-x-2 w-full md:w-fit">
          <textarea
            className="rounded-[10px] w-full md:flex-1 px-2 py-2 md:px-3 md:py-2 text-sm focus:outline-[#1640d6] hover:outline:[#1640d6] border resize-none border-[#bbbbbb] bg-[#bdbdbdd9]"
            rows={1}
            //   width="220px"
            placeholder="Search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button
            fontSize={{ base: "14px", md: "14px" }}
            paddingX={{ base: "10px", md: "12px" }}
            paddingY={{ base: "0", md: "3px" }}
            width={{ base: "-webkit-fill-available", md: 100 }}
            onClick={fetchBomsHandler}
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
            onClick={openAddBomDrawerHandler}
            color="white"
            backgroundColor="#1640d6"
          >
            Add New BOM
          </Button>
        </div>
      </div>

      <div>
        <BOMTable isLoadingBoms={isLoadingBoms} boms={filteredBoms} openBomDetailsDrawerHandler={openBomDetailsDrawerHandler} openUpdateBomDrawerHandler={openUpdateBomDrawerHandler} deleteBomHandler={deleteBomHandler} />
      </div>
    </div>
  );
};

export default BOM;
