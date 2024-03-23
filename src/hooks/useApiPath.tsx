import { useContext } from "react";
import ApiPathContext from "../contexts/ApiPathProvider";

const useApiPath = () => {
    return useContext(ApiPathContext);
}

export default useApiPath;