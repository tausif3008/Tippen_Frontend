import React, { useEffect } from "react";
import {
    Button,
    Collapse,
    Form,
    Input,
    InputNumber,
    Pagination,
    Progress,
    Radio,
    Space,
    Table,
    message,
} from "antd";

import { useState } from "react";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {

    downloadExcelFile,
    setShapeFileUploadFalse,
    shapeResultsActionUser,
    uploadShapeDocumentsPutActionRejected,
    uploadShapeFileByUser,
    userShapePaginationAction,

} from "../../../store/Actions/BaseAction";
import "./DigitizeDocument.scss";

import {
    InboxOutlined,
    DownloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { URLS } from "../../../globals/urls";
import Dragger from "antd/es/upload/Dragger";
import { getSearchingUrl, setTableHeight } from "../../../globals/healpers";
import { useOutletContext } from "react-router-dom";
import "../../../style/tableStyle.scss";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const ShapeSection = () => {
    const dispatch = useDispatch();

    const rectificationDetails = [
        {
            title: "Barcode Number",
            dataIndex: "barcode_number",
            width: 200,
        },
        {
            title: "District",
            dataIndex: "district",
        },
        {
            title: "Taluka",
            dataIndex: "taluka",
        },
        {
            title: "Village",
            dataIndex: "village",
        },
        {
            title: "Map Code",
            dataIndex: "map_code",
        },

        {
            title: "Current Status",
            dataIndex: "current_status",
        },
        {
            title: "Download",
            dataIndex: "download",
        },
        {
            title: "Remark",
            width: 230,
            dataIndex: "remark",
        },
    ];

    const [tableData, settableData] = useState([]);
    const { onShowSizeChange } = useOutletContext();

    const [totalCount, settotalCount] = useState(1);
    const [remarkObject, setremarkObject] = useState({});
    const [selectedTableRows, setselectedTableRows] = useState([]);
    const [fileList, setfileList] = useState([]);

    const [useUrl, setuseUrl] = useState(URLS.GET_ALLOCATE_TO_SHAPE_URL);

    const selector = useSelector((state) => state.shapeUserFiles);

    useEffect(() => {
        if (!selector)
            dispatch(
                shapeResultsActionUser({ URL: URLS.GET_ALLOCATE_TO_SHAPE_URL })
            );
    }, []);

    const agencySelector = useSelector((state) => state.agencyList);

    useEffect(() => {
        if (selector) {
            let newTalbleArray = [];

            let res = selector.results;

            for (let index = 0; index < res.length; index++) {
                if ([res[index]["remarks"]]) {
                    remarkObject[[res[index]["id"]]] = res[index]["remarks"];
                }

                newTalbleArray.push({
                    ...res[index],
                    key: res[index]["id"],
                    district:
                        res[index].district_name && res[index].district_name.district_name,
                    taluka: res[index].taluka_name && res[index].taluka_name.taluka_name,
                    village:
                        res[index].village_name && res[index].village_name.village_name,
                    download: (
                        <a
                            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_DOCUMENT_SHAPE_URL}/${res[index]["id"]}/`}
                            download={`image.${res[index]["file_name"].split(".")[1]}`}
                        >
                            {
                                <Button
                                    className={`${res[index]?.current_status === "Shape Inprocess"
                                            ? "already-downloaded-button"
                                            : res[index]?.current_status === "Qc Rejected"
                                                ? "rejected-button"
                                                : "download-button"
                                        }`}
                                    onClick={(e) => {
                                        const updatedTableDetailsArray = [...newTalbleArray];
                                        updatedTableDetailsArray[index]["current_status"] =
                                            "Shape Inprocess";
                                        e.currentTarget.disabled = true;
                                    }}
                                >
                                    <span>
                                        <DownloadOutlined></DownloadOutlined> Download
                                    </span>{" "}
                                </Button>
                            }
                        </a>
                    ),

                    rectify_download: (
                        <a
                            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_DOCUMENT_RECTIFY_URL}/${res[index]["id"]}/`}
                            download={`rectified_image.${res[index]["file_name"].split(".")[1]}`}
                        >
                            <Button
                                className={`${res[index]?.current_status === "Qc Rejected"
                                    ? "rejected-button"
                                    : res[index]?.current_status === "Shape Inprocess"
                                        ? "already-downloaded-button"
                                        : "download-button"
                                    }`} // Applying conditional class based on current_status
                                onClick={(e) => {
                                    e.currentTarget.disabled = true;
                                }}
                            >
                                <span>
                                    <DownloadOutlined></DownloadOutlined >Download
                                </span>
                            </Button>
                        </a>
                    ),

                    remark: (
                        <Input
                            defaultValue={[res[index]["remarks"]]}
                            onChange={(event) => {
                                const newValue = event.target.value;

                                if ([res[index]["remarks"]]) {
                                    remarkObject[[res[index]["id"]]] = [res[index]["remarks"]];
                                }

                                if (newValue === "") {
                                    delete remarkObject[[res[index]["id"]]];
                                    setremarkObject((s) => {
                                        return { ...s, [res[index]["id"]]: "" };
                                    });
                                } else {
                                    setremarkObject((s) => {
                                        return { ...s, [res[index]["id"]]: newValue };
                                    });
                                }
                            }}
                        />
                    ),
                });
            }

            settableData(newTalbleArray);
            settotalCount(selector.count);
            setCurrentPageSize(selector.per_page_count);
        }
    }, [selector]);

    useEffect(() => {
        let agencies = [];
        if (agencySelector) {
            for (let index = 0; index < agencySelector.length; index++) {
                agencies.push({
                    value: agencySelector[index]["id"],
                    label: agencySelector[index]["agency_name"],
                });
            }
        }
    }, [agencySelector]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(20);

    let columns = rectificationDetails;

    const onSelectChange = (newSelectedRowKeys, selections) => {
        setSelectedRowKeys((s) => newSelectedRowKeys);
        setselectedTableRows(selections);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [Table.SELECTION_ALL],
    };

    const hasSelected = selectedRowKeys.length > 0;

    function getCurrentPageUrl(page) {
        if (currentPage) {
            return useUrl + `page=${page}`;
        }
    }

    function getPageDetails(url) {
        setSelectedRowKeys([]);
        dispatch(userShapePaginationAction({ URL: url }));
    }

    function paginationPageChange(page, pageSize) {
        setSelectedRowKeys([]);
        setcurrentPage(page);
        setCurrentPageSize(pageSize);
        let url = getCurrentPageUrl(page);
        dispatch(userShapePaginationAction({ URL: url }));
    }

    const [setedStatus, setsetedStatus] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (setedStatus) {
            if (setedStatus === "approved") {
                if (file && file.length > 0) {  // Allowing multiple files
                    if (selectedTableRows && file && selectedTableRows.length === file.length) {
                        let canDispatch = true;
                        let selectedFiles = [];

                        for (let index = 0; index < selectedTableRows.length; index++) {
                            selectedFiles.push(selectedTableRows[index]["barcode_number"]);
                        }

                        for (let index = 0; index < file.length; index++) {
                            if (!selectedFiles.includes(file[index]["name"].trim().split(".")[0])) {
                                canDispatch = false;
                                break;
                            }
                        }

                        if (canDispatch) {
                            let can_proceed = true;

                            if (can_proceed) {
                                const formData = new FormData();

                                file.forEach((element) => {
                                    formData.append("files", element);
                                });

                                let url = URLS.UPLOAD_SHAPE_FILES_URL + setedStatus + "/";

                                for (let index = 0; index < selectedRowKeys.length; index++) {
                                    formData.append(
                                        "remarks",
                                        remarkObject[selectedRowKeys[index]]
                                    );
                                }

                                dispatch(uploadShapeFileByUser({ URL: url, formData }));
                                setSelectedRowKeys([]);
                                setfileList([]);
                            }
                        }
                        else {
                            message.info(
                                "The selected files from the table do not match the uploaded file names!");
                        }
                    } else {
                        message.info(
                            "The number of selected files from the table does not align with the count of uploaded files!");
                    }
                } else {
                    message.info("Please Upload files!");
                }
            } else {
                if (selectedRowKeys && selectedRowKeys.length !== 0) {
                    let url = URLS.UPLOAD_SHAPE_FILES_URL + setedStatus + "/";

                    let updatedRemarkList = [];
                    for (let index = 0; index < selectedRowKeys.length; index++) {
                        updatedRemarkList.push({
                            id: selectedRowKeys[index], remarks: remarkObject[selectedRowKeys[index]]
                                ? remarkObject[selectedRowKeys[index]]
                                : "",
                        });
                    }

                    dispatch(
                        uploadShapeDocumentsPutActionRejected({
                            URL: url,
                            remarksList: updatedRemarkList,
                        })
                    );

                    setSelectedRowKeys([]);
                } else {
                    message.info(
                        "Select a file from the table and decide whether to reject it or place it on hold."
                    );
                }
            }
        } else {
            message.info(
                "Please specify whether the selected file should be marked as Approved, Rejected, or placed On Hold!"
            );
        }
    };

    function selectedStatus(e) {
        setsetedStatus(e.target.value);
    }

    const props = {
        name: "file",
        multiple: true,

        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                let formDataList = [];
                for (let i = 0; i < info.fileList.length; i++) {
                    formDataList.push(info.fileList[i].originFileObj);
                }
                setFile(formDataList);
            }
        },
    };

    const rectifySelector = useSelector((state) => state.shapeFileUpoadResult);

    useEffect(() => {
        if (rectifySelector) {
            setSelectedRowKeys([]);
            setcurrentPage(1);

            dispatch(shapeResultsActionUser({ URL: useUrl }));
            message.success(rectifySelector.message);

            dispatch(setShapeFileUploadFalse());
            setfileList([]);
        }
    }, [rectifySelector]);

    const [totalFilesUploaded, setTotalFilesUploaded] = useState(0);

    const uploadingProgress = ({ file, fileList }) => {
        const totalFiles = fileList.length;
        setfileList(fileList);

        const completedFiles = fileList.filter(
            (file) => file.status !== "uploading"
        ).length;

        if (file.status !== "uploading") {
            let formDataList = [];
            for (let i = 0; i < fileList.length; i++) {
                formDataList.push(fileList[i].originFileObj);
            }

            setFile(formDataList);
        }

        if (totalFiles > 0) {
            const progress = (completedFiles / totalFiles) * 100;
            setTotalFilesUploaded(Math.floor(progress));
        }
    };

    const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
    const lodingFromState = useSelector((state) => state.loading);

    // seraching content
    const [form] = Form.useForm();
    const [canSearch, setCanSearch] = useState();

    const onFinish = (values) => {
        let keys = Object.keys(values);
        let baseUrl = URLS.GET_ALLOCATE_TO_SHAPE_URL;
        let url = getSearchingUrl(values, keys);

        setuseUrl(baseUrl + url);
        getPageDetails(baseUrl + url);
        setcurrentPage(1);
    };

    useEffect(() => {
        if (canSearch) onFinish(canSearch);
    }, [canSearch]);

    const onReset = () => {
        form.resetFields();
    };

    if (totalFilesUploaded && totalFilesUploaded === 100 && lodingFromState) {
        setTotalFilesUploaded(0);
        setfileList([]);
    }

    return (
        <>
            <Collapse
                items={[
                    {
                        key: "1",
                        label: <SearchOutlined></SearchOutlined>,
                        children: (
                            <Form
                                layout="inline"
                                form={form}
                                name="searchForm"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={(v) => {
                                    if (JSON.stringify(v) !== JSON.stringify(canSearch))
                                        setCanSearch(v);
                                }}
                                autoComplete="off"
                                style={{ maxWidth: "100%" }}
                            >
                                <Form.Item name="file_name">
                                    <Input placeholder="File Name" />
                                </Form.Item>

                                <Form.Item name="barcode_number">
                                    <Input placeholder="Barcode Number" />
                                </Form.Item>

                                <Form.Item name="district_name">
                                    <Input placeholder="District Names" />
                                </Form.Item>

                                <Form.Item name="district_code">
                                    <Input placeholder="District Code" />
                                </Form.Item>

                                <Form.Item name="taluka_name">
                                    <Input placeholder="Taluka Name" />
                                </Form.Item>

                                <Form.Item name="taluka_code">
                                    <Input placeholder="Taluka Code" />
                                </Form.Item>

                                <Form.Item name="village_name">
                                    <Input placeholder="Village Name" />
                                </Form.Item>

                                <Form.Item name="village_code">
                                    <Input placeholder="Village Code" />
                                </Form.Item>

                                <Form.Item name="map_code">
                                    <Input placeholder="Map Code" />
                                </Form.Item>

                                <Form.Item name="current_status">
                                    <Input placeholder="Current Status" />
                                </Form.Item>

                                <Space>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            className="download-button"
                                            htmlType="submit"
                                        >
                                            Search
                                        </Button>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            className="clear-button"
                                            type="primary"
                                            onClick={() => {
                                                onReset();
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </Form.Item>
                                </Space>
                            </Form>
                        ),
                    },
                ]}
            />
            <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

            <div>
                <Space direction="vertical" wrap style={{ display: "flex" }}></Space>
                <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
                <div>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                    {/* <Button
            className="download-button ml-2"
            type="dashed"
            onClick={downloadExlsFiles}
          >
            <DownloadOutlined></DownloadOutlined> Excel
          </Button> */}
                </div>
                <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

                <Table
                    bordered
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    scroll={{ ...setTableHeight(), x: 1500 }}
                />
                <div>
                    <Pagination
                        className="mt-2 flex"
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        total={totalCount}
                        current={currentPage}
                        showQuickJumpers
                        pageSize={currentPageSize}
                        defaultPageSize={currentPageSize}
                        showTotal={(total) => `Total ${totalCount}`}
                        onChange={paginationPageChange}
                    />
                </div>
                <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
                <div className="allocation-button-container">
                    <div className="allocation-button-container">
                        <Space direction="vertical">
                            <Radio.Group buttonStyle="solid" onChange={selectedStatus}>
                                <Radio.Button value="approved">Approved</Radio.Button>
                                {/* <Radio.Button value="rejected">Rejected</Radio.Button> */}
                                <Radio.Button value="onhold">Hold</Radio.Button>
                            </Radio.Group>
                        </Space>
                    </div>
                </div>
            </div>
            <div className="upload-container">
                <Dragger
                    {...props}
                    onChange={uploadingProgress}
                    fileList={fileList}
                    accept={".zip"}
                    listType="text"
                    disabled={setedStatus !== "approved"}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag folder to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Only JPEG and JPG images are
                        allowed.
                    </p>
                </Dragger>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {totalFilesUploaded !== 0 ? (
                        <Progress percent={totalFilesUploaded} strokeColor={twoColors} />
                    ) : (
                        ""
                    )}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {setedStatus === "approved" ? (
                        <Button
                            type="primary"
                            className={`${selectedRowKeys.length !== 0 ? "download-button" : ""
                                }`}
                            disabled={selectedRowKeys.length === 0}
                            onClick={handleSubmit}
                        >
                            <Space style={{ display: "flex" }}>Upload</Space>
                        </Button>
                    ) : (
                        <Button
                            className={`${selectedRowKeys.length !== 0 ? "download-button" : ""
                                }`}
                            type="primary"
                            onClick={handleSubmit}
                            disabled={selectedRowKeys.length === 0}
                        >
                            <Space style={{ display: "flex" }}>Submit</Space>
                        </Button>
                    )}

                    {fileList.length > 0 ? (
                        <Button
                            className="clear-button"
                            type="primary"
                            onClick={() => {
                                setfileList([]);
                            }}
                        >
                            Clear uploaded files
                        </Button>
                    ) : (
                        " "
                    )}
                </div>
            </div>
        </>
    );
};

export default ShapeSection;
