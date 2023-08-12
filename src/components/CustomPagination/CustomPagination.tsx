import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { FC } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";

interface Props {
  count: number;
  page: number;
  pageSize?: number;
  onChange?: (newPageIndex: number) => void;
}
const CustomPagination: FC<Props> = ({
  count,
  pageSize,
  page,
  onChange,
  ...rest
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const handlePageChange = (_: any, value: number) => {
    onChange !== undefined && onChange(value - 1);
  };
  return (
    <div>
      <Pagination
        sx={{
          marginTop: "16px",
        }}
        page={page}
        onChange={handlePageChange}
        count={Math.ceil(count / pageSize!)}
        shape="rounded"
        variant="outlined"
        {...rest}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: ChevronRight,
              next: ChevronLeft,
            }}
            sx={{
              color: "#64748B",
              margin: "4px",
              borderRadius: "8px",
              "&.Mui-selected": {
                backgroundColor: "#EFF6FF",
                color: "#2563EB",
                border: "none",
                "&: hover": {
                  backgroundColor: "#EFF6FF",
                  color: "#2563EB",
                  border: "none",
                },
              },
              "& .MuiPaginationItem-icon": {
                fontSize: "1rem",
              },
              fontSize: "12px",
              lineHeight: "0",
            }}
            {...item}
          />
        )}
        siblingCount={isMobile ? 0 : 2}
      />
    </div>
  );
};

export default CustomPagination;
