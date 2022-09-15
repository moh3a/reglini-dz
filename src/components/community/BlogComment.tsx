/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux";
import { ArrowCircleUpIcon, TrashIcon } from "@heroicons/react/outline";

import { commentLike, deleteComment } from "../../utils/redux/blogAsyncActions";
import { IComment } from "../../utils/redux/blogsSlice";
import { selectUser } from "../../utils/redux/userSlice";
import { ArrowCircleUpIcon as SolidArrowCircleUpIcon } from "@heroicons/react/solid";

const BlogComment = ({ comment }: { comment: IComment }) => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="flex py-2 border-t">
      <div className="m-2 h-10 w-10">
        <img
          className="rounded-full"
          src={comment.userPicture ? comment.userPicture : "/placeholder.png"}
          alt={comment.userName}
        />
      </div>
      <div className="w-full">
        <p>
          <span className="font-semibold">{comment.userName}</span> -{" "}
          <span className="text-sm">
            {comment.createdAt?.substring(0, 10)}{" "}
            {comment.createdAt?.substring(11, 16)}
          </span>
        </p>
        <div className="flex flex-col md:flex-row md:justify-between">
          <p>{comment.text}</p>
          <div className="flex justify-around">
            {user && comment.userId === user._id && (
              <div className="w-7">
                <TrashIcon
                  onClick={() =>
                    dispatch(
                      deleteComment({
                        blogId: comment.blogId,
                        commentId: comment._id,
                      })
                    )
                  }
                  className="w-6 h-6 inline mr-1 text-red-500 cursor-pointer"
                  aria-hidden="true"
                />
              </div>
            )}
            <div
              onClick={() => {
                if (user && user.name)
                  dispatch(
                    commentLike({
                      blogId: comment.blogId,
                      commentId: comment._id,
                    })
                  );
              }}
              className={`flex items-center`}
            >
              {comment.voters?.find(
                (voter) => user && voter.userId === user._id
              ) ? (
                <SolidArrowCircleUpIcon
                  className="w-6 h-6 mr-2 text-orange-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowCircleUpIcon
                  className="w-6 h-6 mr-2 text-gray-500"
                  aria-hidden="true"
                />
              )}
              <div>{comment.votes} upvotes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
