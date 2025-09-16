import { URLS } from "./urls";

function getSearchingUrl(values, keys) {
  let url = "";
  for (let index = 0; index < keys.length; index++) {
    if (index === 0) {
      let val =
        values[keys[index]] === undefined ? "" : values[keys[index]].trim();
      url = url + keys[index] + "=" + val + "&";
    } else {
      let val =
        values[keys[index]] === undefined ? "" : values[keys[index]].trim();
      url = url + keys[index] + "=" + val + "&";
    }
  }
  return url;
}

function changeAntSlectWidthToFull() {
  const antSelect = document.querySelectorAll(
    ".ant-form-item-control-input-content>.ant-select"
  );

  for (let index = 0; index < antSelect.length; index++) {
    antSelect[index].style.width = "100%";
  }
}

function setWidthTo100per() {
  return { width: "100%" };
}

function setTableHeight() {
  return { y: 500, x: 1300 };
}

function setUploadedFileContainerLength() {
  const container = document.querySelector(
    ".ant-upload-list ant-upload-list-text"
  );
  if (container) {
    container.style.width = "100%";
    container.style.border = "10px solid black";
  }
}

function getChangedDataPattern(date) {
  let month =
    parseInt(date.$M + 1).toString().length !== 1
      ? parseInt(date.$M + 1)
      : "0" + parseInt(date.$M + 1);

  let day =
    parseInt(date.$D).toString().length !== 1
      ? parseInt(date.$D)
      : "0" + parseInt(date.$D);
  return date.$y + "-" + month + "-" + day;
}

function getDropdownWidth() {
  return { width: "300px" };
}

function canShowStaticTableColumn() {
  return window.innerWidth > 800;
}

function preScanDrafTableFinalSourcefinalRes(data, isScan = true) {
  let finalRes = [];
  for (let index = 0; index < data.length; index++) {
    let list = data[index].allList;

    let k = data[index]["rowSpan"];
    let scanDraft = isScan ? "scanning_completed_count" : "drafting_map_count";
    for (let j = 0; j < k; j++) {
      if (j === 0) {
        finalRes.push({
          district: data[index]["district"],
          taluka: list[j][0],
          date: list[j][1],
          [scanDraft]: list[j][2],
          total_days: list[j][3],
          average: list[j][4],
          rowSpan: data[index]["rowSpan"],
        });
      } else {
        finalRes.push({
          taluka: list[j][0],
          date: list[j][1],
          [scanDraft]: list[j][2],
          total_days: list[j][3],
          average: list[j][4],
        });
      }
    }
  }
  return finalRes;
}

function getTablePDF(result, id, isScan = true) {
  let scanDraft = isScan ? "Scanning Completed Count" : "Drafting Map Count";
  let header = `<tr>
      <th>District</th>
      <th>Taluka</th>
      <th>Date</th>
      <th>${scanDraft}</th>
      <th>Total Days</th>
      <th>Average</th>
    </tr>`;

  let trs = "";

  for (let index = 0; index < result.length; index++) {
    let el = result[index];

    let parentTr = false;
    let td1 = `<td rowspan="${el.rowSpan}">${el.district}</td>`;

    for (const e of el.allList) {
      let tdd = "";
      for (const v of e) {
        tdd = tdd + `<td>${v}</td>`;
      }

      let tr;
      if (!parentTr) {
        tr = `<tr>${td1 + tdd}</tr>`;
      } else {
        tr = `<tr>${tdd}</tr>`;
      }

      trs = trs + tr;
      parentTr = true;
    }
  }

  let finalData = `<table  id="myTable" style="width:100%">${
    header + trs
  }</table>`;

  document.querySelector(id).innerHTML = finalData;
}

const downloadCSVFronBackend = (csv_path) => {
  const iframe = document.createElement("a");
  iframe.style.display = "none";
  iframe.setAttribute("href", URLS.BASE_URL_EXCEL + csv_path);
  iframe.click();
};

export {
  getTablePDF,
  canShowStaticTableColumn,
  getSearchingUrl,
  changeAntSlectWidthToFull,
  setTableHeight,
  setWidthTo100per,
  setUploadedFileContainerLength,
  getChangedDataPattern,
  getDropdownWidth,
  preScanDrafTableFinalSourcefinalRes,
  downloadCSVFronBackend,
};
