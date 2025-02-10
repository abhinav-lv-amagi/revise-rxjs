import FileUploadQueue from "./components/FileUploadQueue";
import StockPrice from "./components/StockPrice";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h1>App</h1>
        <br />
        <StockPrice />
        <br />
        <UserList />
        <br />
        <FileUploadQueue />
      </div>
    </div>
  );
}
