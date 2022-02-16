import { RadioGroup } from "@headlessui/react";
import { TagIcon } from "@heroicons/react/solid";

function BlogCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: any;
}) {
  return (
    <div className="my-2">
      <RadioGroup value={category} onChange={setCategory}>
        <RadioGroup.Label>
          Category{" "}
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Select a category for your blog post
          </span>
        </RadioGroup.Label>
        <div className="flex flex-col md:flex-row">
          <RadioGroup.Option className="mx-2 cursor-pointer" value="news">
            {({ checked }) => (
              <>
                <span className={checked ? "bg-red-200 dark:bg-red-600" : ""}>
                  News
                </span>
                {checked && <Checked color="text-red-600" />}
              </>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option className="mx-2 cursor-pointer" value="question">
            {({ checked }) => (
              <>
                <span
                  className={checked ? "bg-orange-200 dark:bg-orange-600" : ""}
                >
                  Question
                </span>
                {checked && <Checked color="text-orange-600" />}
              </>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option className="mx-2 cursor-pointer" value="dev">
            {({ checked }) => (
              <>
                <span
                  className={checked ? "bg-indigo-200 dark:bg-indigo-600" : ""}
                >
                  Web Development
                </span>
                {checked && <Checked color="text-indigo-600" />}
              </>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option className="mx-2 cursor-pointer" value="other">
            {({ checked }) => (
              <>
                <span
                  className={checked ? "bg-green-200 dark:bg-green-600" : ""}
                >
                  Other
                </span>
                {checked && <Checked color="text-green-600" />}
              </>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
    </div>
  );
}

const Checked = ({ color }: { color: string }) => {
  return (
    <TagIcon
      className={`h-6 w-6 inline ${color} relative top-3`}
      aria-hidden="true"
    />
  );
};

export default BlogCategory;
