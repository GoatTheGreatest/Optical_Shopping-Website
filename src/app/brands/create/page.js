import React from "react";
import InputCard from "@/components/Input_Cards";
import CommentBox from "@/components/Comment_Box";
import ToggleButton from "@/components/Toggle_BTN";

function create() {
  return (
    <div>
      <form action="#">
        <h1 className="w-full text-center font-bold text-black text-2xl mt-3">
          Create Brand
        </h1>
        <div className="w-full flex items-center justify-center">
          <div className="w-[80%]">
            <h2 className="mb-1">
              <label htmlFor="Brand_Name" className="text-lg">
                <span className="text-red-600">*</span>Brand Name
              </label>
            </h2>
            <InputCard required="true" ph="Brand Name" />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <div className="w-[80%]">
            <h2 className="mb-1">
              <label htmlFor="Brand_Name" className="text-lg">
                <span className="text-red-600">*</span>Brand Type
              </label>
            </h2>
            <select
              name="L&F"
              id="L&F"
              className="w-full border-1 border-gray-300 rounded-sm"
              required
            >
              <option value="Lens">Lens</option>
              <option value="Frames">Frames</option>
            </select>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <div className="w-[80%]">
            <h2 className="mb-1">
              <label htmlFor="Brand_Name" className="text-lg">
                Remarks
              </label>
            </h2>
            <CommentBox />
          </div>
        </div>
        <div className="w-full flex items-center justify-start ml-35 mt-4">
          <ToggleButton />
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#22C55E] text-[#fff] rounded-lg ml-35 p-2 mt-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default create;
