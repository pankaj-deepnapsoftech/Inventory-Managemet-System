import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useMemo } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdDeleteOutline, MdEdit, MdOutlineVisibility } from "react-icons/md";
import { FcApproval, FcDatabase } from "react-icons/fc";
import {
  usePagination,
  useSortBy,
  useTable,
  Column,
  TableState,
  TableInstance,
  HeaderGroup,
  Row,
  Cell,
} from "react-table";
import Loading from "../../ui/Loading";

interface ProductTableProps {
  products: Array<{
    name: string;
    product_id: string;
    uom: string;
    category: string;
    current_stock: number;
    price: number;
    min_stock?: number;
    max_stock?: number;
    hsn_code?: number;
    createdAt: string;
    updatedAt: string;
  }>;
  isLoadingProducts: boolean;
  openUpdateProductDrawerHandler?: (id: string) => void;
  openProductDetailsDrawerHandler?: (id: string) => void;
  deleteProductHandler?: (id: string) => void;
  approveProductHandler?: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoadingProducts,
  openUpdateProductDrawerHandler,
  openProductDetailsDrawerHandler,
  deleteProductHandler,
  approveProductHandler,
}) => {
  const columns: Column<{
    name: string;
    product_id: string;
    uom: string;
    category: string;
    current_stock: number;
    price: number;
    min_stock?: number;
    max_stock?: number;
    hsn_code?: number;
  }>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "product_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "UOM",
        accessor: "uom",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Current stock",
        accessor: "current_stock",
      },
      {
        Header: "Min stock",
        accessor: "min_stock",
      },
      {
        Header: "Max stock",
        accessor: "max_stock",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex },
  }: TableInstance<{
    name: string;
    product_id: string;
    uom: string;
    category: string;
    current_stock: number;
    price: number;
    min_stock?: number;
    max_stock?: number;
    hsn_code?: number;
  }> = useTable(
    {
      columns,
      data: products,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      {isLoadingProducts && <Loading />}
      {products.length === 0 && !isLoadingProducts && (
        <div className="mx-auto w-max">
          <FcDatabase size={100} />
          <p className="text-lg">No Data Found</p>
        </div>
      )}
      {!isLoadingProducts && products.length > 0 && (
        <TableContainer>
          <Table variant="simple" {...getTableProps()}>
            <Thead className="text-sm font-semibold">
              {headerGroups.map(
                (
                  hg: HeaderGroup<{
                    name: string;
                    product_id: string;
                    uom: string;
                    category: string;
                    current_stock: number;
                    price: number;
                    min_stock?: number;
                    max_stock?: number;
                    hsn_code?: number;
                  }>
                ) => {
                  return (
                    <Tr {...hg.getHeaderGroupProps()}>
                      {hg.headers.map((column: any) => {
                        return (
                          <Th
                            textTransform="capitalize"
                            fontSize="12px"
                            fontWeight="700"
                            color="black"
                            backgroundColor="#fafafa"
                            borderLeft="1px solid #d7d7d7"
                            borderRight="1px solid #d7d7d7"
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            <p className="flex">
                              {column.render("Header")}
                              {column.isSorted && (
                                <span>
                                  {column.isSortedDesc ? (
                                    <FaCaretDown />
                                  ) : (
                                    <FaCaretUp />
                                  )}
                                </span>
                              )}
                            </p>
                          </Th>
                        );
                      })}
                      <Th
                        textTransform="capitalize"
                        fontSize="12px"
                        fontWeight="700"
                        color="black"
                        backgroundColor="#fafafa"
                        borderLeft="1px solid #d7d7d7"
                        borderRight="1px solid #d7d7d7"
                      >
                        Actions
                      </Th>
                    </Tr>
                  );
                }
              )}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);

                return (
                  <Tr
                    className="relative hover:bg-[#e4e4e4] hover:cursor-pointer text-base lg:text-sm"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell: Cell) => {
                      return (
                        <Td fontWeight="500" {...cell.getCellProps()}>
                          {cell.render("Cell")}

                          {cell.column.id === "created_on" &&
                            row.original?.createdAt && (
                              <span>
                                {moment(row.original?.createdAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            )}
                          {cell.column.id === "updatedAt" &&
                            row.original?.followup_date && (
                              <span>
                                {moment(row.original?.updatedAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            )}
                        </Td>
                      );
                    })}
                    <Td className="flex gap-x-2">
                      {openProductDetailsDrawerHandler && (
                        <MdOutlineVisibility
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            openProductDetailsDrawerHandler(row.original?._id)
                          }
                        />
                      )}
                      {openUpdateProductDrawerHandler && (
                        <MdEdit
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            openUpdateProductDrawerHandler(row.original?._id)
                          }
                        />
                      )}
                      {deleteProductHandler && (
                        <MdDeleteOutline
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            deleteProductHandler(row.original?._id)
                          }
                        />
                      )}
                      {approveProductHandler && (
                        <FcApproval
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            approveProductHandler(row.original?._id)
                          }
                        />
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ProductTable;