import { Button, Divider } from "antd";
import React, { useState } from "react";
import Reports from "./Reports";
import TodaysMapTypeReport from "./TodaysMapTypeReport";

const ReportSection = () => {
  const [state, setState] = useState(true);

  return (
    <>
      <Divider orientation="left">
        {state ? "Todays Map Type Report" : "District Wise Cumulative Report"}
      </Divider>
      <Button type="primary" onClick={() => setState(!state)}>
        {!state ? "View Todays Map Type Report" : " View All Map Type Records"}
      </Button>
      {!state ? (
        <Reports></Reports>
      ) : (
        <TodaysMapTypeReport></TodaysMapTypeReport>
      )}
    </>
  );
};

export default ReportSection;
