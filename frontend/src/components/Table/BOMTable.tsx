import { useEffect, useMemo } from "react";
import {
    Cell,
  Column,
  HeaderGroup,
  TableInstance,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Loading from "../../ui/Loading";
import { FcApproval, FcDatabase } from "react-icons/fc";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import moment from "moment";
import { MdDeleteOutline, MdEdit, MdOutlineVisibility } from "react-icons/md";

interface BOMTableProps {
  boms: Array<{
    product_name: string;
    parts_count: string;
    total_cost: string;
    approval_date?: string;
    approved_by: string;
    createdAt: string;
    updatedAt: string;
  }>;
  isLoadingBoms: boolean;
  openUpdateBomDrawerHandler?: (id: string) => void;
  openBomDetailsDrawerHandler?: (id: string) => void;
  deleteBomHandler?: (id: string) => void;
  approveBomHandler?: (id: string) => void;
}

const BOMTable: React.FC<BOMTableProps> = ({
  boms,
  isLoadingBoms,
  openUpdateBomDrawerHandler,
  openBomDetailsDrawerHandler,
  deleteBomHandler,
  approveBomHandler,
}) => {
  const columns = useMemo(
    () => [
      { Header: "BOM Name", accessor: "bom_name" },
      { Header: "Parts Count", accessor: "parts_count" },
      { Header: "Total Cost", accessor: "total_cost" },
      { Header: "Approved By", accessor: "approved_by" },
      { Header: "Created On", accessor: "createdAt" },
      { Header: "Last Updated", accessor: "updatedAt" },
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
    bom_name: string,
    parts_count: string,
    total_cost: string,
    approved_by: string,
    createdAt: string,
    updatedAt: string
  }> = useTable(
    {
      columns,
      data: boms,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return  <div>
  {isLoadingBoms && <Loading />}
  {boms.length === 0 && !isLoadingBoms && (
    <div className="mx-auto w-max">
      <FcDatabase size={100} />
      <p className="text-lg">No Data Found</p>
    </div>
  )}
  {!isLoadingBoms && boms.length > 0 && (
    <TableContainer>
      <Table variant="simple" {...getTableProps()}>
        <Thead className="text-sm font-semibold">
          {headerGroups.map(
            (hg<{
              bom_name: string,
              parts_count: string,
              total_cost: string,
              approved_by: string,
              createdAt: string,
              updatedAt: string
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
                      {cell.column.id !== 'createdAt' && cell.column.id !== 'updatedAt' && cell.column.id !== 'approved_by' && cell.render("Cell")}

                      {cell.column.id === "createdAt" &&
                        row.original?.createdAt && (
                          <span>
                            {moment(row.original?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        )}
                      {cell.column.id === "updatedAt" &&
                        row.original?.updatedAt && (
                          <span>
                            {moment(row.original?.updatedAt).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        )}
                      {cell.column.id === "approved_by" &&
                          <span>
                            {row.original?.approved_by?.first_name + " " + row.original?.approved_by?.last_name}
                          </span>
                        }
                    </Td>
                  );
                })}
                <Td className="flex gap-x-2">
                  {openBomDetailsDrawerHandler && (
                    <MdOutlineVisibility
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        openBomDetailsDrawerHandler(row.original?._id)
                      }
                    />
                  )}
                  {openUpdateBomDrawerHandler && (
                    <MdEdit
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        openUpdateBomDrawerHandler(row.original?._id)
                      }
                    />
                  )}
                  {deleteBomHandler && (
                    <MdDeleteOutline
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        deleteBomHandler(row.original?._id)
                      }
                    />
                  )}
                  {approveBomHandler && (
                    <FcApproval
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        approveBomHandler(row.original?._id)
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
};

export default BOMTable;
