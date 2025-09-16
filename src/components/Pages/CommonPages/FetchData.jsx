import { Method } from "../../../store/Axios/BaseAxios";

async function fetchData(URL, process, setProcess, prcessNum) {
  let finalDataList = [];
  let nextUrl = URL;
  while (nextUrl) {
    const res = await fetchedData(nextUrl);

    if (res?.next) {
      finalDataList = [...finalDataList, ...res.results];
      nextUrl = res.next.split("api/")[1];
      setProcess((prevState) => ({
        ...prevState,
        [prcessNum]: Math.floor((res.current_page / res.total_pages) * 100),
      }));
    } else {
      finalDataList = [...finalDataList, ...res?.results];
      setProcess((prevState) => ({
        ...prevState,
        [prcessNum]: 100,
      }));
      setProcess((prevState) => ({
        ...prevState,
        [prcessNum]: Math.floor((res.current_page / res.total_pages) * 100),
      }));

      nextUrl = null;
    }
  }

  return finalDataList;
}

const fetchedData = async (URL) => {
  const data = await Method.getData({ URL });
  return data?.data;
};

export default fetchData;
