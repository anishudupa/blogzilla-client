import API from "@/api/axios";
import { House, LogOut, Plus, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { nanoid } from "nanoid";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
export default function Header() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [user, setUser] = useState<string | null>(null);
	useEffect(() => {
		if (token) {
			(async function () {
				try {
					const user = await API.get(`/users/get-user`);
					setUser(user?.data?.data?.username);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setUser(null);
		}
	}, [token]);
	const categories = [
		"Food",
		"Tech",
		"Politics",
		"Culture",
		"Programming",
		"Film",
	];

	return (
		<>
			<div className="flex justify-between items-center  w-full border-b-2 h-12 p-7">
				<div className="flex justify-between items-center gap-5">
					<Link to="/">
						<House />
					</Link>
					{user ? (
						<p>
							Hi,{" "}
							<Link to="/me" className="hover:underline">
								{user}
							</Link>
						</p>
					) : (
						<p>Please, login!!</p>
					)}
				</div>
				{user ? (
					<div className="w-1/2 flex gap-4 justify-end items-center">
						<Button onClick={() => navigate("/create")}>
							Create <Plus />
						</Button>
						<ModeToggle />
						<Select
							onValueChange={(val) => navigate(`/${val}`, { state: nanoid() })}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a category" />
								<SelectContent>
									{categories.map((category, ind) => (
										<SelectItem value={category} key={ind}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</SelectTrigger>
						</Select>
						<Button
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/signup");
							}}>
							Logout <LogOut />
						</Button>
					</div>
				) : (
					<Button onClick={() => navigate("/login")}>
						Login <LogIn />
					</Button>
				)}
			</div>
		</>
	);
}
