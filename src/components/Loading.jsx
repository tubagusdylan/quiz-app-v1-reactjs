/* eslint-disable react/prop-types */
import ScaleLoader from "react-spinners/ScaleLoader";
import "./Loader.css";

export function Loader({ loading }) {
  return (
    <div className="loader">
      <ScaleLoader height={60} width={10} color="#36d7b7" loading={loading} />
    </div>
  );
}
