import { useProduct } from "@/hooks/useProduct";

export const QueryProduct = ({children}) => children(useProduct())