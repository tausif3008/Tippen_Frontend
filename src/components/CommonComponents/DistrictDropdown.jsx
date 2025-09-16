import { Select, Form } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDistrictList } from "../../store/Actions/BaseAction";

const DistrictDropdown = ({ context, getDistrictValueTry, formOf }) => {
  const { dispatch } = useOutletContext();

  const { canResetTaluka } = useContext(context);

  const [districtDetailsList, setDistrictDetailsList] = useState([]);
  const districtSelector = useSelector((state) => state.districtListResult);

  function getDistrictListfun() {
    dispatch(getDistrictList());
  }

  useEffect(() => {
    getDistrictListfun();
  }, []);

  useEffect(() => {
    if (districtSelector && districtSelector?.data) {
      let rawDistrictDetails = districtSelector.data;
      let theDistrictList = [];
      for (const element of rawDistrictDetails) {
        let value = {
          districtCode: element["district_code"],
          districtId: element["id"],
        };

        theDistrictList.push({
          label: element["district_name"],
          value: JSON.stringify(value),
        });
      }
      setDistrictDetailsList(theDistrictList);
    }
  }, [districtSelector]);

  return (
    <Form.Item
      rules={[{ required: true, message: "This field is required!" }]}
      name={"district_id"}
      label="Select District"
    >
      <Select
        optionFilterProp="label"
        onChange={(value) => {
          getDistrictValueTry(value);
          canResetTaluka(true);
        }}
        showSearch
        placeholder="Select District"
        options={districtDetailsList}
      />
    </Form.Item>
  );
};

export default DistrictDropdown;
