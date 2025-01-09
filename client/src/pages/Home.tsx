import API from "@/api/axios";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEffect, useState } from "react";

export interface Blog {
	_id: string;
	title: string;
	excerpt: string;
	slug: string;
	content: string;
	category: string;
	author: any;
}
export default function Home() {
	// get all blogs (/blogs?limit&offset)
	// map it through the card
	const [queryParams, setQueryParams] = useState({ offset: "0", perPage: "9" });
	const loadMore = () => {
		setQueryParams((prev) => ({
			...prev,
			offset: (Number(prev.offset) + 1 * Number(prev.perPage)).toString(),
		}));
	};
	const [blogs, setBlogs] = useState<Blog[] | []>([]);
	useEffect(() => {
		(async function () {
			const res = await API.get("/blogs/random", {
				params: { offset: queryParams.offset, perPage: queryParams.perPage },
			});
			setBlogs((prev) => [...prev, ...res.data?.data]);
		})();
	}, [queryParams]);
	return (
		<React.Fragment key={"something"}>
			<div className="w-full min-h-screen overflow-auto flex flex-wrap p-4 gap-4 justify-center items-center">
				{blogs.map((blog: Blog) => (
					<BlogCard blog={blog} key={blog._id} />
				))}
			</div>
			<div className="w-full flex justify-center mb-3 p-5">
				<Button onClick={loadMore}>Load More</Button>
			</div>
		</React.Fragment>
	);
}
