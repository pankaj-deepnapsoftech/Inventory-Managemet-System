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

interface StoreTableProps {
  stores: Array<{
    name: string;
    gst_number: string;
    address_line1: string;
    address_line2?: string;
    pincode?: string;
    city: string;
    state: string;
    createdAt: string;
    updatedAt: string;
  }>;
  isLoadingStores: boolean;
  openUpdateStoreDrawerHandler?: (id: string) => void;
  openStoreDetailsDrawerHandler?: (id: string) => void;
  deleteStoreHandler?: (id: string) => void;
  approveStoreHandler?: (id: string) => void;
}

const StoreTable: React.FC<StoreTableProps> = ({
  stores,
  isLoadingStores,
  openUpdateStoreDrawerHandler,
  openStoreDetailsDrawerHandler,
  deleteStoreHandler,
  approveStoreHandler,
}) => {
  const columns: Column<{
    name: string;
    gst_number: string;
    address_line1: string;
    address_line2?: string;
    pincode?: string;
    city: string;
    state: string;
    createdAt: string;
    updatedAt: string;
  }>[] = useMemo(
    () => [
        {
            Header: "Name",
            accessor: "name",
        },
        {
          Header: "GST No.",
          accessor: "gst_number",
        },
      {
        Header: "Address Line 1",
        accessor: "address_line1",
      },
      {
        Header: "Address Line 2",
        accessor: "address_line2",
      },
      {
        Header: "Pincode",
        accessor: "pincode",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
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
    gst_number: string;
    address_line1: string;
    address_line2?: string;
    pincode?: string;
    city: string;
    state: string;
    createdAt: string;
    updatedAt: string;
  }> = useTable(
    {
      columns,
      data: stores,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      {isLoadingStores && <Loading />}
      {stores.length === 0 && !isLoadingStores && (
        <div className="mx-auto w-max">
          <FcDatabase size={100} />
          <p className="text-lg">No Data Found</p>
        </div>
      )}
      {!isLoadingStores && stores.length > 0 && (
        <TableContainer>
          <Table variant="simple" {...getTableProps()}>
            <Thead className="text-sm font-semibold">
              {headerGroups.map(
                (
                  hg: HeaderGroup<{
                    name: string;
                    gst_number: string;
                    address_line1: string;
                    address_line2?: string;
                    pincode?: string;
                    city: string;
                    state: string;
                    createdAt: string;
                    updatedAt: string;
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

                          {cell.column.id === "createdAt" &&
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
                      {openStoreDetailsDrawerHandler && (
                        <MdOutlineVisibility
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            openStoreDetailsDrawerHandler(row.original?._id)
                          }
                        />
                      )}
                      {openUpdateStoreDrawerHandler && (
                        <MdEdit
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            openUpdateStoreDrawerHandler(row.original?._id)
                          }
                        />
                      )}
                      {deleteStoreHandler && (
                        <MdDeleteOutline
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            deleteStoreHandler(row.original?._id)
                          }
                        />
                      )}
                      {approveStoreHandler && (
                        <FcApproval
                          className="hover:scale-110"
                          size={16}
                          onClick={() =>
                            approveStoreHandler(row.original?._id)
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

export default StoreTable;