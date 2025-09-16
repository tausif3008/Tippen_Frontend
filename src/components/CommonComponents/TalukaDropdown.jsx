import { Select, Form } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCommonTalukaListAction } from "../../store/Actions/BaseAction";
import { URLS } from "../../globals/urls";

const TalukaDropdown = ({ districtCode, setTalukaValueSet }) => {
  const { dispatch } = useOutletContext();
  const [talukaDetailsList, settalukaDetailsList] = useState([]);
  const talukaSelector = useSelector(
    (state) => state.commonTaluksResultSuccess
  );

  function getTalukaList(value) {
    const url = URLS.GET_TALUKA_LIST_URL + value + "/";
    dispatch(getCommonTalukaListAction({ URL: url }));
  }

  useEffect(() => {
    if (districtCode) {
      getTalukaList(districtCode);
    }
  }, [districtCode]);

  useEffect(() => {
    if (talukaSelector && talukaSelector.data1) {
      let rawTalukaData = talukaSelector.data1;
      let theTalukaDetails = [];

      for (let index = 0; index < rawTalukaData.length; index++) {
        theTalukaDetails.push({
          label: rawTalukaData[index]["taluka_name"],
          value: rawTalukaData[index]["id"],
        });
      }
      settalukaDetailsList(theTalukaDetails);
    }
  }, [talukaSelector]);

  return (
    <Form.Item
      rules={[{ required: true, message: "This field is required!" }]}
      name="taluka_id"
      label="Select Taluka"
    >
      <Select
        showSearch
        onChange={(value) => setTalukaValueSet(value)}
        placeholder="Select Taluka"
        optionFilterProp="children"
        options={talukaDetailsList}
      />
    </Form.Item>
  );
};

export default TalukaDropdown;
