import { PaginationState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

export const usePagination = (limit: number) => {
  const [{ pageIndex, pageSize }, setPageIndex] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: limit,
  });

  const handlePgination = useCallback((newPageIndex: number) => {
    setPageIndex((pre) => ({ ...pre, pageIndex: newPageIndex }));
  }, []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  return {
    pageIndex,
    pageSize,
    pagination,
    handlePgination,
  };
};
