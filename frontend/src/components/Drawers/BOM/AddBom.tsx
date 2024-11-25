import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Drawer from "../../../ui/Drawer";
import { BiX } from "react-icons/bi";
import { useState } from "react";
import Select from "react-select";
import { useAddProductMutation } from "../../../redux/api/api";
import { toast } from "react-toastify";
import RawMaterial from "../../Dynamic Add Components/RawMaterial";
import Process from "../../Dynamic Add Components/Process";

interface AddBomProps {
  closeDrawerHandler: () => void;
  fetchBomsHandler: () => void;
}

const AddBom: React.FC<AddBomProps> = ({
  closeDrawerHandler,
  fetchBomsHandler,
}) => {

  const [productName, setProductName] = useState<string | undefined>();
  const [partsCount, setPartsCount] = useState<number | undefined>();
  const [totalPartsCost, setTotalPartsCost] = useState<number | undefined>();
  const [finishedGoodName, setFinishedGoodName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [uom, setUom] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [supportingDoc, setSupportingDoc] = useState<string | undefined>();
  const [comments, setComments] = useState<string | undefined>();
  const [cost, setCost] = useState<string | undefined>();

  const [processes, setProcesses] = useState<string[]>([""]);

const [rawMaterials, setRawMaterials] = useState<any[]>([
  {
    item_id: "",
    item_name: "",
    description: "",
    quantity: 0,
    uom: "",
    //   image?: string;
    category: "",
    assembly_phase: "",
    supplier: "",
    supporting_doc: "",
    comments: "",
    unit_cost: 0,
    total_part_cost: "",
  }
]);


  const categoryOptions = [
    { value: "finished goods", label: "Finished Goods" },
    { value: "raw materials", label: "Raw Materials" },
    { value: "semi finished goods", label: "Semi Finished Goods" },
    { value: "consumables", label: "Consumables" },
    { value: "bought out parts", label: "Bought Out Parts" },
    { value: "trading goods", label: "Trading Goods" },
    { value: "service", label: "Service" },
  ];

  return (
    <Drawer closeDrawerHandler={closeDrawerHandler}>
      <div
        className="absolute overflow-auto h-[100vh] w-[50vw] md:w-[90vw] bg-white right-0 top-0 z-10 py-3"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px",
        }}
      >
        <h1 className="px-4 flex gap-x-2 items-center text-xl py-3 border-b">
          <BiX onClick={closeDrawerHandler} size="26px" />
          Bill Of Materials (BOM)
        </h1>

        <div className="mt-8 px-5">
          <h2 className="text-2xl font-semibold py-5 text-center mb-6 border-y bg-[#f9fafc]">
            Add New BOM
          </h2>

          <form onSubmit={() => {}}>
            <RawMaterial inputs={rawMaterials} setInputs={setRawMaterials} />
            <Process inputs={processes} setInputs={setProcesses} />
            <div>
              <FormLabel fontWeight="bold">Finished Good</FormLabel>
              <div className="grid grid-cols-4 gap-2">
                <FormControl className="mt-3 mb-5" isRequired>
                  <FormLabel fontWeight="bold">Finished Good Name</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Product Name"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5">
                  <FormLabel fontWeight="bold">Description</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Description"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5" isRequired>
                  <FormLabel fontWeight="bold">Quantity</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="number"
                    placeholder="Quantity"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5" isRequired>
                  <FormLabel fontWeight="bold">
                    Unit Of Measurement (UOM)
                  </FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Unit Of Measurement (UOM)"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5" isRequired>
                  <FormLabel fontWeight="bold">Category</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Category"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5">
                  <FormLabel fontWeight="bold">Supporting Doc</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Supporting Doc"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5">
                  <FormLabel fontWeight="bold">Comments</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Comments"
                  />
                </FormControl>
                <FormControl className="mt-3 mb-5" isRequired>
                  <FormLabel fontWeight="bold">Cost</FormLabel>
                  <Input
                    border="1px"
                    borderColor="#a9a9a9"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    type="number"
                    placeholder="Cost"
                  />
                </FormControl>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <FormControl className="mt-3 mb-5" isRequired>
                <FormLabel fontWeight="bold">Product Name</FormLabel>
                <Input
                  border="1px"
                  borderColor="#a9a9a9"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Product Name"
                />
              </FormControl>
              <FormControl className="mt-3 mb-5" isRequired>
                <FormLabel fontWeight="bold">Parts Count</FormLabel>
                <Input
                  border="1px"
                  borderColor="#a9a9a9"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  type="number"
                  placeholder="Parts Count"
                />
              </FormControl>
              <FormControl className="mt-3 mb-5" isRequired>
                <FormLabel fontWeight="bold">Total Parts Cost</FormLabel>
                <Input
                  border="1px"
                  borderColor="#a9a9a9"
                  disabled
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  type="number"
                  placeholder="Total Parts Cost"
                />
              </FormControl>
            </div>

            <Button
              type="submit"
              className="mt-1"
              color="white"
              backgroundColor="#1640d6"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default AddBom;
