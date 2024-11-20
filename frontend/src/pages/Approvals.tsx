import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useLazyUnapprovedProductsQuery,
} from "../redux/api/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";
import ProductTable from "../components/Table/ProductTable";
import UpdateProduct from "../components/Drawers/Product/UpdateProduct";
import { FcDatabase } from "react-icons/fc";

const Approvals: React.FC = () => {
  //   const [unapprovedProducts] = useLazyUnapprovedProductsQuery();

  //   const fetchUnapprovedProductsHandler = async () => {
  //     try {
  //         const data = await unapprovedProducts().unwrap();
  //         console.log(data);
  //     } catch (err: any) {
  //       toast.error(err?.data?.msg || err?.message || "Something went wrong");
  //     }
  //   };

  const [cookies] = useCookies();
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

  const [deleteProduct] = useDeleteProductMutation();

  const fetchUnapprovedProductsHandler = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "product/unapproved",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies?.access_token}`,
          },
        }
      );
      const data = await response.json();
      setProducts(data.unapproved);
      setFilteredProducts(data.unapproved);
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const approveProductHandler = async (id: string) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "product/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.access_token}`,
          },
          body: JSON.stringify({
            _id: id,
            approved: true,
          }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      fetchUnapprovedProductsHandler();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const deleteProductHandler = async (id: string) => {
    try {
      const response: any = await deleteProduct({ _id: id }).unwrap();
      toast.success(response.message);
      fetchUnapprovedProductsHandler();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchUnapprovedProductsHandler();
  }, []);

  return (
    <div>
      <div>
        {/* Products Page */}
        <div className="flex flex-col items-start justify-start md:flex-row gap-y-1 md:justify-between md:items-center mb-8">
          <div className="flex text-lg md:text-xl font-semibold items-center gap-y-1">
            Products for Approval
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
              onClick={fetchUnapprovedProductsHandler}
              leftIcon={<MdOutlineRefresh />}
              color="#1640d6"
              borderColor="#1640d6"
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        </div>

        <div>
          <ProductTable
            isLoadingProducts={isLoadingProducts}
            products={filteredProducts}
            deleteProductHandler={deleteProductHandler}
            approveProductHandler={approveProductHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Approvals;
