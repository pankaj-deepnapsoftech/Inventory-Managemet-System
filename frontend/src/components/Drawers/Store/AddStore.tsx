import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Drawer from "../../../ui/Drawer";
import { BiX } from "react-icons/bi";
import { useState } from "react";
import Select from "react-select";
import { useAddProductMutation } from "../../../redux/api/api";
import { toast } from "react-toastify";

interface AddStoreProps {}

const AddStore: React.FC<AddStoreProps> = () => {
    const closeDrawerHandler = ()=>{}

  return (
    <Drawer closeDrawerHandler={closeDrawerHandler}>
      <div
        className="absolute overflow-auto h-[100vh] w-[90vw] md:w-[450px] bg-white right-0 top-0 z-10 py-3"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px",
        }}
      >
        <h1 className="px-4 flex gap-x-2 items-center text-xl py-3 border-b">
          <BiX onClick={closeDrawerHandler} size="26px" />
          Product
        </h1>

        <div className="mt-8 px-5">
          <h2 className="text-2xl font-semibold py-5 text-center mb-6 border-y bg-[#f9fafc]">
            Add New Product
          </h2>

          <form onSubmit={()=>{}}>
            <FormControl className="mt-3 mb-5" isRequired>
              <FormLabel fontWeight="bold">Product ID</FormLabel>
              <Input
                // value={id}
                // onChange={(e) => setId(e.target.value)}
                type="text"
                placeholder="Product ID"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5" isRequired>
              <FormLabel fontWeight="bold">Product Name</FormLabel>
              <Input
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Product Name"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5" isRequired>
              <FormLabel fontWeight="bold">Product Price</FormLabel>
              <Input
                // value={price}
                className="no-scrollbar"
                // onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Product Price"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5" isRequired>
              <FormLabel fontWeight="bold">Product Category</FormLabel>
              <Select
                // value={category}
                // options={categoryOptions}
                // onChange={(e: any) => setCategory(e)}
              />
            </FormControl>
            <FormControl className="mt-3 mb-5" isRequired>
              <FormLabel fontWeight="bold">UOM (Unit of Measurement)</FormLabel>
              <Input
                className="no-scrollbar"
                // value={uom}
                // onChange={(e) => setUom(e.target.value)}
                type="text"
                placeholder="UOM (Unit of Measurement)"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5" isRequired>
              <FormLabel fontWeight="bold">Current Stock</FormLabel>
              <Input
                // value={currentStock}
                // onChange={(e) => setCurrentStock(e.target.value)}
                type="number"
                placeholder="Current Stock"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5">
              <FormLabel fontWeight="bold">Min Stock</FormLabel>
              <Input
                // value={minStock}
                // onChange={(e) => setMinStock(e.target.value)}
                type="number"
                placeholder="Min Stock"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5">
              <FormLabel fontWeight="bold">Max Stock</FormLabel>
              <Input
                // value={maxStock}
                // onChange={(e) => setMaxStock(e.target.value)}
                type="number"
                placeholder="Max Stock"
              />
            </FormControl>
            <FormControl className="mt-3 mb-5">
              <FormLabel fontWeight="bold">HSN</FormLabel>
              <Input
                // value={hsn}
                // onChange={(e) => setHsn(e.target.value)}
                type="text"
                placeholder="HSN"
              />
            </FormControl>
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

export default AddStore;
