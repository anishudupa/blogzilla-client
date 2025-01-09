import TipTap from "@/components/TipTap";
import { useLocation } from "react-router-dom";

export default function UpdateBlog() {
	const blog = useLocation().state;
	return (
		<>
			<div className="p-4 flex flex-col justify-center items-center min-h-screen gap-4 w-full relative">
				<h1 className="text-3xl text-center font-bold">Update Blog</h1>
				<TipTap type="update" blogId={blog?._id} blog={blog} />
			</div>
		</>
	);
}
