import { useEffect, useState } from "react";
import { Blog } from "./Home";
import API from "@/api/axios";
import UserBlogCard from "@/components/UserBlogCard";

export default function UBlogList() {
	const [userBlogs, setUserBlogs] = useState<Blog[] | []>([]);
	useEffect(() => {
		(async function () {
			try {
				const res = await API.get("/blogs");
				setUserBlogs((prev) => [...prev, ...res.data?.data]);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<>
			<div className="w-full min-h-screen overflow-auto flex flex-wrap p-4 gap-4 justify-center items-center">
				{userBlogs.map((blog: Blog) => (
					<UserBlogCard
						blog={blog}
						key={blog._id}
						setUserBlogs={setUserBlogs}
					/>
				))}
			</div>
		</>
	);
}
