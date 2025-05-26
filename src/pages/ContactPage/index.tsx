import {CommonButton} from '../../components/commons/Buttons.tsx';

export default function ContactPage() {
	return (
		<div className="w-[calc(100%-2rem)] max-w-4xl mx-auto mt-24 mb-12">
			<h1 className="text-4xl font-bold text-primary text-center mb-10 pt-4">Contact Us</h1>

			<div className="bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
				{/* Contact Info */}
				<div className="bg-primary/5 p-6 space-y-4">
					<h2 className="text-xl font-semibold text-primary">StayFindr HQ</h2>
					<p className="text-sm text-gray-700">
						Have questions? We're here to help you book better, host smarter, and travel happier.
					</p>

					<div className="text-sm text-gray-700 space-y-2 pt-4">
						<p><i className="fa-regular fa-envelope pr-2" /> support@stayfindr.com</p>
						<p><i className="fa-regular fa-phone pr-2" /> +47 123 45 678</p>
						<p><i className="fa-regular fa-map pr-2" /> Oslo, Norway</p>
					</div>
				</div>

				{/* Contact Form */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						alert('Form submitted!');
					}}
					className="p-6 space-y-4"
				>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
						<input
							type="text"
							required
							className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/30 text-sm"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
						<input
							type="email"
							required
							className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/30 text-sm"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
						<textarea
							required
							rows={4}
							className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/30 text-sm"
						></textarea>
					</div>

					<CommonButton
						type="submit"
						bgColor="bg-primary"
						textColor="text-white"
						hoverColor="hover:bg-background"
						className="w-full"
					>
						Send Message
					</CommonButton>
				</form>
			</div>
		</div>
	);
}
