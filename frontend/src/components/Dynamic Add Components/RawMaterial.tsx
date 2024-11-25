import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BiMinus } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import Select from "react-select";
import { toast } from "react-toastify";

interface RawMaterialsType {
  item_id: string;
  item_name: string;
  description: string;
  quantity: number;
  uom: string;
  image?: string;
  category: string;
  assembly_phase: string;
  supplier: string;
  supporting_doc?: string;
  comments?: string;
  unit_cost: number;
  total_part_cost: string;
}

interface RawMaterialProps{
  inputs: any[],
  setInputs: (inputs: any)=>void
}

const RawMaterial: React.FC<RawMaterialProps> = ({inputs, setInputs}) => {
  // const [inputs, setInputs] = useState<RawMaterialsType[]>([
  //   {
  //     item_id: "",
  //     item_name: "",
  //     description: "",
  //     quantity: 0,
  //     uom: "",
  //     //   image?: string;
  //     category: "",
  //     assembly_phase: "",
  //     supplier: "",
  //     supporting_doc: "",
  //     comments: "",
  //     unit_cost: 0,
  //     total_part_cost: "",
  //   },
  // ]);
  const [cookies] = useCookies();
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [productsOptionsList, setProductsOptionsList] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const onChangeHandler = (name: string, value: string, ind: number) => {
    const inputsArr: any = [...inputs];
    inputsArr[ind][name] = value;

    if (name === "quantity") {
      const unit_cost = inputsArr[ind]["unit_cost"];
      if (unit_cost) {
        inputsArr[ind]["total_part_cost"] = +unit_cost * +value;
      }
    } else if (name === "unit_cost") {
      const quantity = inputsArr[ind]["quantity"];
      if (quantity) {
        inputsArr[ind]["total_part_cost"] = +quantity * +value;
      }
    }

    setInputs(inputsArr);
  };

  const addInputHandler = () => {
    setInputs((prev) => [
      ...prev,
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
      },
    ]);
  };

  const deleteInputHandler = (ind: number) => {
    const inputsArr = [...inputs];
    inputsArr.splice(ind, 1);
    setInputs(inputsArr);
  };

  const fetchProductsHandler = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "product/all",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies?.access_token}`,
          },
        }
      );
      const results = await response.json();
      if (!results.success) {
        throw new Error(results?.message);
      }
      console.log(results.products);
      setProducts(results.products);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProductsHandler();
  }, []);

  useEffect(() => {
    const productOptions = products.map((prod) => ({
      value: prod._id,
      label: prod.name,
    }));
    setProductsOptionsList(productOptions);
  }, [products]);

  return (
    <div>
      <FormControl isRequired>
        <FormLabel fontWeight="bold">Raw Materials</FormLabel>
        {inputs.map((input, ind) => (
          <div
            className="grid grid-cols-4 gap-2 border border-b-[#a9a9a9] pb-2 mb-2"
            key={ind}
          >
            {/* <FormControl className="mt-3 mb-5" isRequired>
            <FormLabel fontWeight="bold">Product ID</FormLabel>
            <Input
              disabled
              // onChange={(e) =>
              //   onChangeHandler(e.target.name, e.target.value, ind)
              // }
              type="text"
              placeholder="Product ID"
              name="item_id"
              value={input?.item_name}
            />
          </FormControl> */}
            <FormControl className="mb-5" isRequired>
              <FormLabel fontWeight="bold">Product Name</FormLabel>
              <Select
                className="rounded mt-2 border border-[#a9a9a9]"
                options={productsOptionsList}
                placeholder="Select"
                value={selectedProducts[ind]}
                name="item_name"
                onChange={(d) => {
                  // const selectedProds = [...selectedProducts];
                  // selectedProds[ind] = {...d};
                  // setSelectedProducts(selectedProds);
                  onChangeHandler("item_name", d.value, ind);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="description"
                value={input.description}
              ></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Quantity</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="number"
                name="quantity"
                value={input.quantity}
              ></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">UOM</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="uom"
                value={input.uom}
              ></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Category</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="category"
                value={input.category}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">Assembly Phase</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="assembly_phase"
                value={input.assembly_phase}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">Supplier</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="supplier"
                value={input.supplier}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">Supporting Doc</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="supporting_doc"
                value={input.supporting_doc}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">Comments</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="comments"
                value={input.comments}
              ></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Unit Cost</FormLabel>
              <Input
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="number"
                name="unit_cost"
                value={input.unit_cost}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">Total Part Cost</FormLabel>
              <Input
                isDisabled
                border="1px"
                borderColor="#a9a9a9"
                onChange={(e) => {
                  onChangeHandler(e.target.name, e.target.value, ind);
                }}
                type="text"
                name="total_part_cost"
                value={input.total_part_cost}
              ></Input>
            </FormControl>
          </div>
        ))}
      </FormControl>
      <div className="text-end mt-1">
        {inputs.length > 1 && (
          <Button
            onClick={() => deleteInputHandler(inputs.length - 1)}
            leftIcon={<BiMinus />}
            variant="outline"
            className="mr-1 bg-[#a9a9a9]"
          >
            Remove
          </Button>
        )}
        <Button
          onClick={addInputHandler}
          leftIcon={<IoIosAdd />}
          variant="outline"
          className="bg-[#a9a9a9]"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default RawMaterial;
