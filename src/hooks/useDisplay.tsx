import { useContext } from "react";
import DisplayContext from "../contexts/DisplayProvider";

const useNewPass = () => {
    return useContext(DisplayContext);
}

export default useNewPass;