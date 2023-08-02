import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { FC, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";

interface Props {
  count: number;
  page: number;
}
const CustomPagination: FC<Props> = ({ count, page, ...rest }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [currentPage, setPage] = useState(page);
  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <Pagination
        sx={{
          marginTop: "16px",
        }}
        page={currentPage}
        onChange={handlePageChange}
        count={count}
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
              // fontWeight: "700",
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
