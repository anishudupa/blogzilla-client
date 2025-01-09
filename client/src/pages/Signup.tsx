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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "@/api/axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const { toast } = useToast();

	const signUpSchmea = z.object({
		username: z.string().min(3, "Username must be provided"),
		email: z.string().email("Email is invalid"),
		password: z.string().min(8, "Password must be minimum of 8 characters"),
		about: z.string().optional(),
	});

	type TSignupSchema = z.infer<typeof signUpSchmea>;

	const form = useForm<TSignupSchema>({
		resolver: zodResolver(signUpSchmea),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			about: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const onSubmit = async (data: TSignupSchema) => {
		try {
			const res = await API.post("/users/signup", data);
			toast({ title: res?.data?.status, description: res?.data?.message });
			form.reset();
			navigate("/login");
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
						<h1 className="text-center text-4xl">Sign up</h1>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md">Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Username"
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
						<FormField
							control={form.control}
							name="about"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md">About</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us about yourself"
											{...field}
											className="w-full h-[100px]"
										/>
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
								Sign up
							</Button>
						</div>
						<div className="flex justify-center items-center gap-2">
							<span>Already have an account?</span>
							<Link to="/login" className="text-md text-violet-600">
								Login
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
}
