import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "@/api/axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const loginSchema = z.object({
		email: z.string().email("Email is invalid"),
		password: z.string().min(8, "Password must be minimum of 8 characters"),
	});

	type TLoginSchema = z.infer<typeof loginSchema>;

	const form = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (data: TLoginSchema) => {
		try {
			const res = await API.post("/users/login", data);
			toast({ title: res?.data?.status, description: res?.data?.message });
			localStorage.setItem("token", res?.data?.data);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="min-h-screen flex justify-center items-center">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 p-6 rounded-lg border shadow-white-700 w-full max-w-md">
						<h1 className="text-center text-4xl">Login</h1>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md">Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Email"
											{...field}
											className="w-full h-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md">Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Password"
												{...field}
												className="w-full h-10 pr-12"
											/>
											<button
												type="button"
												className="absolute top-1/2 right-3 transform -translate-y-1/2"
												onClick={() => setShowPassword(!showPassword)}>
												{showPassword ? (
													<EyeOff size={20} />
												) : (
													<Eye size={20} />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-center">
							<Button
								type="submit"
								className="w-full text-base"
								variant={form.formState.isSubmitting ? "secondary" : "default"}
								disabled={form.formState.isSubmitting}>
								Login
							</Button>
						</div>
						<div className="flex justify-center items-center gap-2">
							<span>Don't have an account?</span>
							<Link to="/signup" className="text-md text-violet-600">
								Signup
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
}
