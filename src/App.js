import "./App.css";
import "./index.css";
import "./style/searchForm.scss";
import Navigates from "./components/Navigate/Navigates";
import { ErrorBoundary } from "react-error-boundary";

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex justify-center items-center h-screen font-bold text-xl"
    >
      Something went wrong. We're working on fixing the issue.
    </div>
  );
}

const logError = (error, info) => {
  console.log("Error Boundaries", error);
};

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onError={logError}>
      <Navigates></Navigates>
    </ErrorBoundary>
  );
}

export default App;
