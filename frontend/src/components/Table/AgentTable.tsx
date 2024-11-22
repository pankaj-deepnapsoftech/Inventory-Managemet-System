import { useMemo } from "react";
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

interface AgentTableProps {
  agents: Array<{
    name: string;
    email: string;
    phone: string;
    gst_number?: string;
    company_name: string;
    company_email: string;
    company_phone: string;
    address_line1: string;
    address_line2?: string;
    pincode?: string;
    city: string;
    state?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  isLoadingAgents: boolean;
  openUpdateAgentDrawerHandler?: (id: string) => void;
  openAgentDetailsDrawerHandler?: (id: string) => void;
  deleteAgentHandler?: (id: string) => void;
  approveAgentHandler?: (id: string) => void;
}

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  isLoadingAgents,
  openUpdateAgentDrawerHandler,
  openAgentDetailsDrawerHandler,
  deleteAgentHandler,
  approveAgentHandler,
}) => {
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "GST Number", accessor: "gst_number" },
      { Header: "Company Name", accessor: "company_name" },
      { Header: "Company Email", accessor: "company_email" },
      { Header: "Company Phone", accessor: "company_phone" },
      { Header: "Address Line 1", accessor: "address_line1" },
      { Header: "Address Line 2", accessor: "address_line2" },
      { Header: "Pincode", accessor: "pincode" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
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
    name: string;
    email: string;
    phone: string;
    gst_number?: string;
    company_name: string;
    company_email: string;
    company_phone: string;
    address_line1: string;
    address_line2?: string;
    pincode?: string;
    city: string;
    state?: string;
    createdAt: string;
    updatedAt: string;
  }> = useTable(
    {
      columns,
      data: agents,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return  <div>
  {isLoadingAgents && <Loading />}
  {agents.length === 0 && !isLoadingAgents && (
    <div className="mx-auto w-max">
      <FcDatabase size={100} />
      <p className="text-lg">No Data Found</p>
    </div>
  )}
  {!isLoadingAgents && agents.length > 0 && (
    <TableContainer>
      <Table variant="simple" {...getTableProps()}>
        <Thead className="text-sm font-semibold">
          {headerGroups.map(
            (
              hg: HeaderGroup<{
                name: string;
                email: string;
                phone: string;
                gst_number?: string;
                company_name: string;
                company_email: string;
                company_phone: string;
                address_line1: string;
                address_line2?: string;
                pincode?: string;
                city: string;
                state?: string;
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
                      {cell.column.id !== 'createdAt' && cell.column.id !== 'updatedAt' && cell.render("Cell")}

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
                    </Td>
                  );
                })}
                <Td className="flex gap-x-2">
                  {openAgentDetailsDrawerHandler && (
                    <MdOutlineVisibility
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        openAgentDetailsDrawerHandler(row.original?._id)
                      }
                    />
                  )}
                  {openUpdateAgentDrawerHandler && (
                    <MdEdit
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        openUpdateAgentDrawerHandler(row.original?._id)
                      }
                    />
                  )}
                  {deleteAgentHandler && (
                    <MdDeleteOutline
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        deleteAgentHandler(row.original?._id)
                      }
                    />
                  )}
                  {approveAgentHandler && (
                    <FcApproval
                      className="hover:scale-110"
                      size={16}
                      onClick={() =>
                        approveAgentHandler(row.original?._id)
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

export default AgentTable;
