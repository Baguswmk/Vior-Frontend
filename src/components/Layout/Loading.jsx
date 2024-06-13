import { Oval } from "react-loader-spinner";

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Oval height={80} width={80} color="#FFD700" ariaLabel="loading" secondaryColor="#323334" />
  </div>
);

export default Loading;
