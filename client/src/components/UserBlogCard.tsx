import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { convert } from "html-to-text";
import { Edit, SquareArrowOutUpRight, Trash, User } from "lucide-react";
import { Button } from "./ui/button";
import { Blog } from "@/pages/Home";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
export default function UserBlogCard({
	blog,
	setUserBlogs,
}: {
	blog: Blog;
	setUserBlogs: React.Dispatch<React.SetStateAction<[] | Blog[]>>;
}) {
	const blogString = convert(blog.content);
	const navigate = useNavigate();

	const deleteBlog = async () => {
		try {
			const res = await API.delete(`/blogs/${blog._id}`);
			setUserBlogs((prev) =>
				prev.filter((blog) => blog._id != res?.data?.data._id)
			);
		} catch (error) {
			console.log(error);
		}
	};
	const updateBlog = async () => {
		navigate("/update", { state: blog });
	};

	return (
		<Card className="group hover:border-white transition-colors duration-500 rounded-md w-[400px]">
			<CardHeader>
				<div className="flex items-center space-x-2">
					<User className="text-white" />
					<span className="text-lg text-white">{blog.author?.username}</span>
				</div>
				<CardTitle className="text-4xl">{blog.title}</CardTitle>
				<CardDescription>{blog.excerpt}</CardDescription>
			</CardHeader>
			<CardContent className="text-base">
				<p>{blogString.substring(0, 251) + " ...read more"}</p>
			</CardContent>
			<CardFooter>
				<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
					<Button
						className="text-base"
						onClick={() =>
							navigate(`/blog/${blog.slug}`, { state: { blogId: blog._id } })
						}>
						<SquareArrowOutUpRight /> Read Post
					</Button>
				</div>
				<div className="ml-10 flex items-center gap-3">
					<Button variant="ghost" className="text-white" onClick={updateBlog}>
						<Edit className="text-white" />
					</Button>
					<Button variant="ghost" className="text-white" onClick={deleteBlog}>
						<Trash className="text-white" />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
