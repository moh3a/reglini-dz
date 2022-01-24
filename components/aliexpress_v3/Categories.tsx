import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";

const Categories = () => {
  const [categories, setCategories] = useState<
    [
      {
        category_id: number;
        category_name: string;
        category_children: [{ category_id: number; category_name: string }];
      }
    ]
  >();
  const fetchCategories = useCallback(async () => {
    const { data } = await axios.get("/api/aliexpress/affiliate/category/get");
    if (data.success) {
      setCategories(data.data);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      {categories && (
        <>
          {categories.map((c) => (
            <div
              className="border broder-gray-200 bg-gray-50 lg:max-w-xs cursor-pointer flex justify-between py-1 pl-2"
              key={c.category_id}
            >
              <div>{c.category_name}</div>
              <ChevronRightIcon className="w-5 h-5 mr-1" aria-hidden="true" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Categories;
