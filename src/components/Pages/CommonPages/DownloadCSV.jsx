function DownloadCSV(data, filename) {
  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(data);
  const link = document.createElement("a");
  link.href = csvContent;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default DownloadCSV;
