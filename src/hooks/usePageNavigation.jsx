import { useState } from "react";

const usePageNavigation = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return {
    currentPage,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePageNavigation;
