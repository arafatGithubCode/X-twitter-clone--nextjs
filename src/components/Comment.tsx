import { HiDotsHorizontal } from "react-icons/hi";

interface Comment {
  userImg?: string;
  username?: string;
  name?: string;
  comment?: string;
}

const Comment = ({ comment, id }: { comment: Comment; id: string }) => {
  return (
    <>
      <div className="flex p-3 border-b border-gray-200 ml-9">
        <img
          className="w-8 h-8 rounded-full mr-4"
          src={comment?.userImg || ""}
          alt="user-image"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <h4 className="text-sm font-bold whitespace-nowrap truncate">
                {comment?.name}
              </h4>
              <span className="text-xs whitespace-nowrap truncate">
                @{comment?.username}
              </span>
            </div>
            <HiDotsHorizontal className="text-xs" />
          </div>

          <p className="text-gray-800 my-3 text-sm">{comment?.comment}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
